'use client'
import { Avatar, Box, Stack, Typography, Button, Modal } from '@mui/material'
import Image from 'next/image'
import { styled } from '@mui/material/styles'
import React, { useEffect } from 'react'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import ShareIcon from '@mui/icons-material/Share'
import useResponsive from '@/hooks/useResponsive'
import UrlConfig from '@/config/urlConfig'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { Post } from '@/types/post'
import { timeSince } from '@/utils/changeDate'
import PostDetail from './PostDetail'
import HashtagWrapper from '@/components/common/HashtagWrapper'
import { useRouter } from 'next/navigation'
import { usePosts } from '@/context/PostContext'
import CreatePost from './CreatePost'
import ReplyPostCard from './ReplyPostCard'

const ImageContainerStyled = styled('div')<{ number: number }>((props) => ({
  display: props.number === 0 ? 'none' : 'grid',
  gridGap: '5px',
  width: '100%',
  height: 'auto',
  cursor: 'pointer',
  gridTemplateColumns: props.number === 1 ? 'minmax(100%,1fr)' : 'repeat(2, 1fr)',
  gridTemplateRows: props.number === 1 ? 'repeat(1,1fr)' : props.number === 2 ? 'repeat(1, 390px)' : 'repeat(2, 300px)',
  '& img': {
    borderRadius: '12px',
    objectFit: 'cover',
    width: '100%',
    height: '100%'
  },
  '& .image-1': {
    gridArea: '1 / 1 / 2 / 2',
    maxHeight: '720px'
  },
  '& .image-2': {
    gridArea: props.number === 3 ? '2 / 1 / 3 / 2' : '1 / 2 / 2 / 3'
  },
  '& .image-3': {
    gridArea: props.number === 4 ? '2 / 1 / 3 / 2' : '1 / 2 / 3 / 3'
  },
  '& .image-4': {
    gridArea: '2 / 2 / 3 / 3'
  },
  '@media only screen and (max-width: 600px)': {
    gridGap: '2px',
    gridTemplateRows:
      props.number === 1 ? 'repeat(1,1fr)' : props.number === 2 ? 'repeat(1,170px)' : 'repeat(2, 100px)',
    '& img': {
      borderRadius: '8px',
      objectFit: 'cover'
    }
  }
}))

interface PostCardProps {
  post: Post
  isRepost?: boolean
  postParent?: Post
}

const PostCard = ({ post, isRepost, postParent }: PostCardProps) => {
  const [newPost, setNewPost] = React.useState<Post | null>(null)
  const router = useRouter()
  const axiosPrivate = useAxiosPrivate()
  const isMobile = useResponsive('down', 'sm')
  const [open, setOpen] = React.useState(false)
  const [repostOpen, setRepostOpen] = React.useState(false)
  const [like, setLike] = React.useState<boolean>(post.isLiked ? true : false)

  const handleLike = async () => {
    try {
      if (!like) {
        setLike(true)
        post.isLiked = true
        post.numLikes++
        await axiosPrivate.post(UrlConfig.posts.likePost(post._id))
      } else {
        setLike(false)
        post.isLiked = false
        post.numLikes--
        await axiosPrivate.delete(UrlConfig.posts.unlikePost(post._id))
      }
    } catch (err) {}
  }

  const openPostDetail = () => {
    setOpen(true)
  }
  const closePostDetail = () => {
    setOpen(false)
  }
  const redirectToProfile = async () => {
    try {
      const response = await axiosPrivate.get(UrlConfig.me.checkId(post.user._id))
      if (response.data.data) {
        router.push(`/profile`)
      } else {
        router.push(`/profile/${post.user._id}`)
      }
    } catch (error) {}
  }
  return (
    <>
      <Modal open={repostOpen} onClose={() => setRepostOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            //   width: isMobile ? '80vw' : width ? width : '100vw',
            width: isMobile ? '80vw' : '40vw',
            height: isMobile ? '80vh' : '80vh',
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 2,
            padding: isMobile ? 3 : '20px'
          }}
        >
          <CreatePost
            open={repostOpen}
            setOpen={setRepostOpen}
            newPost={newPost}
            setNewPost={setNewPost}
            repost={postParent ? postParent : post}
          />
        </Box>
      </Modal>
      <PostDetail key={post._id} post={post} open={open} handleClose={closePostDetail} handleLike={handleLike} />
      <Box
        sx={{
          ...(isRepost && {
            border: '1px solid #cdc6c6',
            paddingTop: '10px',
            paddingLeft: '10px',
            borderRadius: '12px',
            overflowX: 'hidden',
            paddingBottom: '15px'
          })
        }}
      >
        <Stack
          direction={'row'}
          gap={isMobile ? 1 : 3}
          sx={{
            width: '105%',
            ...(isRepost && {
              width: '117%'
            })
          }}
        >
          <Avatar
            sx={{ width: isMobile ? '45px' : '60px', height: isMobile ? '45px' : '60px' }}
            src={post.user?.profile?.avatar}
          ></Avatar>
          <Stack
            sx={{
              minWidth: !isMobile ? '100%' : '85%',
              ...(isRepost && {
                paddingRight: '48px'
              })
            }}
          >
            <Stack
              direction={'row'}
              sx={{ alignItems: 'center', marginTop: '3px', cursor: 'pointer' }}
              onClick={() => redirectToProfile()}
            >
              <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                {post.user?.profile?.firstname + ' ' + post.user?.profile?.lastname}
              </Typography>
              <Typography
                sx={{
                  color: 'rgba(0, 0, 0, 0.50)',
                  fontSize: isMobile ? '10px' : '14px',
                  fontWeight: 400,
                  marginLeft: '7px'
                }}
              >
                {post.user?.profile?.slug}
              </Typography>
              <Box
                sx={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  marginLeft: '15px',
                  backgroundColor: 'rgba(0, 0, 0, 0.50)'
                }}
              ></Box>
              <Typography
                sx={{
                  color: 'rgba(0, 0, 0, 0.50)',
                  fontSize: isMobile ? '13px' : '13px',
                  fontWeight: 400,
                  wordWrap: 'break-word',
                  marginLeft: '15px'
                }}
              >
                {timeSince(new Date(post.createdAt))}
              </Typography>
            </Stack>
            <Box
              sx={{
                width: '70%',
                minWidth: !isMobile ? '72%' : '100%'
              }}
            >
              <Box
                sx={{
                  margin: isMobile ? '5px 0' : '10px 0',
                  fontSize: isMobile ? '13px' : '18px',
                  overflow: 'hidden',
                  maxHeight: '80px', // Set the maximum height for the text container
                  whiteSpace: 'pre-line', // Preserve line breaks within the text
                  textOverflow: 'ellipsis'
                }}
              >
                {post.content && <HashtagWrapper text={post.content} length={200} />}
              </Box>
              <ImageContainerStyled
                number={post.images ? post.images.length : 0}
                onClick={() => {
                  openPostDetail()
                }}
              >
                {post.images?.map((src, index) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className={`image-${index + 1}`} src={src} key={index} alt='image' loading='lazy' />
                ))}
              </ImageContainerStyled>
              {post?.images?.length !== 0 && postParent && <ReplyPostCard post={postParent as Post} />}
              {post?.images?.length === 0 && postParent && <PostCard post={postParent as Post} isRepost={true} />}

              {!isRepost && (
                <Stack
                  direction={'row'}
                  sx={{
                    margin: isMobile ? '7px 0px 30px 0px' : '10px 10px 30px 10px',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Button
                    onClick={() => {
                      handleLike()
                    }}
                  >
                    {post.isLiked ? (
                      <FavoriteRoundedIcon color='secondary' />
                    ) : (
                      <FavoriteBorderRoundedIcon color='secondary' />
                    )}
                    <span style={{ marginLeft: isMobile ? '7px' : '10px', fontWeight: 500 }}>{post.numLikes}</span>
                  </Button>
                  <Button
                    onClick={() => {
                      openPostDetail()
                    }}
                  >
                    <ChatBubbleOutlineIcon color='secondary' />{' '}
                    <span style={{ marginLeft: isMobile ? '7px' : '10px', fontWeight: 500 }}>{post.numComments}</span>
                  </Button>
                  <Button
                    onClick={() => {
                      setRepostOpen(true)
                    }}
                  >
                    <ShareIcon color='secondary' />
                  </Button>
                </Stack>
              )}
            </Box>
          </Stack>
        </Stack>
      </Box>
    </>
  )
}

export default PostCard
