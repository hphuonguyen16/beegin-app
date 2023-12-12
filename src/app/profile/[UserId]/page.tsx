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
import Friends from '../Friends'
import PostCard from '../../../components/Posts/PostCard'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import UrlConfig from '@/config/urlConfig'
import ButtonFollow from '../../../components/ButtonFollow/ButtonFollow'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import React from 'react'
import { Post } from '@/types/post'
import { usePosts } from '@/context/PostContext'

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
  transform: 'translateY(-80px)',
  minWidth: '300px'
}))
const Posts = styled(Card)(({ theme }) => ({
  height: '100%',
  minHeight: '730px',
  borderRadius: '15px',
  backgroundColor: 'white',
  transform: 'translateY(-80px)'
}))
const ButtonCustom = styled(Button)(({ theme }) => ({
  width: '120px',
  height: '80px',
  borderRadius: '15px',
  backgroundColor: 'white',
  border: '1px solid #D9D9D9'
}))
function page() {
  const pathname = usePathname()
  const segments = pathname.split('/')
  const userId = segments[2]
  const axiosPrivate = useAxiosPrivate()
  const [action, setAction] = useState(true)
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
  const handleDataFromChild = (data: string) => {
    if (data === 'follow') {
      setNumber({
        ...number,
        NumberOfFollower: number.NumberOfFollower + 1
      })
    } else {
      setNumber({
        ...number,
        NumberOfFollower: number.NumberOfFollower - 1
      })
    }
  }
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
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosPrivate.get(UrlConfig.posts.getPostByUserId(userId))
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
        await getUsers(userId)
        await getNumberOfFollow(userId)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  return (
    <StyledProfile>
    <title>Profile | Beegin</title>
      <Grid container spacing={2} sx={{ paddingX: '20px' }}>
        <Grid item xs={12} md={12} sx={{ paddingRight: '16px' }}>
          <Box>
            <Image
              src={data.background}
              alt='Background'
              width={720}
              height={280}
              style={{ width: '100%', height: '280px', borderRadius: '10px', objectFit: 'cover' }}
            />
            <Box sx={{ position: 'absolute', right: '130px !important', top: '19% !important' }}>
              <ButtonFollow userId={userId} sendDataToParent={handleDataFromChild}></ButtonFollow>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Stack spacing={2} alignItems='center' sx={{ position: 'sticky', top: '80px' }}>
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
                    <Typography variant='h6' sx={{ fontWeight: 'light', marginTop: '-13px', fontSize: '16px' }}>
                      {`${data.slug}`}
                    </Typography>
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
        <Grid item xs={12} md={9} sx={{ paddingRight: '48px' }}>
          <Paper>
            <Posts>
              {action === true ? (
                <Box sx={{ padding: '24px 48px' }}>
                  {' '}
                  <Typography
                    variant='h3'
                    sx={{
                      fontWeight: 'medium',
                      fontSize: '25px',
                      fontFamily: 'Inter',
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
                <Friends userId={userId}></Friends>
              )}
            </Posts>
          </Paper>
        </Grid>
      </Grid>
    </StyledProfile>
  )
}

export default page
