'use client'
import React from 'react'
import { Stack } from '@mui/material'

import TrendingList from '@/components/TrendingList/TrendingList'
import PostLayout from '@/layouts/PostLayout'
import TrendingPostList from '@/components/TrendingList/TrendingPostList'

export default function Page() {
  return (
    <PostLayout>
      <TrendingList count={5} isFull={false} />
      <TrendingPostList />
    </PostLayout>
  )
}
