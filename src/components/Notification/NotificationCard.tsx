import React from 'react'
import { Avatar, Stack, Box, Typography } from '@mui/material'
import CustomAvatar from './CustomAvatar'
import { Notification } from '@/types/notification'
import { timeSince } from '@/utils/changeDate'

interface NotificationCardProps {
  notification: Notification
}

const NotificationCard = ({ notification }: NotificationCardProps) => {
  return (
    <Stack
      direction={'row'}
      sx={{ width: '100%', padding: '15px', marginBottom: '10px', backgroundColor: '#FBF8FC', borderRadius: '10px' }}
      gap={2}
    >
      <CustomAvatar image={notification?.image} type={notification?.type} read={notification.read} />
      <Box sx={{ width: '100%' }}>
        {/* <Stack direction={'row'} sx={{ alignItems: 'center', justifyContent: 'space-between', width: '100%' }}> */}
        <Typography
          sx={{
            fontSize: '14px',
            marginTop: '5px',
            color: '#979797',
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3, // Adjust the number of lines to display
            textOverflow: 'ellipsis' // Add ellipsis at the end
          }}
        >
          <span style={{ fontWeight: 'bold' }}>{notification?.actors}</span> {notification?.content}
        </Typography>
        <Typography
          sx={{
            color: '#B0B0B0',
            fontSize: '13px',
            fontWeight: 400,
            wordWrap: 'break-word'
          }}
        >
          {timeSince(new Date(notification?.updatedAt))}
        </Typography>
        {/* </Stack> */}
        {/* <Typography sx={{ fontSize: '14px', marginTop: '5px', color: '#979797' }}>liked your post</Typography> */}
      </Box>
    </Stack>
  )
}

export default NotificationCard
