'use client'
import React from 'react'
import { Stack } from '@mui/material'

import TrendingList from '@/components/TrendingList/TrendingList'
import PostLayout from '@/layouts/PostLayout'
import TrendingPostList from '@/components/TrendingList/TrendingPostList'
import withAuth from '@/authorization/withAuth'

function Page() {
  return (
    <PostLayout>
    <title>Explore | Beegin</title>
      <TrendingList count={5} isFull={false} />
      <TrendingPostList />
    </PostLayout>
  )
}

export default withAuth(Page)(['business', 'user'])
