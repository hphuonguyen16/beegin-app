'use client'

import useResponsive from '@/hooks/useResponsive'
import { Grid, Box, Stack, Typography, styled, Card, CardMedia, CardContent, } from '@mui/material'
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

interface FriendAndMessage {
    friend: Profile,
    message: Message
}

const ChatList = ({ setSelectedFriend }: { setSelectedFriend: any }) => {
    const axiosPrivate = useAxiosPrivate()
    const [friends, setFriends] = useState<FriendAndMessage[]>([])
    const [selectedIndex, setSelectedIndex] = useState(0);

    const { user } = useAuth();

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
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
            setFriends(response.data.data)
            setSelectedFriend(response.data.data[0].friend)
            setSelectedIndex(0);
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


    const socket = useRef();
    socket.current = io(`${process.env.NEXT_APP_BEEGIN_DOMAIN}`)
    const [onlineUserIds, setOnlineUserIds] = useState<any>([]);
    useEffect(() => {
        if (socket.current) {
            socket.current.on("get-users", (users: any) => {
                setOnlineUserIds(users)
            });
        }
    }, [user]);

    return (
        <>
            <Stack direction={"row"} spacing={2} alignItems='center' sx={{ height: '50px', mb: '10px', px: '20px' }}>
                <Typography variant='h4'>Chats</Typography>
            </Stack>
            <Scrollbar>
                <Stack direction={"row"} spacing={2} sx={{ maxWidth: "100%", minHeight: "100%", mb: '20px', position: "relative", px: '10px' }}>
                    {friends.map(friend => (<Avatar img={friend.friend.avatar} status={onlineUserIds.includes(friend.friend.user) ? 0 : 4} />))}
                </Stack>
            </Scrollbar>
            <Stack spacing={2}>
                {friends.map((friend, index) => (
                    <Card sx={{
                        display: 'flex', justifyContent: "space-between", padding: '12px 20px', cursor: "pointer",
                        transition: "0.3s all ease-in-out",
                        ":hover": { boxShadow: theme => theme.shadows[12] },
                        ...(selectedIndex === index && { background: theme => theme.palette.primary.lighter })
                    }}
                        onClick={(event) => handleListItemClick(event, index, friend.friend)}
                    >
                        <Avatar img={friend.friend.avatar} status={onlineUserIds.includes(friend.friend.user) ? 0 : 4} />
                        {/* <Box sx={{ display: 'flex', flexDirection: 'column' }}> */}
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', padding: '5px !important', width: '100%', justifyContent: 'center', ml: "10px" }}>
                            <Typography component="div" variant="h5">
                                {friend.friend.firstname + " " + friend.friend.lastname}
                            </Typography>
                            {friend.message && <Typography variant="subtitle1" color="text.secondary" component="div">
                                {friend.message.fromSelf && "You: "} {friend.message.type === "text" ? friend.message.content : "Image"}
                            </Typography>}
                        </CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{
                                backgroundColor: (theme) => theme.palette.error.main, borderRadius: '16px', color: "#fff", padding: "3px 7px",
                                border: (theme) => `3px solid ${theme.palette.background.paper}`,
                            }}><Typography variant='subtitle2'>{5}</Typography></Box></Box>
                    </Card>))}
            </Stack>
        </>)
}

export default ChatList;