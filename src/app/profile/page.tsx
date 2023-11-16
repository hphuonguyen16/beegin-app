/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { Grid, Paper, Typography, Box, Stack, styled, Button, Avatar, Card } from '@mui/material'
import Image from 'next/image'
import background from '@/assets/background1.jpg'
import PeopleIcon from '@mui/icons-material/People'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined'
import Friends from './Friends'
import EditProfile from './EditProfile'
import PostCard from '../../components/Posts/PostCard'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import UrlConfig from '@/config/urlConfig'
// hooks

import React, { useEffect, useState } from 'react'
import { Post } from '@/types/post'

//component-style
const StyledProfile = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  color: '#FFFFFF',
  overflow: 'auto',
  position: 'relative'
}))

const Information = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: '15px',
  backgroundColor: 'white',
  transform: 'translateY(-40px)',
  minWidth: '300px'
}))
const Posts = styled(Card)(({ theme }) => ({
  height: '100%',
  minHeight: '730px',
  borderRadius: '15px',
  backgroundColor: 'white',
  transform: 'translateY(-40px)'
}))
const ButtonCustom = styled(Button)(({ theme }) => ({
  width: '120px',
  height: '80px',
  borderRadius: '15px',
  backgroundColor: 'white',
  border: '1px solid #D9D9D9'
}))
function page() {
  const axiosPrivate = useAxiosPrivate()
  const [action, setAction] = useState(true)
  const [open, setOpen] = useState(false)
  const [data, setData] = useState<{
    firstname: string
    lastname: string
    avatar: string
    birthday: Date
    background: string
    address: string
    bio: string
    gender: boolean
    username: string
  }>({
    firstname: '',
    lastname: '',
    avatar: '',
    birthday: new Date(),
    background: '',
    address: '',
    bio: '',
    gender: true,
    username: ''
  })
  const [postsData, setPostsData] = useState<Post[]>([])
  const [numberPost, setNumberPost] = useState(0)
  const [number, setNumber] = useState<{ NumberOfFollowing: number; NumberOfFollower: number }>({
    NumberOfFollowing: 0,
    NumberOfFollower: 0
  })

  const getUsers = async () => {
    try {
      const url = UrlConfig.me.getMe
      const response = await axiosPrivate.get(url)
      setData(response.data.data)
    } catch (err) {}
  }
  const getNumberOfFollow = async () => {
    try {
      const url = UrlConfig.me.getMyNumberOfFollows
      const response = await axiosPrivate.get(url)
      setNumber(response.data.data)
    } catch (err) {}
  }
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosPrivate.get(UrlConfig.posts.getMyPosts)
        setPostsData(response.data.data)
        setNumberPost(response.data.results)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [1])
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getUsers()
        await getNumberOfFollow()
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <StyledProfile>
      <Box>
        <Image src={background} alt='background' style={{ width: '100%', height: '250px', borderRadius: '10px' }} />
        <Button
          variant={'outlined'}
          sx={{
            padding: '10px 20px',
            width: '130px',
            borderRadius: '18px',
            top: '20%',
            position: 'absolute',
            right: '100px',
            backgroundColor: 'white !important'
          }}
          onClick={handleOpen}
        >
          Edit profile
        </Button>
        <EditProfile open={open} onClose={handleClose} data={data}></EditProfile>
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
                    <Typography
                      variant='h6'
                      sx={{ fontWeight: 'light', marginTop: '-13px', fontSize: '16px' }}
                    >{`@${data.username}`}</Typography>
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
                            {numberPost}
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
                  {' '}
                  <Typography
                    variant='h3'
                    sx={{
                      fontWeight: 'medium',
                      fontSize: '25px',
                      fontFamily: 'Inter',
                      marginBottom: '15px !important'
                    }}
                  >
                    Posts
                  </Typography>
                  {postsData.map((post, index) => (
                    <PostCard key={index} post={post} />
                  ))}
                </Box>
              ) : (
                <Friends userId='me'></Friends>
              )}
            </Posts>
          </Paper>
        </Grid>
      </Grid>
    </StyledProfile>
  )
}

export default page
