import React from 'react'
import { Avatar, Stack, Box, Typography } from '@mui/material'
import CustomAvatar from './CustomAvatar'

const NotificationCard = () => {
  return (
    <Stack
      direction={'row'}
      sx={{ width: '100%', padding: '15px', backgroundColor: '#FBF8FC', borderRadius: '10px' }}
      gap={2}
    >
      <CustomAvatar />
      <Box sx={{ width: '100%' }}>
        <Stack direction={'row'} sx={{ alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <Typography variant={'h5'} sx={{ fontWeight: 'bold', fontSize: '14px', color: 'black' }}>
            real_bear, real_bear
          </Typography>
          <Typography
            sx={{
              color: '#B0B0B0',
              fontSize: '13px',
              fontWeight: 400,
              wordWrap: 'break-word'
            }}
          >
            3 hours ago
          </Typography>
        </Stack>
        <Typography sx={{ fontSize: '14px', marginTop: '5px', color: '#979797' }}>liked your post</Typography>
      </Box>
    </Stack>
  )
}

export default NotificationCard
