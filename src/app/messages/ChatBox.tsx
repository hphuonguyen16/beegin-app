'use client'

import useResponsive from '@/hooks/useResponsive'
import { Grid, Box, Stack, Typography, styled, Card, CardMedia, CardContent, FilledInput, OutlinedInput, InputAdornment, IconButton, Paper, Avatar, Popover } from '@mui/material'
import { Send, InfoRounded, AddReaction, Delete, EmojiEmotions, AddPhotoAlternate } from '@mui/icons-material'
import ExtendedUserInfo from './ExtendedUserInfo'
import AvatarCard from '@/components/common/AvatarCard'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import UrlConfig from '@/config/urlConfig'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import Message from '@/types/message'
import Profile from '@/types/profile'
import { useAuth } from '@/context/AuthContext'
import Image from 'next/image'
import newConversationBanner from '@/assets/new_conversation_banner.png'
import Picker from 'emoji-picker-react';
import { io } from 'socket.io-client'
import useSnackbar from '@/context/snackbarContext'
import RootModal from '@/components/common/modals/RootModal'

const INFO_PANE_WIDTH = "30%";

const ChatBox = ({ friend }: { friend: any }) => {
    const axiosPrivate = useAxiosPrivate()
    const { user } = useAuth();
    const id = user?._id;
    const socket = useRef();
    const [arrivalMessage, setArrivalMessage] = useState<Message>(null);

    const [isInfoOpened, setIsInfoOpened] = useState(false);
    const [messages, setMessages] = useState<Message[]>([])
    const [inputMessage, setInputMessage] = useState("");
    const scrollRef = useRef();

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const onEmojiClick = (emojiObject: any, event: any) => {
        setInputMessage(inputMessage + emojiObject.emoji);
    };

    const [data, setData] = useState<Message>(null);
    const [openDeleteMsgModal, setOpenDeleteMsgModal] = useState(false)
    const { snack, setSnack } = useSnackbar();

    const getMessages = async () => {
        try {
            let response = await axiosPrivate.get(`${UrlConfig.messages.getFriendMessages}/${friend.user}`)
            setMessages(response.data.data)
        } catch (err) { }
    }

    useEffect(() => {
        if (user) {
            socket.current = io(`${process.env.NEXT_APP_BEEGIN_DOMAIN}`)
            socket.current.emit('add-user', user._id)
        }
    }, [user])

    const fetchData = async () => {
        try {
            await getMessages();
            console.log(messages)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [friend])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const sendMessage = async () => {
        try {
            const res = await axiosPrivate.post(`${UrlConfig.messages.sendMessage}/${friend.user}`, { type: "text", content: inputMessage });
            socket.current.emit('send-msg', {
                id: res.data.data._id,
                sender: user?._id,
                receiver: friend.user,
                type: "text",
                content: inputMessage
            })
            setMessages([...messages, { fromSelf: true, type: "text", content: inputMessage }])
            setInputMessage("")
        } catch (err) { }
    }

    const enterListenHandler = async (e: any) => {
        if (e.key === "Enter") {
           await sendMessage();
        }
    };

    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-recieve", (msg: Message) => {
                setArrivalMessage({ fromSelf: false, type: msg.type, content: msg.content });
            });
        }
    });

    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    const sendImage = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const formData = new FormData()
            formData.append('file', e.target.files[0])
            formData.append('upload_preset', `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`)
            const image_url = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: 'POST',
                    body: formData
                }
            )
                .then((response) => response.json())
                .then((data) => {
                    if (data.secure_url !== '') {
                        const uploadedFileUrl = data.secure_url
                        return uploadedFileUrl
                    }
                })
                .catch((err) => console.error(err))
            const res = await axiosPrivate.post(`${UrlConfig.messages.sendMessage}/${friend.user}`, { type: "image", content: image_url });
            socket.current.emit('send-msg', {
                id: res.data.data._id,
                sender: user?._id,
                receiver: friend.user,
                type: "image",
                content: image_url
            })
            setMessages([...messages, { fromSelf: true, type: "image", content: image_url }])
        }
    }

    const onDeleteBtnClick = (msg: Message) => {
        setOpenDeleteMsgModal(true);
        setData(msg)
        console.log(data)
    }

    async function handleDeleteRole() {
        const result = await axiosPrivate.delete(`${UrlConfig.messages.deleteMessage}/${data.id}`);
        if (result) {
            setOpenDeleteMsgModal(false);
            setSnack({ open: true, message: "Deleted message successfully" });
            fetchData()
        }
    }

    return <>
        <Box sx={{
            backgroundColor: '#f4ecf7',
            borderRadius: '16px',
            height: '100%', width: isInfoOpened ? `calc(100% - ${INFO_PANE_WIDTH})` : "100%",
            display: 'flex', flexDirection: 'column',
            zIndex: 2,
            boxShadow: '15px 5px 16px -8px rgba(145, 158, 171, 0.12)',
            transition: "all .3s ease-in-out"
        }}>
            {/* USER INFO */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: "#fff", padding: '20px 25px', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}>
                <AvatarCard avatar={friend?.avatar} name={friend?.firstname + " " + friend?.lastname} subtitle='active 5m ago' />
                <IconButton onClick={() => setIsInfoOpened(!isInfoOpened)}><InfoRounded /></IconButton>
            </Box>
            <Stack sx={{ height: "100%", overflow: "hidden", padding: '30px 40px' }}>
                {/* TEXTS */}
                <Box sx={{ minHeight: "90%", overflowX: "hidden", overflowY: "scroll", position: "relative" }}>
                    {
                        messages.length === 0 && (<Image src={newConversationBanner} alt="" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />)
                    }
                    {
                        messages.map((message, index) => {
                            var isMyText = message.fromSelf;
                            var isTopText = index == 0 || messages[index - 1].fromSelf;

                            return (
                                <Stack ref={scrollRef} sx={{ display: 'flex', flexDirection: "row", justifyContent: isMyText ? "flex-end" : "flex-start" }}>
                                    {!isMyText &&
                                        <Box sx={{ width: "32px", height: "32px", mr: "24px" }}>
                                            {isTopText && (<Avatar src={friend.avatar}></Avatar>)}
                                        </Box>
                                    }
                                    <Stack sx={{ display: "flex", flexDirection: "column", position: "relative", "& .icons": { opacity: "0" }, "&:hover .icons": { opacity: "1" } }}>
                                        {/* {(index == 0 || chats[index - 1].sender === "me") && <Typography>Bear, 5 minutes ago</Typography>} */}
                                        {message.type === "text" ?
                                            <Paper sx={{
                                                display: "flex",
                                                padding: "10px 15px",
                                                mb: "14px",
                                                minWidth: "60px", maxWidth: "420px",
                                                borderRadius: "8px",
                                                backgroundColor: isMyText ? (theme) => theme.palette.primary.main : "#fff",
                                                color: isMyText ? '#fff' : (theme) => theme.palette.primary.main
                                            }}>
                                                <Typography>{message.content}</Typography>
                                            </Paper> :
                                            <Image src={message.content} alt="" width={200} height={300} className='shadow-md rounded-lg mb-[14px]' />
                                        }
                                        <Stack sx={{
                                            flexDirection: "row",
                                            position: "absolute",
                                            ...(isMyText ? { left: "0px" } : { right: "0px" }),
                                            bottom: "0px", transition: "all 0.3s ease-in-out"
                                        }} className='icons'>
                                            <IconButton sx={{
                                                padding: "3px",
                                                color: isMyText ? (theme) => theme.palette.primary.light : (theme) => theme.palette.primary.main,
                                            }} >
                                                <AddReaction sx={{ fontSize: '1.125rem' }} />
                                            </IconButton>
                                            {isMyText && <IconButton sx={{ padding: "3px", color: isMyText ? (theme) => theme.palette.primary.light : (theme) => theme.palette.primary.main }} onClick={() => onDeleteBtnClick(message)} >
                                                <Delete sx={{ fontSize: '1.125rem' }} />
                                            </IconButton>}
                                        </Stack>
                                    </Stack>
                                </Stack>
                            )
                        })
                    }
                </Box>

                {/* INPUT FIELD */}
                <Stack sx={{ mt: "10px" }}>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type='text'
                        placeholder='Type your message'
                        value={inputMessage}
                        onChange={(event) => setInputMessage(event.target.value)}
                        sx={{ borderRadius: '20px', paddingLeft: "26px", backgroundColor: '#fff', '& .MuiOutlinedInput-notchedOutline': { border: '0' } }}
                        onKeyDown={enterListenHandler}
                        endAdornment={
                            <>
                                <InputAdornment position="end">
                                    <IconButton>
                                        <div>
                                            <label
                                                htmlFor='test'
                                                className=''
                                            >
                                                <AddPhotoAlternate />
                                                <input id='test' type='file' className='hidden' onChange={sendImage} />
                                            </label></div>
                                    </IconButton>
                                </InputAdornment>
                                <InputAdornment position="end" onClick={handleClick}>
                                    <IconButton>
                                        <EmojiEmotions />
                                    </IconButton>
                                </InputAdornment>
                                <InputAdornment position="end" onClick={sendMessage}>
                                    <IconButton>
                                        <Send />
                                    </IconButton>
                                </InputAdornment>
                            </>
                        }
                    />
                </Stack>
            </Stack>
        </Box>
        <ExtendedUserInfo width={INFO_PANE_WIDTH} friend={friend} />
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
        >
            <Picker onEmojiClick={onEmojiClick} />
        </Popover>
        {openDeleteMsgModal && (
            <RootModal
                variant="Delete"
                handleOk={handleDeleteRole}
                handleClose={() => setOpenDeleteMsgModal(false)}
                open={openDeleteMsgModal}
                closeOnly={false}
                height={"auto"}>
                <div>Are you sure you want to delete this message?</div>
            </RootModal>
        )}
    </>
}

export default ChatBox;