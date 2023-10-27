import React from 'react'
import { Box, Typography, Stack, List, ListItemAvatar, ListItem, Avatar, ListItemText, IconButton } from '@mui/material'
import useResponsive from '@/hooks/useResponsive'
import { Comment } from '@/types/comment'
import { timeSince } from '@/utils/changeDate'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import UrlConfig from '@/config/urlConfig'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'

interface CommentCardProps {
  comment: Comment
}

const CommentCard = ({ comment }: CommentCardProps) => {
  const isMobile = useResponsive('down', 'sm')
  const [liked, setLiked] = React.useState(false)
  const axiosPrivate = useAxiosPrivate()
  const handleLike = async () => {
    try {
      if (!liked) {
        await axiosPrivate.post(UrlConfig.comments.likeComment(comment._id))
        setLiked(true)
        comment.numLikes++
      } else {
        await axiosPrivate.delete(UrlConfig.comments.unlikeComment(comment._id))
        setLiked(false)
        comment.numLikes--
      }
    } catch (err) {}
  }

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
              <Stack direction={'row'} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
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
                </Box>
                <IconButton
                  onClick={() => {
                    handleLike()
                  }}
                >
                  {liked ? (
                    <FavoriteRoundedIcon color='secondary' fontSize='small' />
                  ) : (
                    <FavoriteBorderRoundedIcon color='secondary' fontSize='small' />
                  )}
                </IconButton>
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
