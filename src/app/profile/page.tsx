/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { Grid, Paper, Typography, Box, Stack, styled, Button, Avatar, Card, ToggleButtonGroup, ToggleButton, alpha } from '@mui/material'
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
import Scrollbar from '@/components/common/Scrollbar'
import DefaultBackground from '@/assets/default_background.jpg'

// hooks
import React, { useEffect, useState } from 'react'
import { Post } from '@/types/post'
import { usePosts } from '@/context/PostContext'
import withAuth from '@/authorization/withAuth'

//icons
import { IoMdImages } from "react-icons/io";
import { BsPeople } from "react-icons/bs";
import { TbCell } from "react-icons/tb";

//component-style
export const StyledProfile = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  color: '#FFFFFF',
  overflow: 'auto',
  position: 'relative'
}))

export const Information = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: '15px',
  backgroundColor: 'white',
  minWidth: '300px'
}))

export const Posts = styled(Card)(({ theme }) => ({
  height: '100%',
  minHeight: '730px',
  borderRadius: '15px',
  backgroundColor: 'white',
}))

const ButtonCustom = styled(Button)(({ theme }) => ({
  width: '120px',
  height: '80px',
  borderRadius: '15px',
  backgroundColor: 'white',
  border: '1px solid #D9D9D9'
}))

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({

  backgroundColor: 'white',
  boxShadow: '0 6px 12px -4px rgba(145, 158, 171, 0.1)',
  padding: '2px',
  // border: '1px solid #D9D9D9A5',
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

export const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  fontSize: '25px', padding: '10px 35px', color: theme.palette.grey[600],
  display: 'flex', flexDirection: 'column',
  '&:disabled': {
    color: theme.palette.secondary.dark,
    //@ts-ignore
    backgroundColor: theme.palette.secondary.lighter + 'aa',
  }
}))



function page() {
  const axiosPrivate = useAxiosPrivate()
  const [showPosts, setShowPosts] = useState(true)
  const [open, setOpen] = useState(false)
  const [data, setData] = useState<{
    firstname: string
    lastname: string
    avatar: string
    birthday: any
    background: string
    address: string
    bio: string
    gender: boolean
    slug: string
  }>({
    firstname: '',
    lastname: '',
    avatar: '',
    birthday: new Date(),
    background: '',
    address: '',
    bio: '',
    gender: true,
    slug: ''
  })
  const { postsState, postsDispatch } = usePosts()
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
    } catch (err) { }
  }
  const getNumberOfFollow = async () => {
    try {
      const url = UrlConfig.me.getMyNumberOfFollows
      const response = await axiosPrivate.get(url)
      setNumber(response.data.data)
    } catch (err) { }
  }
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosPrivate.get(UrlConfig.posts.getMyPosts)
        let posts = response.data.data
        posts = posts.map(async (post: Post) => {
          const likeResponse = await axiosPrivate.get(UrlConfig.posts.checkLikePost(post._id))
          const isLiked = likeResponse.data.data
          return {
            ...post,
            isLiked
          }
        })
        posts = await Promise.all(posts)
        postsDispatch({ type: 'SET_POSTS', payload: posts })
        setNumberPost(response.data.results)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPosts()
    return () => {
      postsDispatch({ type: 'SET_POSTS', payload: [] })
    }
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
  }, [open])

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <StyledProfile>
      <title>Profile | Beegin</title>
      <Grid container spacing={2} sx={{ paddingX: '20px' }}>
        <Grid item xs={12} md={12} sx={{ paddingRight: '16px' }}>
          <Box>
            <Image
              src={data.background ?? DefaultBackground}
              alt='Background'
              width={720}
              height={280}
              style={{ width: '100%', height: '280px', borderRadius: '10px', objectFit: 'cover' }}
            />
            <Button
              variant={'outlined'}
              sx={{
                padding: '10px 20px',
                width: '130px',
                borderRadius: '18px',
                top: '18%',
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
        </Grid>
        <Grid item xs={12} md={3} sx={{ transform: 'translateY(-80px)', }}>
          <Stack spacing={2} alignItems='center' sx={{ position: 'sticky', top: '80px' }}>
            <Box>
              <Information>
                <Stack spacing={2} alignItems='center' sx={{ padding: "15px 20px" }}>
                  <Avatar src={data.avatar} sx={{ width: '150px', height: '150px', marginTop: '15px' }}></Avatar>
                  <Typography variant='h4'>{data.firstname + ' ' + data.lastname}</Typography>
                  <Typography variant='h6' sx={{ fontWeight: 'light', marginTop: '-13px', fontSize: '16px' }}>
                    {`@${data.slug}`}
                  </Typography>
                  <Typography variant='h6' sx={{ fontWeight: 'light', marginTop: '0px', fontSize: '13px' }}>
                    <LocationOnIcon fontSize='medium' /> {data.address}
                  </Typography>
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
              <StyledToggleButtonGroup
                size='large'
                value={showPosts}
                exclusive
                onChange={() => setShowPosts(!showPosts)}
                aria-label="text alignment"
              >
                <StyledToggleButton size='large' value={true} aria-label="left aligned" disabled={showPosts === true}>
                  <IoMdImages />
                  <Typography sx={{ fontSize: "13px", lineHeight: 1, mt: '4px' }}>Posts</Typography>
                </StyledToggleButton>
                <Paper sx={{ margin: '0 1.5px !important' }}></Paper>
                <StyledToggleButton size='large' value={false} aria-label="centered" disabled={showPosts === false}>
                  <TbCell />
                  <Typography sx={{ fontSize: "13px", lineHeight: 1, mt: '4px' }}>Socials</Typography>
                </StyledToggleButton>
              </StyledToggleButtonGroup>
              {/* <Grid container spacing={2} sx={{ marginBottom: '30px' }}>
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
              </Grid> */}
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} md={9} sx={{ paddingRight: '48px', transform: 'translateY(-80px)', }}>
          <Paper>
            <Posts>
              {showPosts === true ? (
                <Box sx={{ padding: '24px 48px' }}>
                  {' '}
                  <Typography
                    variant='h3'
                    sx={{
                      fontWeight: 'medium',
                      fontSize: '25px',
                      marginBottom: '25px !important'
                    }}
                  >
                    Posts
                  </Typography>
                  {postsState.posts.map((post, index) => (
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

export default withAuth(page)(['user', 'business'])
