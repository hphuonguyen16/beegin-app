'use client'
import React from 'react'
import { Grid, Typography, Box, Stack } from '@mui/material'

import TrendingCard from '@/components/TrendingList/TrendingCard'
import SuggestFollow from '@/components/SuggestFollow/SuggestFollow'
import TrendingList from '@/components/TrendingList/TrendingList'

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
    <Box sx={{ display: 'flex', height: '100%', marginRight: '20px' }}>
      <Grid
        sx={{
          width: '60%',
          backgroundColor: '#d4f7ff',
          padding: '20px',
          borderRadius: '10px',
          marginRight: '20px'
        }}
      >
        <TrendingList />
      </Grid>
      <Grid
        sx={{
          width: '40%',
          padding: '0 20px',
          borderRadius: '10px'
        }}
      >
        <SuggestFollow />
      </Grid>
    </Box>
  )
}
