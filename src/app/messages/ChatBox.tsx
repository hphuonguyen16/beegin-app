'use client'

import useResponsive from '@/hooks/useResponsive'
import { Grid, Box, Stack, Typography, styled, Card, CardMedia, CardContent, FilledInput, OutlinedInput, InputAdornment, IconButton, Paper, Avatar } from '@mui/material'
import { Send, InfoRounded, AddReaction, Delete } from '@mui/icons-material'
import ExtendedUserInfo from './ExtendedUserInfo'
import AvatarCard from '@/components/common/AvatarCard'
import React, { useState } from 'react'

const INFO_PANE_WIDTH = "30%";

const ChatBox = () => {
    const [isInfoOpened, setIsInfoOpened] = useState(false);

    const chats = [
        { message: "ok", sender: "", timestamp: "" },
        { message: "ok ijojf oj idf odoi j", sender: "", timestamp: "" },
        { message: "ok ijojf oj idf odoi j ok ijojf oj idf odoi j ok ijojf oj idf odoi j ok ijojf oj idf odoi j", sender: "", timestamp: "" },
        { message: "ok", sender: "me", timestamp: "" },
        { message: "ok ijojf oj idf ", sender: "", timestamp: "" },
        { message: "ok ijojf oj idf ", sender: "", timestamp: "" },
        { message: "ok", sender: "me", timestamp: "" },
        { message: "ok ijojf oj idf ", sender: "", timestamp: "" },
        { message: "ok ijojf oj idf odoi j ok ijojf oj idf odoi j ok ijojf oj idf odoi j ok ijojf oj idf odoi ok ijojf oj idf odoi j ok ijojf oj idf odoi j ok ijojf oj idf odoi j ok ijojf oj idf odoi", sender: "me", timestamp: "" },
        { message: "ok ijojf oj idf ", sender: "", timestamp: "" },
        { message: "ok", sender: "", timestamp: "" },
        { message: "ok ijojf oj idf odoi j", sender: "", timestamp: "" },
        { message: "ok ijojf oj idf odoi j ok ijojf oj idf odoi j ok ijojf oj idf odoi j ok ijojf oj idf odoi j", sender: "", timestamp: "" },
        { message: "ok ijojf oj idf ", sender: "", timestamp: "" },
        { message: "ok", sender: "me", timestamp: "" },
        { message: "ok ijojf oj idf ", sender: "", timestamp: "" },
        { message: "ok", sender: "me", timestamp: "" },
        { message: "ok ijojf oj idf ", sender: "", timestamp: "" },
        { message: "ok", sender: "", timestamp: "" },
        { message: "ok ijojf oj idf odoi j", sender: "", timestamp: "" },
        { message: "ok ijojf oj idf odoi j ok ijojf oj idf odoi j ok ijojf oj idf odoi j ok ijojf oj idf odoi j", sender: "", timestamp: "" },
    ]

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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: "#fff", padding: '15px 25px', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}>
                <AvatarCard name={"test"} subtitle='active 5m ago' />
                <IconButton onClick={() => setIsInfoOpened(!isInfoOpened)}><InfoRounded /></IconButton>
            </Box>
            <Stack sx={{ height: "100%", overflow: "hidden", padding: '30px 40px' }}>

                {/* TEXTS */}
                <Box sx={{ maxHeight: "100%", overflowX: "hidden", overflowY: "scroll" }}>
                    {chats.map((chat, index) => {
                        var isMyText = chat.sender === "me";
                        var isTopText = index == 0 || chats[index - 1].sender === "me";
                        return (
                            <Stack sx={{ display: 'flex', flexDirection: "row", justifyContent: isMyText ? "flex-end" : "flex-start" }}>
                                {!isMyText && <Box sx={{ width: "32px", height: "32px", mr: "24px" }}>
                                    {isTopText && (<Avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwXgjGKE09VrSaXebUnIUdPwDUvD003fJ-6zfbJIlPE4-it8WwGpaAzWTdUZOz1iiMT4g&usqp=CAU'></Avatar>)}
                                </Box>}
                                <Stack sx={{ display: "flex", flexDirection: "column", position: "relative", "& .icons": { opacity: "0" }, "&:hover .icons": { opacity: "1" } }}>
                                    {/* {(index == 0 || chats[index - 1].sender === "me") && <Typography>Bear, 5 minutes ago</Typography>} */}
                                    <Paper sx={{
                                        display: "flex",
                                        padding: "10px 15px",
                                        mb: "14px",
                                        minWidth: "60px", maxWidth: "420px",
                                        borderRadius: "8px",
                                        backgroundColor: isMyText ? (theme) => theme.palette.primary.main : "#fff",
                                        color: isMyText ? '#fff' : (theme) => theme.palette.primary.main
                                    }}>
                                        <Typography>{chat.message}</Typography>
                                    </Paper>
                                    <Stack sx={{
                                        flexDirection: "row",
                                        position: "absolute",
                                        ...(isMyText ? { left: "0px" } : { right: "0px" }),
                                        bottom: "0px", transition: "all 0.3s ease-in-out"
                                    }} className='icons'> <IconButton sx={{
                                        padding: "3px",
                                        color: isMyText ? (theme) => theme.palette.primary.light : (theme) => theme.palette.primary.main,
                                    }} ><AddReaction sx={{ fontSize: '1.125rem' }} /></IconButton>
                                        <IconButton sx={{ padding: "3px", color: isMyText ? (theme) => theme.palette.primary.light : (theme) => theme.palette.primary.main }} ><Delete sx={{ fontSize: '1.125rem' }} /></IconButton>
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
                        sx={{ borderRadius: '20px', paddingX: "26px", backgroundColor: '#fff', '& .MuiOutlinedInput-notchedOutline': { border: '0' } }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton>
                                    <Send />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </Stack>
            </Stack>
        </Box>
        <ExtendedUserInfo width={INFO_PANE_WIDTH} />
    </>
}

export default ChatBox;