'use client'

import useResponsive from '@/hooks/useResponsive'
import { Grid, Box, Stack, Typography, styled, Card, CardMedia, CardContent, } from '@mui/material'
import Avatar from '@/components/common/Avatar'
import AvatarCard from '@/components/common/AvatarCard'
import React, { useEffect, useState } from 'react'
import UrlConfig from '@/config/urlConfig'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import Profile from '@/types/profile'
import { theme } from '@/theme'

const ChatList = ({ setSelectedFriend }: { setSelectedFriend: any }) => {

    const axiosPrivate = useAxiosPrivate()
    const [friends, setFriends] = useState<Profile[]>([])
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
        friend: Profile,
    ) => {
        setSelectedIndex(index);
        setSelectedFriend(friend);
    };


    const getFriends = async () => {
        try {
            let response = await axiosPrivate.get(`${UrlConfig.messages.getFriends}`)
            setFriends(response.data.data)
            console.log(friends[0])
            setSelectedFriend(friends[0])
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
            <Stack direction={"row"} spacing={2} alignItems='center' sx={{ height: '50px', mb: '10px', px: '20px' }}>
                <Typography variant='h4'>Chats</Typography>
            </Stack>
            <Stack direction={"row"} spacing={2} sx={{ maxWidth: "100%", overflowX: "hidden", overflowY: "hidden", mb: '20px', px: '10px' }}>
                {friends.map(friend => (<Avatar img={friend.avatar} status={5} />))}
            </Stack>
            <Stack spacing={2}>
                {friends.map((friend, index) => (
                    <Card sx={{
                        display: 'flex', justifyContent: "space-between", padding: '12px 20px', cursor: "pointer",
                        transition: "0.3s all ease-in-out",
                        ":hover": { boxShadow: theme => theme.shadows[12] },
                        ...(selectedIndex === index && { background: theme => theme.palette.primary.lighter })
                    }}
                        onClick={(event) => handleListItemClick(event, index, friend)}
                    >
                        <CardMedia component="img"
                            sx={{ height: 60, width: 60, borderRadius: "50%", mr: "10px" }} image={friend.avatar}
                        ></CardMedia>
                        {/* <Box sx={{ display: 'flex', flexDirection: 'column' }}> */}
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', padding: '5px !important', width: '100%', justifyContent: 'center' }}>
                            <Typography component="div" variant="h5">
                                {friend.fullname}
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
                    </Card>))}
            </Stack>
        </>)
}

export default ChatList;