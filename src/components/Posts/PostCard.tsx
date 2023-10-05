'use client'
import { Avatar, Box, Stack, Typography, Button } from '@mui/material'
import Image from 'next/image'
import { styled } from '@mui/material/styles'
import React from 'react'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import ShareIcon from '@mui/icons-material/Share'
import { ImageAspectRatioRounded } from '@mui/icons-material'

const ImageContainerStyled = styled('div')<{ number: number }>((props) => ({
  display: 'grid',
  gridGap: '5px',
  width: '100%',
  height: 'auto',
  gridTemplateColumns: props.number === 1 ? 'minmax(100%,1fr)' : 'repeat(2, 1fr)',
  gridTemplateRows: props.number === 1 || props.number === 2 ? 'minmax(1fr, 100%)' : 'repeat(2, 320px)',
  '& img': {
    borderRadius: '12px',
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
  }
}))

const images = [
  'https://images.pexels.com/photos/6422029/pexels-photo-6422029.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/6588618/pexels-photo-6588618.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/4480156/pexels-photo-4480156.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/5836625/pexels-photo-5836625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
]

const PostCard = () => {
  const [liked, setLiked] = React.useState(false)
  const handleLike = () => {
    setLiked(!liked)
  }
  return (
    <Box>
      <Stack direction={'row'} gap={3}>
        <Avatar
          sx={{ width: '60px', height: '60px' }}
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwXgjGKE09VrSaXebUnIUdPwDUvD003fJ-6zfbJIlPE4-it8WwGpaAzWTdUZOz1iiMT4g&usqp=CAU'
        ></Avatar>
        <Stack>
          <Stack direction={'row'} sx={{ alignItems: 'center' }}>
            <Typography variant='h4' sx={{ fontWeight: 'bold', wordWrap: 'break-word' }}>
              Bear
            </Typography>
            <Typography
              sx={{
                color: 'rgba(0, 0, 0, 0.50)',
                fontSize: '12px',
                fontWeight: 400,
                wordWrap: 'break-word',
                marginLeft: '7px'
              }}
            >
              @real_bear
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
                fontSize: '15px',
                fontWeight: 400,
                wordWrap: 'break-word',
                marginLeft: '15px'
              }}
            >
              5 mins ago
            </Typography>
          </Stack>
          <Box sx={{ width: '50%', minWidth: '700px' }}>
            <Box sx={{ margin: '10px 0' }}>yummy #hashtag</Box>
            <ImageContainerStyled number={images.length}>
              {images.map((src, index) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img className={`image-${index + 1}`} src={src} key={index} alt='image' loading='lazy' />
              ))}
            </ImageContainerStyled>
            <Stack
              direction={'row'}
              sx={{ margin: '10px 10px 30px 10px', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Button
                onClick={() => {
                  handleLike()
                }}
              >
                {liked ? <FavoriteRoundedIcon color='secondary' /> : <FavoriteBorderRoundedIcon color='secondary' />}
                <span style={{ marginLeft: '10px', fontWeight: 400 }}>200.8k</span>
              </Button>
              <Button>
                <ChatBubbleOutlineIcon color='secondary' />{' '}
                <span style={{ marginLeft: '10px', fontWeight: 400 }}>1.6k</span>
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
