'use client'
import React, { useEffect, useState } from 'react'
import { Grid, Typography, Box, Stack } from '@mui/material'

import TrendingCard from '@/components/TrendingList/TrendingCard'
import SuggestFollow from '@/components/SuggestFollow/SuggestFollow'
import TrendingList from '@/components/TrendingList/TrendingList'
import PostLayout from '@/layouts/PostLayout'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import UrlConfig from '@/config/urlConfig'
import { TrendingHashtag } from '@/types/trendingHashtag'

export default function Page() {
  const [trendingHashtags, setTrendingHashtags] = useState<TrendingHashtag[]>([])
  const axios = useAxiosPrivate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(UrlConfig.trending.getTrendingHashtags)
        setTrendingHashtags(response.data.data)
      } catch (error) {}
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <PostLayout>
      <TrendingList trendingHashtags={trendingHashtags} />
    </PostLayout>
  )
}
