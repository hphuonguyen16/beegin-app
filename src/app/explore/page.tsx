'use client'
import React from 'react'
import { Grid, Typography, Box, Stack } from '@mui/material'

import TrendingCard from '@/components/TrendingList/TrendingCard'
import SuggestFollow from '@/components/SuggestFollow/SuggestFollow'
import TrendingList from '@/components/TrendingList/TrendingList'
import PostContent from '@/components/FeedPost/PostContent'
import FeedPost from '@/components/FeedPost/FeedPost'

export default function Page() {
  return (
    <Box sx={{ display: 'flex', height: '100%', marginRight: '20px' }}>
      <Grid
        sx={{
          width: '60%',
          backgroundColor: '#d4f7ff',
          maxHeight: '100%',
          overflow: 'auto',
          padding: '20px',
          borderRadius: '10px',
          marginRight: '20px'
        }}
      >
        <TrendingList />
        <Stack>
          <FeedPost />
          <FeedPost />
          <FeedPost />
        </Stack>
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
