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
  }, [])
  return (
    <Stack>
      <Grid container spacing={2} margin={'0'}>
        <Grid
          item
          xs={6}
          style={{
            backgroundColor: buttonFollow === true ? '#ffd9fc' : 'white',
            color: buttonFollow === true ? '#9747FF' : 'black',
            paddingBottom: '15px',
            borderTopLeftRadius: '10px'
          }}
        >
          <Typography
            variant='h4'
            sx={{
              fontWeight: '200',
              textAlign: 'center',
              fontSize: '16px',
              cursor: 'pointer',

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
            backgroundColor: buttonFollow === false ? '#ffd9fc' : 'white',
            color: buttonFollow === false ? '#9747FF' : 'black',
            paddingBottom: '15px'
          }}
        >
          <Typography
            variant='h4'
            sx={{
              fontWeight: '200',
              textAlign: 'center',
              fontSize: '16px',
              cursor: 'pointer',
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
              <CardUser key={index} userId={user.userId} profile={user.profile[0]} />
            ))
          : listFollower.map((user: any, index) => (
              <CardUser key={index} userId={user.userId} profile={user.profile[0]} />
            ))}
      </Box>
    </Stack>
  )
}
export default Friends
