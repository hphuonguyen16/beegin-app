import * as React from 'react'
import { useState, useEffect } from 'react'
import PostCard from '@/components/Posts/PostCard'
import { Post } from '@/types/post'
import { Box } from '@mui/material'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import UrlConfig from '@/config/urlConfig'
import { useSearchParams } from 'next/navigation'

interface PostListProps {
  f: string
}
function PostList({ f }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const axios = useAxiosPrivate()
  const searchParams = useSearchParams()
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (searchParams.get('q') !== null) {
          console.log('-------------------------------', searchParams.get('q'), f)
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
        }
      } catch (error) {}
    }
    fetchPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [1])
  return <Box sx={{ marginTop: '50px' }}>{posts?.map((post, index) => <PostCard key={index} post={post} />)}</Box>
}

export default PostList
