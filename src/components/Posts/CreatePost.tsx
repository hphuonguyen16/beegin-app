import React from 'react'
import {
  Box,
  Typography,
  Stack,
  List,
  ListItemAvatar,
  ListItem,
  Avatar,
  ListItemText,
  TextField,
  IconButton,
  Button
} from '@mui/material'
import CollectionsIcon from '@mui/icons-material/Collections'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import urlConfig from '@/config/urlConfig'
import useResponsive from '@/hooks/useResponsive'
import { styled } from '@mui/material/styles'
import useSnackbar from '@/context/snackbarContext'
import Snackbar from '@/components/common/Snackbar'
import { useAuth } from '@/context/AuthContext'

interface NewPostProps {
  content: string | ''
  images: string[] | undefined
  categories: string[] | undefined
}

const ImageContainerStyled = styled('div')<{ number: number }>((props) => ({
  display: props.number === 0 ? 'none' : 'grid',
  gridGap: '5px',
  width: '100%',
  height: 'auto',
  padding: '10px',
  gridTemplateColumns: props.number === 1 ? 'minmax(100%,1fr)' : 'repeat(2, 1fr)',
  gridTemplateRows: props.number === 1 ? 'repeat(1,1fr)' : props.number === 2 ? 'repeat(1, 340px)' : 'repeat(2, 170px)',
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

async function handleFileUpload(files: any) {
  const uploadPromises = files.map((file: any) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`)

    return fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.secure_url !== '') {
          const uploadedFileUrl = data.secure_url
          return uploadedFileUrl
        }
      })
      .catch((err) => console.error(err))
  })
  const uploadedUrls = await Promise.all(uploadPromises)

  // uploadedUrls will be an array of uploaded file URLs
  console.log(uploadedUrls)

  return uploadedUrls
}

const CreatePost = () => {
  const isMobile = useResponsive('down', 'sm')
  const { user } = useAuth()
  const [newPost, setNewPost] = React.useState<NewPostProps>()
  const [content, setContent] = React.useState<string | ''>('')
  const axiosPrivate = useAxiosPrivate()
  const [images, setImages] = React.useState<any>([])
  const { setSnack } = useSnackbar()
  console.log(user)
  const handleImageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0 && images.length < 4) {
      const newImages = [...images]
      for (let i = 0; i < e.target.files.length; i++) {
        newImages.push(e.target.files[i])
      }
      setImages(newImages)
    }
  }
  const handleDeleteImages = () => {
    setImages([])
  }
  const createPost = async () => {
    if (!content && images.length === 0) {
      setSnack({
        open: true,
        message: 'Write something or add images to your post!',
        type: 'error'
      })
      return
    }
    const uploadedUrls = await handleFileUpload(images)
    const response = await axiosPrivate.post(urlConfig.posts.createPost, {
      content: content,
      images: uploadedUrls,
      categories: ['65392b6896ed3a51de02933a']
    })
  }
  return (
    <div>
      <Snackbar />
      <Stack direction={'row'} sx={{ alignItems: 'center' }} gap={2}>
        <Avatar alt='Remy Sharp' src={user?.profile?.avatar} sx={{ width: 60, height: 60 }} />
        <Box>
          <Typography variant='h4' sx={{ fontWeight: 'bold' }}>
            {' '}
            {user?.profile?.firstname + ' ' + user?.profile?.lastname}
          </Typography>
          <Typography
            sx={{
              color: 'rgba(0, 0, 0, 0.50)',
              fontSize: isMobile ? '10px' : '14px',
              fontWeight: 400
            }}
          >
            @real_bear
          </Typography>
        </Box>
      </Stack>
      <Box sx={{ justifyContent: 'space-between', maxHeight: '450px', height: '60%', overflow: 'auto' }}>
        <Box>
          <TextField
            id='outlined-multiline-static'
            multiline
            placeholder="What's on your mind?"
            onChange={(e) => setContent(e.target.value)}
            sx={{
              width: '100%',
              marginTop: '20px',
              marginBottom: '10px',
              '& fieldset': { border: 'none' },
              '& .MuiInputBase-root': {
                overflow: 'auto'
              }
            }}
          />
          <Box sx={{ position: 'relative' }}>
            <ImageContainerStyled number={images ? images.length : 0}>
              {images?.map((item: any, index: number) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className={`image-${index + 1}`}
                  src={URL.createObjectURL(item)}
                  key={index}
                  alt='image'
                  loading='lazy'
                />
              ))}
              <IconButton
                sx={{ position: 'absolute', top: '6%', right: '5%', backgroundColor: 'white !important' }}
                onClick={() => handleDeleteImages()}
              >
                <CloseRoundedIcon sx={{ color: 'black', fontSize: '25px' }} />
              </IconButton>
            </ImageContainerStyled>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          position: 'fixed',
          bottom: '0px', // Adjust the position as needed
          zIndex: 999, // Adjust the z-index as needed
          backgroundColor: 'white',
          height: '190px',
          width: '95%'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid rgba(0, 0, 0, 0.12)',
            borderRadius: '10px',
            padding: '13px 10px'
          }}
        >
          <Typography variant='h5' sx={{ fontWeight: 'bold', fontSize: '20px' }}>
            {' '}
            Add to your post
          </Typography>
          <Stack direction={'row'} gap={2}>
            <input
              accept='image/*'
              type='file'
              id='icon-button-file'
              multiple
              onChange={handleImageChange}
              style={{ visibility: 'hidden' }}
            />
            <label htmlFor='icon-button-file'>
              <IconButton component='span'>
                <CollectionsIcon color='secondary' fontSize='large' />
              </IconButton>
            </label>

            <IconButton>
              <EmojiEmotionsOutlinedIcon color='secondary' fontSize='large' />
            </IconButton>
          </Stack>
        </Box>
        <Button
          variant='contained'
          sx={{ width: '100%', marginTop: '20px', padding: '12px 0' }}
          onClick={() => createPost()}
        >
          Create Post
        </Button>
      </Box>
    </div>
  )
}

export default CreatePost