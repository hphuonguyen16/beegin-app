'use client'
import React from 'react'
import useResponsive from '@/hooks/useResponsive'
import PostDetail from '@/components/Posts/PostDetail'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import UrlConfig from '@/config/urlConfig'
import { Post } from '@/types/post'
import { Comment } from '@/types/comment'
import { useRouter } from 'next/navigation'
import { usePosts } from '@/context/PostContext'
const PostDetailPage = ({ params }: { params: { id: string } }) => {
  const isMobile = useResponsive('down', 'sm')
  const { postsState, postsDispatch } = usePosts()
  const router = useRouter()
  const [open, setOpen] = React.useState(true)
  const axiosPrivate = useAxiosPrivate()
  async function getPost() {
    const response = await axiosPrivate.get(`${UrlConfig.posts.getPosts}/${params.id}`)
    const post = response.data.data as Post
    const commentResponse = await axiosPrivate.get(`${UrlConfig.posts.getComments(post._id)}?limit=10&page=1`)
    const comments = commentResponse.data.data as Comment[]
    postsDispatch({
      type: 'SELECT_POST',
      payload: { ...post, comments, totalComments: commentResponse.data.total }
    })
  }
  const handleLike = async () => {
    if (!postsState.selectedPost) return
    if (postsState.selectedPost?.isLiked) {
      postsDispatch({ type: 'SET_LIKED_POST', payload: { postId: params.id, isLiked: false } })
      await axiosPrivate.post(UrlConfig.posts.likePost(postsState.selectedPost._id))
    } else {
      postsDispatch({ type: 'SET_LIKED_POST', payload: { postId: params.id, isLiked: true } })
      await axiosPrivate.post(UrlConfig.posts.unlikePost(postsState.selectedPost._id))
    }
  }

  const handleClose = () => {
    setOpen(false)
    router.back()
  }

  React.useEffect(() => {
    getPost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    postsState.selectedPost && (
      <>
        <title>Post | Beegin</title>
        <PostDetail open={true} post={postsState.selectedPost} handleLike={handleLike} handleClose={handleClose} />
      </>
    )
  )
}

export default PostDetailPage
