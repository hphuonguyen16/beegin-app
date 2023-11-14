'use client'
import React, { useState, useEffect } from 'react'
import { Grid, Paper, Typography, Box, Stack, styled } from '@mui/material'
import CardUser from './UserCard'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import UrlConfig from '@/config/urlConfig'

function Friends({ userId }: { userId: string }) {
  const axiosPrivate = useAxiosPrivate()
  const [listFollowing, setFollowing] = useState([])
  const [listFollower, setFollower] = useState([])
  const [buttonFollow, setButtonFollow] = useState(true)
  const [isVisible, setIsVisible] = useState(userId === 'me' ? true : false)

  const getListFollowing = async (userId: any) => {
    try {
      let response
      if (userId === 'me') {
        response = await axiosPrivate.get(`${UrlConfig.me.getMyFollowingList}`)
      } else {
        const url = UrlConfig.otherUsers.getMyFollowingList.replace(':id', userId)
        response = await axiosPrivate.get(url)
      }
      setFollowing(response.data.data)
    } catch (err) {}
  }
  const getListFollower = async (userId: any) => {
    try {
      let response
      if (userId === 'me') {
        response = await axiosPrivate.get(`${UrlConfig.me.getMyFollowerList}`)
      } else {
        const url = UrlConfig.otherUsers.getMyFollowerList.replace(':id', userId)
        response = await axiosPrivate.get(url)
      }
      setFollower(response.data.data)
    } catch (err) {}
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getListFollower(userId)
        await getListFollowing(userId)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [buttonFollow])
  return (
    <Stack>
      <Grid container spacing={2} margin={'0'}>
        <Grid
          item
          xs={6}
          style={{
            borderBottom: buttonFollow === true ? '2px solid #9747FF' : 'none',
            paddingBottom: '15px',
            borderTopLeftRadius: '10px'
          }}
        >
          <Typography
            variant='h4'
            sx={{
              textAlign: 'center',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: 'bold',
              color: buttonFollow === true ? '#9747FF' : 'black',
              '&:hover': {
                color: '#9747FF',
                fontWeight: 'bold'
              }
            }}
            onClick={() => setButtonFollow(true)}
          >
            Following
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          style={{
            borderBottom: buttonFollow === false ? '2px solid #9747FF' : 'none',
            paddingBottom: '15px'
          }}
        >
          <Typography
            variant='h4'
            sx={{
              textAlign: 'center',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: 'bold',
              color: buttonFollow === false ? '#9747FF' : 'black',
              '&:hover': {
                color: '#9747FF',
                fontWeight: 'bold'
              }
            }}
            onClick={() => setButtonFollow(false)}
          >
            Follower
          </Typography>
        </Grid>
      </Grid>
      <Box>
        {buttonFollow === true
          ? listFollowing.map((user: any, index) => (
              <CardUser key={index} userId={user.userId} profile={user.profile[0]} status={true} isVisible = {isVisible} />
            ))
          : listFollower.map((user: any, index) => (
              <CardUser key={index} userId={user.userId} profile={user.profile[0]} status={user.status} isVisible = {isVisible} />
            ))}
        {/* {data.map((user: any, index) => (
          <CardUser key={index} userId={user.userId} profile={user.profile[0]} />
        ))} */}
      </Box>
    </Stack>
  )
}
export default Friends
