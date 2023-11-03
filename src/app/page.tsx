'use client'
import PostCard from '@/components/Posts/PostCard'
import { Box, Typography, Stack, FormControl, TextField, Avatar, Grid, Modal } from '@mui/material'
import PostLayout from '@/layouts/PostLayout'
import useResponsive from '@/hooks/useResponsive'
import { Post } from '@/types/post'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { useState, useEffect } from 'react'
import urlConfig from '@/config/urlConfig'
import RootModal from '@/components/common/modals/RootModal'
import CreatePost from '@/components/Posts/CreatePost'

// const postData: Post[] = [
//   {
//     content: 'This is the first post content.',
//     user: { username: 'user1', fullName: 'User One' },
//     images: [
//       'https://images.pexels.com/photos/6422029/pexels-photo-6422029.jpeg?auto=compress&cs=tinysrgb&w=1600',
//       'https://images.pexels.com/photos/6588618/pexels-photo-6588618.jpeg?auto=compress&cs=tinysrgb&w=1600'
//     ],
//     numLikes: 10,
//     numComments: 5,
//     createdAt: '2023-10-14T08:30:00'
//   },
//   {
//     content: 'Another post for testing.',
//     images: [
//       'https://images.pexels.com/photos/4480156/pexels-photo-4480156.jpeg?auto=compress&cs=tinysrgb&w=1600',
//       'https://images.pexels.com/photos/5836625/pexels-photo-5836625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//       'https://images.pexels.com/photos/5836625/pexels-photo-5836625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
//     ],
//     user: { username: 'user2', fullName: 'User Two' },
//     numLikes: 15,
//     numComments: 8,
//     createdAt: '2023-10-15T14:45:00'
//   },
//   {
//     content: 'Sample post with categories.',
//     categories: ['Technology', 'Science'],
//     images: [
//       'https://images.pexels.com/photos/6422029/pexels-photo-6422029.jpeg?auto=compress&cs=tinysrgb&w=1600',
//       'https://images.pexels.com/photos/6588618/pexels-photo-6588618.jpeg?auto=compress&cs=tinysrgb&w=1600',
//       'https://images.pexels.com/photos/4480156/pexels-photo-4480156.jpeg?auto=compress&cs=tinysrgb&w=1600',
//       'https://images.pexels.com/photos/5836625/pexels-photo-5836625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
//     ],
//     user: { username: 'user3', fullName: 'User Three' },
//     numLikes: 20,
//     numComments: 12,
//     createdAt: '2023-10-16T10:15:00'
//   },
//   {
//     content: 'Post with hashtags.',
//     hashtags: ['#programming', '#travel'],
//     user: { username: 'user4', fullName: 'User Four' },
//     numLikes: 18,
//     numComments: 7,
//     createdAt: '2023-10-17T16:00:00'
//   },
//   {
//     content: 'A simple post with no extra data.',
//     user: { username: 'user5', fullName: 'User Five' },
//     numLikes: 12,
//     numComments: 3,
//     createdAt: '2023-10-18T12:30:00'
//   }
// ]

export default function Home() {
  const isMobile = useResponsive('down', 'sm')
  const [postsData, setPostsData] = useState<Post[]>([])
  const axios = useAxiosPrivate()
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(urlConfig.posts.getPosts)
        setPostsData(response.data.data.data)
      } catch (error) {}
    }
    fetchPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [1])
  return (
    <PostLayout>
      <Box>
        <Modal open={true}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              //   width: isMobile ? '80vw' : width ? width : '100vw',
              width: isMobile ? '80vw' : '40vw',
              height: isMobile ? '80vh' : '60vh',
              bgcolor: 'background.paper',
              boxShadow: 24,
              borderRadius: 2,
              padding: isMobile ? 3 : '20px'
            }}
          >
            <CreatePost />
          </Box>
        </Modal>

        <Typography variant='h4' sx={{ fontWeight: 'bold', color: 'black' }}>
          Feeds
        </Typography>
        <Stack direction={'row'} sx={{ marginTop: '25px' }} spacing={2}>
          <Avatar
            src='https://images.pexels.com/photos/928966/pexels-photo-928966.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            sx={{ width: 50, height: 50 }}
          ></Avatar>
          <TextField
            size='small'
            variant='outlined'
            placeholder='What’s on your mind?'
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
          {postsData.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </Box>
      </Box>
    </PostLayout>
  )
}
