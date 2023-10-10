'use client'

import useResponsive from '@/hooks/useResponsive'
import { Grid, Box, Stack, Typography, styled, Card, CardMedia, CardContent, } from '@mui/material'
import Avatar from '@/components/common/Avatar'
import AvatarCard from '@/components/common/AvatarCard'
import React, { useState } from 'react'

const ChatList = () => {
    return (
        <>
            <Stack direction={"row"} spacing={2} alignItems='center' sx={{ height: '50px', mb: '10px' }}>
                <Typography variant='h4'>Chats</Typography>
            </Stack>
            <Stack direction={"row"} spacing={2} sx={{ maxWidth: "100%", overflowX: "hidden", overflowY: "hidden", mb: '20px' }}>
                <Avatar status={5} />
                <Avatar status={0} />
                <Avatar status={16} />
                <Avatar status={26} />
                <Avatar status={26} />
            </Stack>
            <Stack spacing={2}>
                <Card sx={{ display: 'flex', justifyContent: "space-between", padding: '10px 15px' }}>
                    <CardMedia component="img"
                        sx={{ height: 60, width: 60, borderRadius: "50%", mr: "10px" }} image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwXgjGKE09VrSaXebUnIUdPwDUvD003fJ-6zfbJIlPE4-it8WwGpaAzWTdUZOz1iiMT4g&usqp=CAU'
                    ></CardMedia>
                    {/* <Box sx={{ display: 'flex', flexDirection: 'column' }}> */}
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', padding: '5px !important', width: '100%', justifyContent: 'center' }}>
                        <Typography component="div" variant="h5">
                            Lil Bear
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            Mac Miller
                        </Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{
                            backgroundColor: (theme) => theme.palette.error.main, borderRadius: '16px', color: "#fff", padding: "3px 7px",
                            border: (theme) => `3px solid ${theme.palette.background.paper}`,
                        }}><Typography variant='subtitle2'>{5}</Typography></Box></Box>
                </Card>
                <Card sx={{ display: 'flex', justifyContent: "space-between", padding: '10px 15px' }}>
                    <CardMedia component="img"
                        sx={{ height: 60, width: 60, borderRadius: "50%", mr: "10px" }} image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwXgjGKE09VrSaXebUnIUdPwDUvD003fJ-6zfbJIlPE4-it8WwGpaAzWTdUZOz1iiMT4g&usqp=CAU'
                    ></CardMedia>
                    {/* <Box sx={{ display: 'flex', flexDirection: 'column' }}> */}
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', padding: '5px !important', width: '100%', justifyContent: 'center' }}>
                        <Typography component="div" variant="h5">
                            Lil Bear
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            Mac Miller
                        </Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{
                            backgroundColor: (theme) => theme.palette.error.main, borderRadius: '16px', color: "#fff", padding: "3px 7px",
                            border: (theme) => `3px solid ${theme.palette.background.paper}`,
                        }}><Typography variant='subtitle2'>{5}</Typography>
                        </Box>
                    </Box>
                </Card>
            </Stack>
        </>)
}

export default ChatList;