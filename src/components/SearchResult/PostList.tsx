import * as React from 'react'
import { useState, useEffect } from 'react'
import PostCard from '@/components/Posts/PostCard'
import { Post } from '@/types/post'
import { Box } from '@mui/material'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import UrlConfig from '@/config/urlConfig'
import { ParsedUrlQuery } from 'querystring'
import { useSearchParams } from 'next/navigation'
export default function PostList(query: ParsedUrlQuery) {
  const [posts, setPosts] = useState<Post[]>([])
  const axios = useAxiosPrivate()
  const searchParams = useSearchParams()
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (searchParams.get('hashtag') !== null) {
          const response = await axios.get(UrlConfig.search.getPostsByHashtag(searchParams.get('hashtag')))
          setPosts(response.data.data)
        }
      } catch (error) {}
    }
    fetchPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Box sx={{ marginTop: '50px' }}>
      {posts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
    </Box>
  )
}
