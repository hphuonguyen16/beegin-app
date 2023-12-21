import React, { useEffect, useState } from 'react'
import useResponsive from '@/hooks/useResponsive'
import InfiniteScroll from 'react-infinite-scroll-component'
import Stack from '@mui/material/Stack'
import { Post } from '@/types/post'
import PostCard from '@/components/Posts/PostCard'
import { Modal, Box } from '@mui/material'
import PostSkeleton from '@/components/common/Skeleton/PostSkeleton'

interface PostsProfileProps {
  propFetchMoreData: (currentPage?: number) => Promise<any>
}

const PostsProfile: React.FC<PostsProfileProps> = ({propFetchMoreData }: PostsProfileProps) => {
  const [data, setData] = useState<Post[]>([])
  const [total, setTotal] = useState(undefined)
  const [currentPage, setCurrentPage] = useState(2)

  const fetchMoreData = async (page: number) => {
    const rslt = await propFetchMoreData(page)
    setData((prev) => [...prev, ...rslt.data])
    setCurrentPage((prev) => prev + 1)
  }

  useEffect(() => {
    if (total !== undefined) return
    const fetchData = async () => {
      const rslt = await propFetchMoreData()
      setData(rslt.data)
      setTotal(rslt.total)
    }
    fetchData()
  }, [total])

  return total !== undefined ? (
    <InfiniteScroll
      dataLength={data.length}
      next={() => {
        fetchMoreData(currentPage)
      }}
      hasMore={data.length < total}
      loader={<PostSkeleton />}
      scrollableTarget='postsProfile'
    >
      {data?.map((item, index) => <PostCard key={index} post={item} postParent={item?.parent} />)}
    </InfiniteScroll>
  ) : (
    <>
      <PostSkeleton />
      <PostSkeleton />
    </>
  )
}

export default PostsProfile
