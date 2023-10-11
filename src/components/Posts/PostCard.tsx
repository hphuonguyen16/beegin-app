'use client'
import { Avatar, Box, Stack, Typography, Button } from '@mui/material'
import Image from 'next/image'
import { styled } from '@mui/material/styles'
import React from 'react'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import ShareIcon from '@mui/icons-material/Share'
import useResponsive from '@/hooks/useResponsive'

const ImageContainerStyled = styled('div')<{ number: number }>((props) => ({
  display: 'grid',
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

const images = [
  // 'https://images.pexels.com/photos/6422029/pexels-photo-6422029.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/6588618/pexels-photo-6588618.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/4480156/pexels-photo-4480156.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/5836625/pexels-photo-5836625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
]

const PostCard = () => {
  const [liked, setLiked] = React.useState(false)
  const isMobile = useResponsive('down', 'sm')
  const handleLike = () => {
    setLiked(!liked)
  }
  return (
    <Box>
      <Stack direction={'row'} gap={isMobile ? 1 : 3}>
        <Avatar
          sx={{ width: isMobile ? '45px' : '60px', height: isMobile ? '45px' : '60px' }}
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwXgjGKE09VrSaXebUnIUdPwDUvD003fJ-6zfbJIlPE4-it8WwGpaAzWTdUZOz1iiMT4g&usqp=CAU'
        ></Avatar>
        <Stack>
          <Stack direction={'row'} sx={{ alignItems: 'center', marginTop: '3px' }}>
            <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ fontWeight: 'bold' }}>
              Bear
            </Typography>
            <Typography
              sx={{
                color: 'rgba(0, 0, 0, 0.50)',
                fontSize: isMobile ? '10px' : '12px',
                fontWeight: 400,
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
                fontSize: isMobile ? '13px' : '15px',
                fontWeight: 400,
                wordWrap: 'break-word',
                marginLeft: '15px'
              }}
            >
              5 mins ago
            </Typography>
          </Stack>
          <Box sx={{ width: '50%', minWidth: !isMobile ? '700px' : '100%' }}>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non ante nec nunc hendrerit laoreet.
            </Box>
            <ImageContainerStyled number={images.length}>
              {images.map((src, index) => (
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
                <span style={{ marginLeft: isMobile ? '7px' : '10px', fontWeight: 500 }}>200.8k</span>
              </Button>
              <Button>
                <ChatBubbleOutlineIcon color='secondary' />{' '}
                <span style={{ marginLeft: isMobile ? '7px' : '10px', fontWeight: 500 }}>1.6k</span>
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
