/* eslint-disable no-console */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { Grid, Paper, Typography, Box, Stack, styled, Button, Avatar } from '@mui/material'
import Image from 'next/image'
import background from '@/assets/background1.jpg'
import PeopleIcon from '@mui/icons-material/People'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined'
import Friends from '../Friends'
import Post from '../../../components/Posts/PostCard'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import UrlConfig from '@/config/urlConfig'
import { Link } from 'react-router-dom'

import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import React from 'react'

const StyledProfile = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  color: '#FFFFFF',
  overflow: 'auto',
  position: 'relative'
}))

const Information = styled('div')(({ theme }) => ({
  height: '100%',
  borderRadius: '15px',
  backgroundColor: 'white',
  transform: 'translateY(-40px)'
}))
const Posts = styled('div')(({ theme }) => ({
  height: '730px',
  borderRadius: '15px',
  backgroundColor: 'white',
  transform: 'translateY(-40px)'
}))
const ButtonCustom = styled('div')(({ theme }) => ({
  width: '120px',
  height: '80px',
  borderRadius: '15px',
  backgroundColor: '#FEFAFA',
  border: '1px solid #D9D9D9',
  cursor: 'pointer'
}))

export default function page() {
  const router = useRouter()
  const pathname = usePathname()
  const segments = pathname.split('/')
  const userId = segments[2]
  const axiosPrivate = useAxiosPrivate()
  const [data, setData] = useState([])
  const [number, setNumber] = useState([])
  const [follow, setFollow] = useState(true)
  const getUsers = async (id: any) => {
    try {
      const url = UrlConfig.otherUsers.getProfileByID.replace(':id', id)
      const response = await axiosPrivate.get(url)
      setData(response.data.data)
    } catch (err) {}
  }
  const getNumberOfFollow = async (id: any) => {
    try {
      const url = UrlConfig.otherUsers.getMyNumberOfFollows.replace(':id', id)
      const response = await axiosPrivate.get(url)
      setNumber(response.data.data)
    } catch (err) {}
  }
  const isFollowing = async (id: any) => {
    try {
      const url = UrlConfig.me.isFollowing.replace(':id', id)
      const response = await axiosPrivate.get(url)
      setFollow(response.data.data)
    } catch (err) {}
  }
  const followingOtherUser = async (id: any) => {
    try {
      const url = UrlConfig.me.followingOtherUser
      await axiosPrivate.post(url, { id: id })
    } catch (err) {}
  }
  const unfollow = async (id: any) => {
    try {
      const url = UrlConfig.me.unfollow.replace(':id', id)
      await axiosPrivate.delete(url)
    } catch (err) {}
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getUsers(userId)
        await getNumberOfFollow(userId)
        await isFollowing(userId)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])
  const [action, setAction] = useState(true)
  const [open, setOpen] = useState(false)
  const handleFollow = () => {
    if (follow === true) {
      unfollow(userId)
    } else {
      followingOtherUser(userId)
    }
    setFollow((prev: boolean) => !prev)
  }
  console.log(data)
  return (
    <StyledProfile>
      <Box>
        <Image src={background} alt='background' style={{ width: '100%', height: '250px', borderRadius: '10px' }} />
        <Button
          variant={follow ? 'outlined' : 'contained'}
          sx={{
            padding: '10px 20px',
            width: '100px',
            borderRadius: '18px',
            position: 'absolute',
            right: '100px',
            top: '18%',
            backgroundColor: follow ? 'white !important' : 'initial'
          }}
          onClick={handleFollow}
        >
          {follow ? 'Following' : 'Follow'}
        </Button>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Stack spacing={2} alignItems='center'>
            <Box>
              <Information>
                <Stack spacing={2} alignItems='center'>
                  <Paper style={{ backgroundColor: 'white' }}>
                    <Avatar src={data.avatar} sx={{ width: '150px', height: '150px', marginTop: '25px' }}></Avatar>
                  </Paper>
                  <Paper style={{ backgroundColor: 'white' }}>
                    <Typography variant='h4'>{data.firstname + ' ' + data.lastname}</Typography>
                  </Paper>
                  <Paper style={{ backgroundColor: 'white' }}>
                    <Typography variant='h6' sx={{ fontWeight: 'light', marginTop: '0px', fontSize: '13px' }}>
                      <LocationOnIcon fontSize='medium' /> {data.address}
                    </Typography>
                  </Paper>
                  <Paper style={{ backgroundColor: 'white' }}>
                    <Typography
                      variant='h6'
                      sx={{
                        fontWeight: 'light',
                        textAlign: 'center',
                        fontSize: '15px',
                        fontFamily: 'Inter',
                        margin: '0 15px'
                      }}
                    >
                      {data.bio}
                    </Typography>
                  </Paper>
                  <Box style={{ backgroundColor: 'white', marginTop: '15px' }}>
                    <Grid container spacing={2}>
                      <Grid item xs={4} paddingRight='16px'>
                        <Stack spacing={2}>
                          <Typography
                            variant='h4'
                            sx={{ fontWeight: 'light', textAlign: 'center', fontSize: '15px', fontFamily: 'Inter' }}
                          >
                            Posts
                          </Typography>
                          <Typography
                            variant='h4'
                            sx={{
                              fontWeight: 'medium',
                              textAlign: 'center',
                              fontSize: '15px',
                              fontFamily: 'Inter',
                              marginTop: '6px !important'
                            }}
                          >
                            1.2K
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={4} paddingRight='16px'>
                        <Stack spacing={2} paddingBottom={2}>
                          <Typography
                            variant='h4'
                            sx={{ fontWeight: 'light', textAlign: 'center', fontSize: '15px', fontFamily: 'Inter' }}
                          >
                            Followers
                          </Typography>
                          <Typography
                            variant='h4'
                            sx={{
                              fontWeight: 'medium',
                              textAlign: 'center',
                              fontSize: '15px',
                              fontFamily: 'Inter',
                              marginTop: '6px !important'
                            }}
                          >
                            {number.NumberOfFollower}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={4} paddingRight='16px'>
                        <Stack spacing={2}>
                          <Typography
                            variant='h4'
                            sx={{ fontWeight: 'light', textAlign: 'center', fontSize: '15px', fontFamily: 'Inter' }}
                          >
                            Following
                          </Typography>
                          <Typography
                            variant='h4'
                            sx={{
                              fontWeight: 'medium',
                              textAlign: 'center',
                              fontSize: '15px',
                              fontFamily: 'Inter',
                              marginTop: '6px !important'
                            }}
                          >
                            {number.NumberOfFollowing}
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Box>
                </Stack>
              </Information>
            </Box>
            <Box>
              <Grid container spacing={2} sx={{ marginBottom: '30px' }}>
                <Grid item xs={6}>
                  <ButtonCustom onClick={() => setAction(true)}>
                    <Stack spacing={2} textAlign='center' alignItems='center'>
                      <BoltOutlinedIcon color='primary' fontSize='medium' style={{ marginTop: '10px' }} />
                      <Typography
                        variant='h4'
                        sx={{
                          fontWeight: '200',
                          textAlign: 'center',
                          fontSize: '15px',
                          marginTop: '3px !important',
                          color: (theme) => theme.palette.primary.main
                        }}
                      >
                        Activities
                      </Typography>
                    </Stack>
                  </ButtonCustom>
                </Grid>
                <Grid item xs={6}>
                  <ButtonCustom onClick={() => setAction(false)}>
                    <Stack spacing={2} textAlign='center' alignItems='center'>
                      <PeopleIcon color='primary' fontSize='medium' style={{ marginTop: '10px' }} />
                      <Typography
                        variant='h4'
                        sx={{
                          fontWeight: '200',
                          textAlign: 'center',
                          fontSize: '15px',
                          marginTop: '3px !important',
                          color: (theme) => theme.palette.primary.main
                        }}
                      >
                        Socials
                      </Typography>
                    </Stack>
                  </ButtonCustom>
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper>
            <Posts>
              {action === true ? (
                <Box padding={3}>
                  <Post></Post>
                </Box>
              ) : (
                <Friends userId={userId}></Friends>
              )}
            </Posts>
          </Paper>
        </Grid>
      </Grid>
    </StyledProfile>
  )
}
