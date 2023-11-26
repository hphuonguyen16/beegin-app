import { useEffect, useState } from 'react'
import { Divider, Stack, CircularProgress } from '@mui/material'
import { TrendingCategoryPost } from '@/types/trendingCategoryPost'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import UrlConfig from '@/config/urlConfig'
import TrendingCard from './TrendingCard'
import TrendingPostCard from './TrendingPostCard'

export default function TrendingPostList() {
  const [loading, setLoading] = useState<boolean>(true)
  const [categoryPosts, setCategoryPost] = useState<TrendingCategoryPost[]>([])
  const axios = useAxiosPrivate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          UrlConfig.trending.getTrendingPosts(
            '65392b8f96ed3a51de029346,653a96bd9bbda0b0c41d4b67,65392b7896ed3a51de029340'
          )
        )
        setCategoryPost(response.data.data)
        setLoading(false)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [])
  return (
    <Stack>
      {loading ? (
        <CircularProgress color='primary' sx={{ alignSelf: 'center' }} />
      ) : (
        categoryPosts.map((item, index) => (
          <>
            <Divider sx={{}} />
            <TrendingPostCard key={index} category={item.category.name} posts={item.posts} />
          </>
        ))
      )}
    </Stack>
  )
}
