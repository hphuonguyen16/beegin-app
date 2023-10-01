import { Box, CardMedia, Grid, IconButton } from '@mui/material'
import React from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import { AspectRatio } from '@mui/icons-material'

const images = [
  { type: 'img', link: 'https://pbs.twimg.com/profile_images/1699898466959347712/WS3HVOtW_400x400.jpg' },
  { type: 'img', link: 'https://pbs.twimg.com/profile_images/994592419705274369/RLplF55e_400x400.jpg' },
  { type: 'img', link: 'https://pbs.twimg.com/media/F7TY3fSaMAAoP8r?format=jpg&name=4096x4096' },
  { type: 'img', link: 'https://pbs.twimg.com/media/F61VLM_aEAAzXDd?format=png&name=small' },
  { type: 'img', link: 'https://img.vn/uploads/thuvien/singa-png-20220719150401Tdj1WAJFQr.png' }
]
export default function PostMedia() {
  const [imageIndex, setImageIndex] = React.useState(0)
  const { length } = images

  const handleBackClick = () => {
    setImageIndex((prev) => (prev - 1 > 0 ? prev - 1 : 0))
  }

  const handleNextClick = () => {
    setImageIndex((prev) => (prev + 1 < length - 1 ? prev + 1 : length - 1))
  }

  return (
    <Grid sx={{ maxHeight: '100%', maxWidth: '100%', position: 'relative', margin: '20px' }}>
      {imageIndex > 0 && (
        <IconButton
          sx={{ position: 'absolute', top: '50%', left: '0', transform: 'translateY(-50%)' }}
          onClick={handleBackClick}
        >
          <NavigateBeforeIcon sx={{ color: 'white' }} fontSize='large' />
        </IconButton>
      )}

      <CardMedia component='img' src={images[imageIndex].link} sx={{ borderRadius: '10px' }} />

      {imageIndex < length - 1 && (
        <IconButton
          sx={{ position: 'absolute', top: '50%', right: '0', transform: 'translateY(-50%)' }}
          onClick={handleNextClick}
        >
          <NavigateNextIcon sx={{ color: 'white ' }} fontSize='large' />
        </IconButton>
      )}
    </Grid>
  )
}
