import * as React from 'react'
import { useState, useEffect } from 'react'
import PostCard from '@/components/Posts/PostCard'
import { Post } from '@/types/post'
import { Box, CircularProgress, Stack } from '@mui/material'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import UrlConfig from '@/config/urlConfig'
import { useSearchParams } from 'next/navigation'
import NotFound from './NotFound'

interface PostListProps {
  f: string
}
function PostList({ f }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const axios = useAxiosPrivate()
  const searchParams = useSearchParams()
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (searchParams.get('q') !== null) {
          setLoading(true)
          let response
          const q = searchParams.get('q')
          if (!q || q === '') {
            return
          }
          const media = f
          if (q.startsWith('#')) {
            // search by hashtag
            response = await axios.get(UrlConfig.search.getPostsByHashtag(encodeURIComponent(q), media))
          } else {
            // search by post content
            // const media = searchParams.get('f')
            response = await axios.get(UrlConfig.search.searchPosts(encodeURIComponent(q), media))
          }
          setPosts(response?.data.data)
          setLoading(false)
        }
      } catch (error) {}
    }
    fetchPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])
  return (
    <Stack>
      {loading ? (
        <CircularProgress color='primary' sx={{ alignSelf: 'center' }} />
      ) : posts.length > 0 ? (
        posts.map((post, index) => <PostCard key={index} post={post} />)
      ) : (
        <NotFound q={searchParams.get('q')} />
      )}
    </Stack>
  )
}

export default PostList
