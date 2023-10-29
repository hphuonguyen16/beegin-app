'use client'
import React from 'react'
import useResponsive from '@/hooks/useResponsive'
import PostDetail from '@/components/Posts/PostDetail'

const images = [
  'https://images.pexels.com/photos/6422029/pexels-photo-6422029.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/6588618/pexels-photo-6588618.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/4480156/pexels-photo-4480156.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/5836625/pexels-photo-5836625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
]
const PostDetailPage = () => {
  const isMobile = useResponsive('down', 'sm')
  return <>{/* <PostDetail  /> */}</>
}

export default PostDetailPage
