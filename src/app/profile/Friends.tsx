/* eslint-disable no-console */
'use client'
import React, { useState, useEffect } from 'react'
import { Grid, Paper, Typography, Box, Stack, styled, TextField, InputAdornment, Skeleton } from '@mui/material'
import CardUser from './UserCard'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import UrlConfig from '@/config/urlConfig'
import SearchIcon from '@mui/icons-material/Search'
import InfiniteScroll from 'react-infinite-scroll-component'

function Friends({ userId }: { userId: string }) {
  const axiosPrivate = useAxiosPrivate()
  const [listFollowing, setFollowing] = useState([])
  const [listFollower, setFollower] = useState([])
  const [buttonFollow, setButtonFollow] = useState(true)
  const [isVisible, setIsVisible] = useState(userId === 'me' ? true : false)
  const [searchValue, setSearchValue] = useState('')
  const [visibleUsers, setVisibleUsers] = useState(6)

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
        // eslint-disable-next-line no-console
        console.log(error)
      }
    }
    fetchData()
  }, [buttonFollow])
  const handleFetchMore = () => {
    setVisibleUsers((prev) => prev + 6);
  };
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
            ),
          }}
          id='outlined-basic'
          label='Search'
          variant='outlined'
          sx={{ width: '95%', margin: '20px 30px 5px 30px ' }}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        {filteredData !== null && filteredData.length > 0 ? (
          <InfiniteScroll
            dataLength={visibleUsers}
            next={handleFetchMore}
            hasMore={visibleUsers < filteredData.length}
            loader={<Skeleton variant='circular' width={60} height={60} />}
          >
            {filteredData.slice(0, visibleUsers).map((user: any, index) => (
              <CardUser
                key={index}
                userId={buttonFollow ? user.following._id : user.follower._id}
                profile={buttonFollow ? user.following.profile : user.follower.profile}
                status={buttonFollow ? true : user.follower.status}
                isVisible={isVisible}
              />
            ))}
          </InfiniteScroll>
        ) : (
          [...Array(5)].map((elementInArray, index) => (
            <Stack key={index} direction={'row'} alignItems={'center'} sx={{ padding: '25px' }}>
              <Skeleton variant='circular' width={60} height={60} />
              <Stack spacing={1} justifyContent={'center'} sx={{ marginLeft: '26px' }}>
                <Skeleton variant='rounded' height={20} width={130} />
                <Skeleton variant='rounded' height={15} width={50} />
              </Stack>
              <Skeleton variant='rounded' sx={{ marginLeft: '720px', borderRadius: '18px' }} width={105} height={40} />
            </Stack>
          ))
        )}
      </Box>
    </Stack>
  )
}
export default Friends
