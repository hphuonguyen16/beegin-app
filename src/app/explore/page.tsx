'use client'
import React from 'react'
import { Grid, Typography, Box, Stack } from '@mui/material'

import TrendingCard from '@/components/TrendingList/TrendingCard'
import SuggestFollow from '@/components/SuggestFollow/SuggestFollow'
import TrendingList from '@/components/TrendingList/TrendingList'
import PostLayout from '@/layouts/PostLayout'

//temp data
const trendingItems = [
  {
    id: 1,
    des: 'Trending in VietNam',
    trend: '#Zalo',
    postCount: '20,2K'
  },
  {
    id: 2,
    des: 'Trending in Music',
    trend: '#Kpop',
    postCount: '12M'
  },
  {
    id: 1,
    des: 'Trending in VietNam',
    trend: '#Lisa',
    postCount: '14K'
  }
]
export default function Page() {
  return (
    <PostLayout>
      <TrendingList />
    </PostLayout>
  )
}
