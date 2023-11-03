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
import useResponsive from '@/hooks/useResponsive'
import CollectionsIcon from '@mui/icons-material/Collections'
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined'

const CreatePost = () => {
  const isMobile = useResponsive('down', 'sm')
  return (
    <div>
      <Stack direction={'row'} sx={{ alignItems: 'center' }} gap={2}>
        <Avatar
          alt='Remy Sharp'
          src='https://images.pexels.com/photos/6422029/pexels-photo-6422029.jpeg?auto=compress&cs=tinysrgb&w=1600'
          sx={{ width: 60, height: 60 }}
        />
        <Box>
          <Typography variant='h4' sx={{ fontWeight: 'bold' }}>
            {' '}
            Huy Bui
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
      <Box>
        <TextField
          id='outlined-multiline-static'
          multiline
          placeholder='What is on your mind?'
          sx={{
            width: '100%',
            marginTop: '20px',
            '& fieldset': { border: 'none' },
            '& .MuiInputBase-root': {
              maxHeight: '300px',
              overflow: 'auto'
            }
          }}
        />
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
            padding: '20px 10px'
          }}
        >
          <Stack direction={'row'} gap={2}>
            <Typography variant='h5' sx={{ fontWeight: 'bold', fontSize: '20px' }}>
              {' '}
              Add to your post
            </Typography>
          </Stack>
          <Stack direction={'row'} gap={2}>
            <IconButton>
              <CollectionsIcon color='secondary' fontSize='large' />
            </IconButton>
            <IconButton>
              <EmojiEmotionsOutlinedIcon color='secondary' fontSize='large' />
            </IconButton>
          </Stack>
        </Box>
        <Button variant='contained' sx={{ width: '100%', marginTop: '20px', padding: '12px 0' }}>
          Create Post
        </Button>
      </Box>
    </div>
  )
}

export default CreatePost
