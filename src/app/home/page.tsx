'use client'
import PostCard from '@/components/Posts/PostCard'
import { Box, Typography, Stack, TextField, Avatar, Modal } from '@mui/material'
import PostLayout from '@/layouts/PostLayout'
import useResponsive from '@/hooks/useResponsive'
import { Post } from '@/types/post'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { useState } from 'react'
import urlConfig from '@/config/urlConfig'
import CreatePost from '@/components/Posts/CreatePost'
import { useAuth } from '@/context/AuthContext'
import { usePathname, useRouter } from 'next/navigation'
import { useInfiniteQuery } from '@tanstack/react-query'
import InfiniteScroll from 'react-infinite-scroll-component'
import PostSkeleton from '@/components/common/Skeleton/PostSkeleton'

export default function Home() {
  const isMobile = useResponsive('down', 'sm')
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [newPost, setNewPost] = useState<Post | null>(null)
  const axios = useAxiosPrivate()
  const { user } = useAuth()
  async function fetchPosts({ pageParam = 1 }) {
    try {
      // Fetch posts
      const response = await axios.get(`${urlConfig.posts.getPosts}?limit=5&page=${pageParam}`)
      let posts = response.data.data.data
      let { total } = response.data

      posts = posts.map(async (post: Post) => {
        const likeResponse = await axios.get(urlConfig.posts.checkLikePost(post._id))
        const commentResponse = await axios.get(`${urlConfig.posts.getComments(post._id)}?limit=10`)
        const comments = commentResponse.data.data as Comment[]
        const isLiked = likeResponse.data.data
        return {
          ...post,
          isLiked,
          comments
        }
      })
      posts = await Promise.all(posts)
      return {
        posts,
        total,
        prevPage: pageParam
      }
    } catch (error) {
      // Handle errors if necessary
    }
  }
  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ['postsData'],
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.prevPage === undefined) return undefined
      if (lastPage?.prevPage * 5 > lastPage?.total) {
        return undefined
      }
      return lastPage?.prevPage + 1
    },
    staleTime: 1000 * 60 * 10 // 10 minutes
  })
  const postsData = data?.pages?.reduce<Post[]>((acc, page) => {
    return [...acc, ...page?.posts]
  }, [])

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
        <Box sx={{ overflowX: 'hidden', overflowY: 'hidden' }}></Box>

        <Box sx={{ overflowX: 'hidden', overflowY: 'hidden' }}>
          <Typography variant='h4' sx={{ fontWeight: 'bold', color: 'black' }} onClick={() => fetchNextPage()}>
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
          <InfiniteScroll
            dataLength={postsData ? postsData.length : 0}
            next={() => {
              fetchNextPage()
            }}
            hasMore={true}
            loader={<></>}
            endMessage={<div>No more posts</div>}
            scrollableTarget='scrollableDiv'
          >
            <Box sx={{ marginTop: '50px', overflowX: 'hidden' }}>
              {postsData?.map((post, index) => {
                if (post && post.parent) {
                  return <PostCard key={post._id || index} post={post} postParent={post.parent} />
                } else if (post) {
                  return <PostCard key={post._id || index} post={post} />
                }
              })}
            </Box>
          </InfiniteScroll>
          {isFetching && (
            <Stack direction='column' spacing={3}>
              <PostSkeleton />
              <PostSkeleton />
            </Stack>
          )}
        </Box>
      </PostLayout>
    </>
  )
}
