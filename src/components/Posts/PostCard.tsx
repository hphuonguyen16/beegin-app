'use client'
import { Avatar, Box, Stack, Typography, Button } from '@mui/material'
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

const ImageContainerStyled = styled('div')<{ number: number }>((props) => ({
  display: props.number === 0 ? 'none' : 'grid',
  gridGap: '5px',
  width: '100%',
  height: 'auto',
  gridTemplateColumns: props.number === 1 ? 'minmax(100%,1fr)' : 'repeat(2, 1fr)',
  gridTemplateRows: props.number === 1 ? 'repeat(1,1fr)' : props.number === 2 ? 'repeat(1, 390px)' : 'repeat(2, 300px)',
  '& img': {
    borderRadius: '12px',
    objectFit: 'cover',
    width: '100%',
    height: '100%'
  },
  '& .image-1': {
    gridArea: '1 / 1 / 2 / 2'
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
      props.number === 1 ? 'repeat(1,1fr)' : props.number === 2 ? 'repeat(1,170px)' : 'repeat(2, 120px)',
    '& img': {
      borderRadius: '8px',
      objectFit: 'cover'
    }
  }
}))

interface PostCardProps {
  post: Post
}

const PostCard = ({ post }: PostCardProps) => {
  const [liked, setLiked] = React.useState(false)
  const axiosPrivate = useAxiosPrivate()
  const isMobile = useResponsive('down', 'sm')
  const [open, setOpen] = React.useState(false)
  const handleLike = async () => {
    try {
      if (!liked) {
        await axiosPrivate.post(UrlConfig.posts.likePost(post._id))
        setLiked(true)
        post.numLikes++
      } else {
        await axiosPrivate.delete(UrlConfig.posts.unlikePost(post._id))
        setLiked(false)
        post.numLikes--
      }
    } catch (err) {}
  }

  const openPostDetail = () => {
    setOpen(true)
  }
  const closePostDetail = () => {
    setOpen(false)
  }

  useEffect(() => {
    const checkLiked = async () => {
      try {
        const response = await axiosPrivate.get(UrlConfig.posts.checkLikePost(post._id))
        setLiked(response.data.data)
      } catch (err) {}
    }
    checkLiked()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box>
      <PostDetail
        key={post._id}
        post={post}
        open={open}
        liked={liked}
        setLiked={setLiked}
        handleClose={closePostDetail}
      />
      <Stack direction={'row'} gap={isMobile ? 1 : 3}>
        <Avatar
          sx={{ width: isMobile ? '45px' : '60px', height: isMobile ? '45px' : '60px' }}
          src={post.user.profile?.avatar}
        ></Avatar>
        <Stack sx={{ minWidth: '100%' }}>
          <Stack direction={'row'} sx={{ alignItems: 'center', marginTop: '3px' }}>
            <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ fontWeight: 'bold', fontSize: '16px' }}>
              {post.user.profile?.firstname + ' ' + post.user.profile?.lastname}
            </Typography>
            {/* <Typography
              sx={{
                color: 'rgba(0, 0, 0, 0.50)',
                fontSize: isMobile ? '10px' : '12px',
                fontWeight: 400,
                marginLeft: '7px'
              }}
            >
              @real_bear
            </Typography> */}
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
          <Box sx={{ width: '70%', minWidth: !isMobile ? '72%' : '100%' }}>
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
              {post.content}
            </Box>
            <ImageContainerStyled number={post.images ? post.images.length : 0}>
              {post.images?.map((src, index) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img className={`image-${index + 1}`} src={src} key={index} alt='image' loading='lazy' />
              ))}
            </ImageContainerStyled>
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
                {liked ? <FavoriteRoundedIcon color='secondary' /> : <FavoriteBorderRoundedIcon color='secondary' />}
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
              <Button>
                <ShareIcon color='secondary' />
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Box>
  )
}

export default PostCard
