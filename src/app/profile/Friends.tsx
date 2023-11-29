'use client'
import React, { useState, useEffect } from 'react'
import { Grid, Paper, Typography, Box, Stack, styled, TextField, InputAdornment } from '@mui/material'
import CardUser from './UserCard'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import UrlConfig from '@/config/urlConfig'
import SearchIcon from '@mui/icons-material/Search'

function Friends({ userId }: { userId: string }) {
  const axiosPrivate = useAxiosPrivate()
  const [listFollowing, setFollowing] = useState([])
  const [listFollower, setFollower] = useState([])
  const [buttonFollow, setButtonFollow] = useState(true)
  const [isVisible, setIsVisible] = useState(userId === 'me' ? true : false)
  const [searchValue, setSearchValue] = useState('')

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

  const filteredData = buttonFollow
    ? listFollowing.filter(
        (user: any) =>
          user.following &&
          user.following.profile &&
          `${user.following.profile.firstname} ${user.following.profile.lastname}`
            .toLowerCase()
            .includes(searchValue.toLowerCase())
      )
    : listFollower.filter(
        (user: any) =>
          user.follower &&
          user.follower.profile &&
          `${user.follower.profile.firstname} ${user.follower.profile.lastname}`
            .toLowerCase()
            .includes(searchValue.toLowerCase())
      )

  console.log(listFollower)
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
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            )
          }}
          id='outlined-basic'
          label='Search'
          variant='outlined'
          sx={{ width: '95%', margin: '20px 30px 5px 30px ' }}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {buttonFollow === true
          ? filteredData.map((user: any, index) => (
              <CardUser
                key={index}
                userId={user.following._id}
                profile={user.following.profile}
                status={true}
                isVisible={isVisible}
              />
            ))
          : filteredData.map((user: any, index) => (
              <CardUser
                key={index}
                userId={user.follower._id}
                profile={user.follower.profile}
                status={user.follower.status}
                isVisible={isVisible}
              />
            ))}
      </Box>
    </Stack>
  )
}
export default Friends
