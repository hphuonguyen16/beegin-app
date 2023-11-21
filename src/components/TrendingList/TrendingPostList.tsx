import { useEffect, useState } from 'react'
import { Stack } from '@mui/material'
import { TrendingCategoryPost } from '@/types/trendingCategoryPost'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import UrlConfig from '@/config/urlConfig'
import TrendingCard from './TrendingCard'
import TrendingPostCard from './TrendingPostCard'

export default function TrendingPostList() {
  const [categoryPosts, setCategoryPost] = useState<TrendingCategoryPost>()
  const axios = useAxiosPrivate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(UrlConfig.trending.getTrendingPosts('65392b8f96ed3a51de029346'))
        setCategoryPost(response.data)
      } catch (err) {}
    }

    fetchData()
  }, [])
  return (
    <Stack>
      <TrendingPostCard category={categoryPosts?.category.name ?? ''} posts={categoryPosts?.posts ?? []} />
    </Stack>
  )
}
