'use client'
import React from 'react'
import useResponsive from '@/hooks/useResponsive'
import PostDetail from '@/components/Posts/PostDetail'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import UrlConfig from '@/config/urlConfig'
import { Post } from '@/types/post'
import { useRouter } from 'next/navigation'
const PostDetailPage = ({ params }: { params: { id: string } }) => {
  const isMobile = useResponsive('down', 'sm')
  const router = useRouter()
  const [open, setOpen] = React.useState(true)
  const [post, setPost] = React.useState<Post>()
  const [like, setLike] = React.useState<boolean>(false)
  const axiosPrivate = useAxiosPrivate()
  async function getPost() {
    const response = await axiosPrivate.get(`${UrlConfig.posts.getPosts}/${params.id}`)
    setPost(response.data.data)
  }
  console.log(post)

  const handleLike = async () => {
    try {
      if (!like) {
        setLike(true)
        setPost((prevPost) => {
          if (prevPost) {
            return { ...prevPost, isLiked: true, numLikes: prevPost.numLikes + 1 }
          }
          return prevPost // Handle the case when prevPost is undefined
        })
        await axiosPrivate.post(UrlConfig.posts.likePost(params.id))
      } else {
        setLike(false)
        setPost((prevPost) => {
          if (prevPost) {
            return { ...prevPost, isLiked: false, numLikes: prevPost.numLikes - 1 }
          }
          return prevPost // Handle the case when prevPost is undefined
        })
        await axiosPrivate.delete(UrlConfig.posts.unlikePost(params.id))
      }
    } catch (err) {}
  }

  const handleClose = () => {
    setOpen(false)
    router.back()
  }

  React.useEffect(() => {
    getPost()
  }, [])

  return post && <PostDetail open={true} post={post} handleLike={handleLike} handleClose={handleClose} />
}

export default PostDetailPage
