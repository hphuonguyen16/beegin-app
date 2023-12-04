'use client'

import useResponsive from '@/hooks/useResponsive'
import { Grid, Box, Stack, Typography, styled, Card, CardMedia, CardContent, IconButton, Skeleton, } from '@mui/material'
import Avatar from '@/components/common/Avatar'
import AvatarCard from '@/components/common/AvatarCard'
import React, { useEffect, useRef, useState } from 'react'
import UrlConfig from '@/config/urlConfig'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import Profile from '@/types/profile'
import { theme } from '@/theme'
import Message from '@/types/message'
import { io } from 'socket.io-client'
import Scrollbar from '@/components/common/Scrollbar'
import { useAuth } from '@/context/AuthContext'
import Loader from '@/components/common/Loader/Loader'
import { useField } from '@mui/x-date-pickers/internals'

interface FriendAndMessage {
    friend: Profile,
    message: Message,
    unseenMessageCount: number,
}

const ChatList = ({ setSelectedFriend, onlineUserIds, setHasFriends }: { setSelectedFriend: any, onlineUserIds: string[], setHasFriends: any }) => {
    const axiosPrivate = useAxiosPrivate()
    const [friends, setFriends] = useState<FriendAndMessage[] | null>(null)
    const [selectedIndex, setSelectedIndex] = useState(0);

    const { user } = useAuth();

    const handleListItemClick = (
        index: number,
        friend: Profile,
    ) => {
        if (index != selectedIndex) {
            setSelectedIndex(index);
            setSelectedFriend(friend);
        }
    };


    const getFriends = async () => {
        try {
            let response = await axiosPrivate.get(`${UrlConfig.messages.getFriends}`)
            var friends = response.data.data
            setFriends(friends)
            setSelectedFriend(friends[0].friend)
            setSelectedIndex(0);
            if (friends.length > 0)
                setHasFriends(true);
            else setHasFriends(false);
        } catch (err) { }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getFriends();
                console.log(friends)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [])

    return (
        <>
            {/* {friends == null && < Loader />} */}
            <Stack direction={"row"} spacing={2} alignItems='center' sx={{ height: '50px', mb: '10px', px: '20px' }}>
                <Typography variant='h4'>Chats</Typography>
            </Stack>
            {/* <Scrollbar> */}
            <Stack direction={"row"} spacing={1} className="no-scrollbar" sx={{ maxWidth: "100%", overflowX: "scroll", overflowY: "hidden", mb: '20px', position: "relative", px: '10px' }}>
                {
                    friends === null ? <Stack spacing={3} direction="row"><Skeleton variant="circular" width={60} height={60} /> <Skeleton variant="circular" width={60} height={60} /></Stack> :
                        friends?.map((friend, index) => (<IconButton sx={{ cursor: "pointer" }} onClick={() => handleListItemClick(index, friend.friend)}><Avatar img={friend.friend.avatar} online={onlineUserIds.includes(friend.friend.user)} /></IconButton>))}
            </Stack>
            {/* </Scrollbar> */}
            <Scrollbar sx={{ height: "80%", paddingBottom: "10px" }}>
                <Box>
                    {friends === null ? <Stack spacing={3}><Skeleton variant='rectangular' height={85} /> <Skeleton variant='rectangular' height={85} /> </Stack> :
                        friends?.map((friend, index) => (
                            <Card sx={{
                                display: 'flex', justifyContent: "space-between", padding: '12px 20px', cursor: "pointer", mb: "12px",
                                transition: "0.3s all ease-in-out",
                                ":hover": { boxShadow: theme => theme.shadows[12] },
                                //@ts-ignore
                                ...(selectedIndex === index && { background: theme => theme.palette.primary.lighter })
                            }}
                                onClick={() => handleListItemClick(index, friend.friend)}
                            >
                                <Avatar img={friend.friend.avatar} online={onlineUserIds.includes(friend.friend.user)} />
                                {/* <Box sx={{ display: 'flex', flexDirection: 'column' }}> */}
                                <CardContent sx={{ display: 'flex', flexDirection: 'column', padding: '5px !important', width: '100%', justifyContent: 'center', ml: "10px" }}>
                                    <Typography component="div" variant="h5">
                                        {friend.friend.firstname + " " + friend.friend.lastname}
                                    </Typography>
                                    {friend.message && <Typography variant="subtitle1" color="text.secondary" component="div">
                                        {friend.message.fromSelf && "You: "} {friend.message.type === "text" ? friend.message.content : "Image"}
                                    </Typography>}
                                </CardContent>
                                {friend.unseenMessageCount > 0 && <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Box sx={{
                                        backgroundColor: (theme) => theme.palette.primary.main, borderRadius: '16px', color: "#fff", padding: "3px 7px",
                                        border: (theme) => `3px solid ${theme.palette.background.paper}`,
                                    }}><Typography variant='subtitle2'>{friend.unseenMessageCount}</Typography></Box></Box>}
                            </Card>))}
                </Box>
            </Scrollbar>
        </>)
}

export default ChatList;