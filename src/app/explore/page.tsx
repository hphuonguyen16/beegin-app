'use client'
import React from 'react'
import { Grid, Typography, Box, Stack } from '@mui/material'

import TrendingCard from '@/components/TrendingList/TrendingCard'
import SuggestFollow from '@/components/SuggestFollow/SuggestFollow'
import TrendingList from '@/components/TrendingList/TrendingList'
import PostLayout from '@/layouts/PostLayout'

export default function Page() {
  return (
    <PostLayout>
      <TrendingList />
    </PostLayout>
  )
}
