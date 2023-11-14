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
  replyComment: (comment: Comment) => void
  getReplyComments: (postId: string, commentId: string) => void
}

const CommentCard = ({ comment, replyComment, getReplyComments }: CommentCardProps) => {
  const isMobile = useResponsive('down', 'sm')
  const [openReply, setOpenReply] = React.useState(false)
  const [commentData, setCommentData] = React.useState<Comment>(comment)
  const [liked, setLiked] = React.useState(false)
  const axiosPrivate = useAxiosPrivate()
  const handleLike = async () => {
    try {
      if (!liked) {
        setLiked(true)
        comment.numLikes++
        await axiosPrivate.post(UrlConfig.comments.likeComment(comment._id))
      } else {
        setLiked(false)
        comment.numLikes--
        await axiosPrivate.delete(UrlConfig.comments.unlikeComment(comment._id))
      }
    } catch (err) {}
  }

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <ListItem
        alignItems='flex-start'
        sx={{ paddingTop: '0px !important', paddingBottom: '0px !important', paddingRight: '0px !important' }}
      >
        <ListItemAvatar>
          <Avatar alt='Remy Sharp' src={comment.user.profile?.avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Stack direction={'row'} sx={{ alignItems: 'center', marginTop: '3px' }}>
              <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                {comment.user.profile?.firstname + ' ' + comment.user.profile?.lastname}
              </Typography>
              <Typography
                sx={{
                  color: 'rgba(0, 0, 0, 0.50)',
                  fontSize: isMobile ? '10px' : '12px',
                  fontWeight: 400,
                  marginLeft: '7px'
                }}
              >
                {comment.user.profile?.slug}
              </Typography>
            </Stack>
          }
          secondary={
            <>
              <Stack direction={'row'} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ width: '90%' }}>
                  <Box
                    sx={{
                      margin: isMobile ? '5px 0' : '5px 0',
                      fontSize: isMobile ? '13px' : '14px',
                      width: '90%'
                    }}
                  >
                    {comment.content.split(' ').map((word, index) => {
                      if (word.startsWith('@')) {
                        return (
                          <span key={index} style={{ color: 'blue' }}>
                            {word + ' '}
                          </span>
                        )
                      }
                      return word + ' '
                    })}
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
                      onClick={() => {
                        //get the root comment
                        replyComment(comment)
                      }}
                    >
                      Reply
                    </Typography>
                  </Stack>
                </Box>
                <IconButton
                  sx={{ marginLeft: 'auto' }}
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
              {comment.numReplies > 0 && (
                <Box className='comments-child' sx={{ marginTop: '13px' }}>
                  <Typography
                    sx={{
                      color: 'rgba(0, 0, 0, 0.50)',
                      fontSize: isMobile ? '13px' : '13px',
                      fontWeight: 600,
                      wordWrap: 'break-word',
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      setOpenReply(!openReply)
                      if (!openReply) {
                        getReplyComments(comment.post, comment._id)
                      } else {
                        getReplyComments('', comment._id)
                      }
                    }}
                  >
                    {!openReply ? `____   View replies (${comment.numReplies})` : `____   Hide replies`}
                  </Typography>
                  {comment.children?.map((childComment) => (
                    <CommentCard
                      key={childComment._id}
                      comment={childComment}
                      replyComment={replyComment}
                      getReplyComments={getReplyComments}
                    />
                  ))}
                </Box>
              )}
            </>
          }
        />
      </ListItem>
    </List>
  )
}

export default CommentCard
