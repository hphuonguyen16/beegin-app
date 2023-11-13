'use client'
import PostCard from '@/components/Posts/PostCard'
import { Box, Typography, Stack, FormControl, TextField, Avatar, Grid, Modal } from '@mui/material'
import PostLayout from '@/layouts/PostLayout'
import useResponsive from '@/hooks/useResponsive'
import { Post } from '@/types/post'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { useState, useEffect } from 'react'
import urlConfig from '@/config/urlConfig'
import CreatePost from '@/components/Posts/CreatePost'
import { useAuth } from '@/context/AuthContext'
import { usePosts } from '@/context/PostContext'

export default function Home() {
  const isMobile = useResponsive('down', 'sm')
  // const [postsData, setPostsData] = useState<Post[]>([])
  const { postsState, postsDispatch } = usePosts()
  const [open, setOpen] = useState(false)
  const [newPost, setNewPost] = useState<Post | null>(null)
  const axios = useAxiosPrivate()
  const { user } = useAuth()
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await axios.get(`${urlConfig.posts.getPosts}?limit=10`)
  //       setPostsData(response.data.data.data)
  //     } catch (error) {}
  //   }
  //   fetchPosts()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [1])
  useEffect(() => {
    if (newPost) {
      postsDispatch({ type: 'ADD_POST', payload: newPost })
    }
  }, [newPost])

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            //   width: isMobile ? '80vw' : width ? width : '100vw',
            width: isMobile ? '80vw' : '40vw',
            height: isMobile ? '80vh' : '80vh',
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 2,
            padding: isMobile ? 3 : '20px'
          }}
        >
          <CreatePost open={open} setOpen={setOpen} newPost={newPost} setNewPost={setNewPost} />
        </Box>
      </Modal>
      <PostLayout>
        <Box>
          <Typography variant='h4' sx={{ fontWeight: 'bold', color: 'black' }}>
            Feeds
          </Typography>
          <Stack direction={'row'} sx={{ marginTop: '25px' }} spacing={2}>
            <Avatar src={user?.profile?.avatar} sx={{ width: 50, height: 50 }}></Avatar>
            <TextField
              size='small'
              variant='outlined'
              placeholder='What’s on your mind?'
              onClick={() => setOpen(true)}
              sx={{
                '& .MuiInputBase-root': {
                  height: '50px'
                },
                //   background: 'white',
                //   borderRadius: '10px',
                //   marginBottom: '15px',
                width: '700px'
              }}
            />
          </Stack>
          <Box sx={{ marginTop: '50px' }}>
            {postsState.posts.map((post, index) => (
              <PostCard key={index} post={post} />
            ))}
          </Box>
        </Box>
      </PostLayout>
    </>
  )
}
