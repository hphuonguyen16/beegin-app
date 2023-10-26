import React from 'react'
import { Box, Typography, Stack, List, ListItemAvatar, ListItem, Avatar, ListItemText } from '@mui/material'
import useResponsive from '@/hooks/useResponsive'
import { Comment } from '@/types/comment'
import { timeSince } from '@/utils/changeDate'

interface CommentCardProps {
  comment: Comment
}

const CommentCard = ({ comment }: CommentCardProps) => {
  const isMobile = useResponsive('down', 'sm')
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <ListItem alignItems='flex-start'>
        <ListItemAvatar>
          <Avatar alt='Remy Sharp' src={comment.user.profile?.avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Stack direction={'row'} sx={{ alignItems: 'center', marginTop: '3px' }}>
              <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                {comment.user.profile?.firstname + ' ' + comment.user.profile?.lastname}
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
            </Stack>
          }
          secondary={
            <>
              <Box
                sx={{
                  margin: isMobile ? '5px 0' : '5px 0',
                  fontSize: isMobile ? '13px' : '14px',
                  width: '90%'
                }}
              >
                {comment.content}
              </Box>
              <Stack direction={'row'} gap={2}>
                <Typography
                  sx={{
                    color: 'rgba(0, 0, 0, 0.50)',
                    fontSize: isMobile ? '13px' : '13px',
                    fontWeight: 600,
                    wordWrap: 'break-word',
                    cursor: 'pointer'
                  }}
                >
                  {timeSince(new Date(comment.createdAt))}
                </Typography>
                <Typography
                  sx={{
                    color: 'rgba(0, 0, 0, 0.50)',
                    fontSize: isMobile ? '13px' : '13px',
                    fontWeight: 600,
                    wordWrap: 'break-word',
                    cursor: 'pointer'
                  }}
                >
                  {comment.numLikes} {comment.numLikes > 1 ? 'likes' : 'like'}
                </Typography>
                <Typography
                  sx={{
                    color: 'rgba(0, 0, 0, 0.50)',
                    fontSize: isMobile ? '13px' : '13px',
                    fontWeight: 600,
                    wordWrap: 'break-word',
                    cursor: 'pointer'
                  }}
                >
                  Reply
                </Typography>
              </Stack>
              <Box className='comments-child' sx={{ marginTop: '13px' }}>
                <Typography
                  sx={{
                    color: 'rgba(0, 0, 0, 0.50)',
                    fontSize: isMobile ? '13px' : '13px',
                    fontWeight: 600,
                    wordWrap: 'break-word',
                    cursor: 'pointer'
                  }}
                >
                  ____ View replies (2)
                </Typography>
              </Box>
            </>
          }
        />
      </ListItem>
    </List>
  )
}

export default CommentCard
