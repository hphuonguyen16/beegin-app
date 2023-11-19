'use client'
import React, { useEffect, useState } from 'react'
import { Grid, Typography, Box, Stack, CircularProgress } from '@mui/material'

import TrendingCard from '@/components/TrendingList/TrendingCard'
import SuggestFollow from '@/components/SuggestFollow/SuggestFollow'
import TrendingList from '@/components/TrendingList/TrendingList'
import PostLayout from '@/layouts/PostLayout'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import UrlConfig from '@/config/urlConfig'
import { TrendingHashtag } from '@/types/trendingHashtag'

export default function Page() {
  const [loading, setLoading] = useState<boolean>(true)
  const [trendingHashtags, setTrendingHashtags] = useState<TrendingHashtag[]>([])
  const axios = useAxiosPrivate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axios.get(UrlConfig.trending.getTrendingHashtags)
        setTrendingHashtags(response.data.data)
        setLoading(false)
      } catch (error) {}
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <PostLayout>
      <Stack>
        {loading ? (
          <CircularProgress color='primary' sx={{ alignSelf: 'center' }} />
        ) : (
          <TrendingList trendingHashtags={trendingHashtags} />
        )}
      </Stack>
    </PostLayout>
  )
}
