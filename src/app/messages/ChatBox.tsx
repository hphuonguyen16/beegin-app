'use client'

import useResponsive from '@/hooks/useResponsive'
import { Grid, Box, Stack, Typography, styled, Card, CardMedia, CardContent, FilledInput, OutlinedInput, InputAdornment, IconButton, Paper, Avatar, Popover } from '@mui/material'
import { Send, InfoRounded, AddReaction, Delete, EmojiEmotions, AddPhotoAlternate, MoreHoriz } from '@mui/icons-material'
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
import Scrollbar from '@/components/common/Scrollbar'
import { PokemonSelector, PokemonCounter } from '@charkour/react-reactions';
import EmojiPicker from '@/components/common/EmojiPicker'
import socketFunctions from '@/utils/socket';

const INFO_PANE_WIDTH = "30%";

const ChatBox = ({ friend }: { friend: any }) => {
    const axiosPrivate = useAxiosPrivate()
    const { user } = useAuth();
    const id = 'send-reaction';
    const socket = useRef();
    const [arrivalMessage, setArrivalMessage] = useState<Message>(null);

    const [isInfoOpened, setIsInfoOpened] = useState(false);
    const [messages, setMessages] = useState<Message[]>([])
    const [inputMessage, setInputMessage] = useState("");
    const scrollRef = useRef();

    const [anchor, setanchor] = React.useState<HTMLButtonElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setanchor(event.currentTarget);
    };
    const handleClose = () => {
        setanchor(null);
    };
    const open = Boolean(anchor);

    const [data, setData] = useState<Message>(null);
    const [openDeleteMsgModal, setOpenDeleteMsgModal] = useState(false)
    const { snack, setSnack } = useSnackbar();

    const getMessages = async () => {
        try {
            let response = await axiosPrivate.get(`${UrlConfig.messages.getFriendMessages}/${friend.user}`)
            const data = response.data.data
            setMessages(data)
            socketFunctions.sendSeenStatus(data[data.length - 1], friend?.user, user?._id)
        } catch (err) { }
    }

    useEffect(() => {
        if (user) {
            socketFunctions.addUser(user?._id)
        }
    }, [user])

    const fetchData = async () => {
        try {
            await getMessages();
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [friend])


    useEffect(() => {
        socketFunctions.fetchSeenStatus();
    });

    const sendMessage = async () => {
        try {
            const res = await axiosPrivate.post(`${UrlConfig.messages.sendMessage}/${friend.user}`, { type: "text", content: inputMessage });
            const msg = res.data.data;
            socketFunctions.sendMessage({
                id: msg._id,
                sender: user?._id,
                receiver: friend.user,
                type: "text",
                content: inputMessage,
                createdAt: msg.createdAt
            })
            setMessages([...messages, { fromSelf: true, type: "text", content: inputMessage, createdAt: msg.createdAt }])
            setInputMessage("")
        } catch (err) { }
    }

    const [typing, setTyping] = useState(false)

    const enterListenHandler = async (e: any) => {
        if (e.key === "Enter") {
            await sendMessage();
        } else {
            socketFunctions.sendTyping(user?._id, friend?.user);
        }
    };

    useEffect(() => {
        socketFunctions.fetchTyping(setTyping, friend?.user);
    });

    useEffect(() => {
        socketFunctions.receiveMessage(setArrivalMessage, friend?.user, user?._id)
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
            const msg = res.data.data;
            socketFunctions.sendMessage({
                id: msg._id,
                sender: user?._id,
                receiver: friend.user,
                type: "image",
                content: image_url,
                createdAt: msg.createdAt
            })
            setMessages([...messages, { fromSelf: true, type: "image", content: image_url, createdAt: msg.createdAt }])
        }
    }

    const onDeleteBtnClick = (msg: Message) => {
        setOpenDeleteMsgModal(true);
        setData(msg)
    }

    async function handleDeleteRole() {
        const result = await axiosPrivate.delete(`${UrlConfig.messages.deleteMessage}/${data.id}`);
        if (result) {
            setOpenDeleteMsgModal(false);
            setSnack({ open: true, message: "Deleted message successfully" });
            fetchData()
        }
    }
    const counters = [{ emoji: 'like', by: " " }]

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, typing])

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
            <Stack sx={{ height: "100%", overflow: "hidden", padding: '30px 30px 30px 40px' }}>
                {/* TEXTS */}
                <Scrollbar>
                    <Box sx={{ minHeight: "90%", position: "relative", marginRight: "8px" }}>
                        {
                            messages.length === 0 && (<Image src={newConversationBanner} alt="" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />)
                        }
                        {
                            messages.map((message, index) => {
                                var isMyText = message.fromSelf;
                                var isTopText = index == 0 || messages[index - 1].fromSelf;
                                var isClusterTopText = index == 0 || (messages[index - 1].fromSelf !== messages[index].fromSelf)

                                return (
                                    <Stack ref={scrollRef} sx={{ display: 'flex', flexDirection: "row", justifyContent: isMyText ? "flex-end" : "flex-start" }}>
                                        {!isMyText &&
                                            <Box sx={{ width: "32px", height: "32px", mr: "24px" }}>
                                                {isTopText && (<Avatar src={friend.avatar}></Avatar>)}
                                            </Box>
                                        }
                                        <Stack sx={{ display: "flex", flexDirection: "column", position: "relative", "& .icons": { opacity: "0" }, "&:hover .icons": { opacity: "1" } }}>
                                            {(isClusterTopText) && <Typography sx={{ opacity: 0.7, textAlign: isMyText ? "right" : "left" }}>{message.createdAt.substring(11, 16)}</Typography>}
                                            {message.type === "text" ?
                                                <Paper sx={{
                                                    display: "flex",
                                                    padding: "10px 15px",
                                                    mb: "10px",
                                                    minWidth: "60px", maxWidth: "420px",
                                                    borderRadius: "18px",
                                                    ...(isMyText ? { borderTopRightRadius: 0 } : { borderTopLeftRadius: 0 }),
                                                    backgroundColor: isMyText ? (theme) => theme.palette.primary.main : "#fff",
                                                    color: isMyText ? '#fff' : (theme) => theme.palette.primary.main
                                                }}>
                                                    <Typography className="font-sans">{message.content}</Typography>
                                                </Paper> :
                                                <Image src={message.content} alt="" width={200} height={300} className='shadow-md rounded-lg mb-[14px]' />
                                            }


                                            {!isClusterTopText && <Typography sx={{
                                                position: "absolute", opacity: 0.7,
                                                ...(isMyText ? { left: "-50px" } : { right: "-50px" }),
                                                bottom: "calc(50% - 12px)", transition: "all 0.3s ease-in-out"
                                            }} className='icons'>{message.createdAt.substring(11, 16)}</Typography>}

                                            <Stack sx={{
                                                flexDirection: "row",
                                                position: "absolute",
                                                ...(isMyText ? { left: "0px" } : { right: "0px" }),
                                                bottom: "0px", transition: "all 0.3s ease-in-out"
                                            }}>
                                                {counters.length > 0 ?
                                                    <Box sx={{ display: "flex", alignItems: "center", "& div div:last-child": { display: "none" } }}>
                                                        <PokemonCounter user='' counters={counters} />
                                                    </Box> :
                                                    <IconButton className='icons' onClick={handleClick} aria-describedby={id} sx={{
                                                        padding: "3px",
                                                        color: isMyText ? (theme) => theme.palette.primary.light : (theme) => theme.palette.primary.main,
                                                    }} >
                                                        <AddReaction sx={{ fontSize: '1.125rem' }} />
                                                    </IconButton>
                                                }

                                                {isMyText && <IconButton className='icons' sx={{ padding: "3px", color: isMyText ? (theme) => theme.palette.primary.light : (theme) => theme.palette.primary.main }} onClick={() => onDeleteBtnClick(message)} >
                                                    <Delete sx={{ backgroundColor: "#fff", borderRadius: "50%", fontSize: '1.125rem' }} />
                                                </IconButton>}
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                )
                            })
                        }
                        {typing && (<Stack ref={scrollRef} sx={{ flexDirection: "row", alignItems: "center", marginTop: "10px" }}>
                            <Avatar src={friend?.avatar} />
                            <Box sx={{
                                background: theme => theme.palette.grey[300],
                                color: theme => theme.palette.grey[400],
                                width: "80px",
                                borderRadius: "50px",
                                marginLeft: "10px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <Typography variant='h2' sx={{ lineHeight: 0.85, width: "50px", position: "relative", bottom: "12px", fontFamily: "'", }} className="typing"></Typography>
                            </Box>
                        </Stack>)}
                    </Box>
                </Scrollbar >

                {/* INPUT FIELD */}
                < Stack sx={{ mt: "10px" }
                }>
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
                                    {/* <EmojiPicker content={0inputMessage} setContent={setInputMessage} sizeMedium /> */}
                                </InputAdornment>
                                <InputAdornment position="end" onClick={sendMessage}>
                                    <IconButton>
                                        <Send />
                                    </IconButton>
                                </InputAdornment>
                            </>
                        }
                    />
                </Stack >
            </Stack >

            <Popover
                id={id}
                open={open}
                anchorEl={anchor}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
                sx={{ "& .MuiPopover-paper": { pt: '35px', backgroundColor: 'transparent', boxShadow: 0 } }}
            >
                <PokemonSelector />
            </Popover>
        </Box >
        <ExtendedUserInfo width={INFO_PANE_WIDTH} friend={friend} />
        {
            openDeleteMsgModal && (
                <RootModal
                    variant="Delete"
                    handleOk={handleDeleteRole}
                    handleClose={() => setOpenDeleteMsgModal(false)}
                    open={openDeleteMsgModal}
                    closeOnly={false}
                    height={"auto"}>
                    <div>Are you sure you want to delete this message?</div>
                </RootModal>
            )
        }
    </>
}

export default ChatBox;