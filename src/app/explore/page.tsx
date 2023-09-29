'use client'
import React from 'react'
import { Grid, Paper, Typography, Box, Stack, styled } from '@mui/material'

import TrendingCard from '@/components/TrendingCard/TrendingCard'

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
function Page() {
  return (
    <Grid
      sx={{
        maxHeight: '90%',
        overflow: 'auto',
        width: '60%',
        backgroundColor: '#d9f3ff',
        padding: '20px',
        borderRadius: '10px'
      }}
    >
      <Typography variant='h3' sx={{ paddingBottom: '10px' }}>
        Trendings for you
      </Typography>
      <Stack spacing={1}>
        {trendingItems.map((item) => (
          <TrendingCard key={item.id} item={item} />
        ))}
        <TrendingCard item={trendingItems[0]} />
        <TrendingCard item={trendingItems[0]} />
        <TrendingCard item={trendingItems[0]} />
        <TrendingCard item={trendingItems[0]} />
        <TrendingCard item={trendingItems[0]} />
        <TrendingCard item={trendingItems[0]} />
      </Stack>
      <Typography
        color='primary'
        sx={{
          fontWeight: 'bold',
          verticalAlign: 'middle',
          fontSize: '18px',
          marginTop: '10px',
          cursor: 'pointer'
        }}
      >
        Show more
      </Typography>
    </Grid>
  )
}

export default Page
