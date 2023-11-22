'use client'
import React from 'react'

import TrendingList from '@/components/TrendingList/TrendingList'
import PostLayout from '@/layouts/PostLayout'

export default function Page() {
  return (
    <PostLayout>
      <TrendingList count={30} isFull={true} />
    </PostLayout>
  )
}
