'use client'
import React, { useEffect } from 'react'
import {
  Box,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal
} from '@mui/material'
import Slider from '@/components/Posts/ImageSlider'
import RootModal from '@/components/common/modals/RootModal'
import useResponsive from '@/hooks/useResponsive'
import { CardHeader, Avatar, Button, Typography, Stack, TextField } from '@mui/material'
import CommentCard from '@/components/Comment/CommentCard'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import ShareIcon from '@mui/icons-material/Share'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { Post } from '@/types/post'
import { timeSince } from '@/utils/changeDate'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import urlConfig from '@/config/urlConfig'
import { Comment } from '@/types/comment'
import HashtagWrapper from '@/components/common/HashtagWrapper'
import EmojiPicker from '../common/EmojiPicker'
import _ from 'lodash'

// find the root of children comment
function findRootComment(comments: Comment[], comment: Comment) {
  if (comment.parent) {
    const parentComment = comments.find((c) => c._id === comment.parent)
    if (parentComment) {
      return findRootComment(comments, parentComment)
    }
  }
  return comment
}

function findRootCommentIndex(comments: Comment[], comment: Comment) {
  if (comment.parent) {
    const parentComment = comments.find((c) => c._id === comment.parent)
    if (parentComment) {
      return findRootCommentIndex(comments, parentComment)
    }
  }
  return comments.findIndex((c) => c._id === comment._id)
}

function getNumComments(comments: Comment[]) {}

interface PostDetailProps {
  post: Post
  open: boolean
  handleLike: () => void
  handleClose: () => void
}

interface pageOfReplyComments {
  [key: string]: number
}

const PostDetail = ({ post, open, handleClose, handleLike }: PostDetailProps) => {
  const isMobile = useResponsive('down', 'sm')
  const hasImages = post.images?.length === 0 ? false : true
  const axiosPrivate = useAxiosPrivate()
  const [comments, setComments] = React.useState<Comment[]>((post.comments as unknown as Comment[]) || [])
  const [comment, setComment] = React.useState('')
  const [commentReply, setCommentReply] = React.useState<Comment>() // [Comment]
  const [page, setPage] = React.useState(1)
  const [loading, setLoading] = React.useState(false)
  const [totalComments, setTotalComments] = React.useState(0)
  const fetchComments = async () => {
    setLoading(true)
    const response = await axiosPrivate.get(`${urlConfig.posts.getComments(post._id)}?limit=10&page=${page}`)
    setTotalComments(response.data.total)
    setComments([...comments, ...response.data.data])
    post.comments = [...comments, ...response.data.data]
    let numComments = comments.length
    comments.forEach((comment) => {
      if (comment.children) {
        numComments += comment.children.length
      }
    })
    setPage(page + 1)
    setLoading(false)
  }
  const createComment = async () => {
    if (!commentReply) {
      const response = await axiosPrivate.post(urlConfig.comments.createComment(post._id), {
        content: comment
      })
      setComments([response.data.data, ...comments])
    } else {
      const rootComment = findRootComment(comments, commentReply)
      const response = await axiosPrivate.post(urlConfig.comments.createComment(post._id), {
        content: comment,
        parent: rootComment._id
      })
      setComments((prev) => {
        const newComments = _.cloneDeep(prev)
        const rootCommentIndex = findRootCommentIndex(newComments, commentReply)

        if (rootCommentIndex !== -1) {
          const rootComment = newComments[rootCommentIndex]

          if (!rootComment.children) {
            rootComment.children = []
          }

          const childComment = response.data.data
          childComment.key = childComment._id

          rootComment.children = [childComment, ...rootComment.children]
          rootComment.numReplies++
        }
        return newComments
      })
    }
  }
  const replyComment = (commentReply: Comment) => {
    setCommentReply(commentReply)
    if (commentReply.user.profile?.slug) setComment(`${commentReply.user.profile?.slug} `)
    else setComment(`@${commentReply.user.profile?.firstname + commentReply.user.profile?.lastname} `)
  }
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchComments()
      } catch (error) {
        // Handle any errors that occur during the fetchComments() function
      }
    }
    if (!post.comments) {
      fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Modal open={open}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          //   width: isMobile ? '80vw' : width ? width : '100vw',
          width: isMobile ? '80vw' : hasImages ? '80vw' : '50vw',
          height: isMobile ? '80vh' : '90vh',
          bgcolor: 'rgba(0, 0, 0, 1)',
          boxShadow: 24,
          borderRadius: 2
        }}
      >
        <Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
          {hasImages && (
            <Box sx={{ width: '55%', height: '100%' }}>
              <Slider images={post.images ?? []} />
            </Box>
          )}
          <Box
            sx={{
              width: hasImages ? '45%' : '100%',
              height: '83%',
              bgcolor: 'background.paper',
              overflow: 'auto',
              borderRadius: '0px 10px 0px 10px'
            }}
            id='commentDiv'
          >
            <Box sx={{ overflow: 'auto', width: '100%', height: '93%' }}>
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ListItem alignItems='flex-start'>
                  <ListItemAvatar>
                    <Avatar alt='Remy Sharp' src={post.user?.profile?.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Stack direction={'row'} sx={{ alignItems: 'center', marginTop: '3px' }}>
                        <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                          {post.user?.profile?.firstname + ' ' + post.user?.profile?.lastname}
                        </Typography>
                        <Typography
                          sx={{
                            color: 'rgba(0, 0, 0, 0.50)',
                            fontSize: isMobile ? '10px' : '13px',
                            fontWeight: 400,
                            marginLeft: '7px'
                          }}
                        >
                          {post.user?.profile?.slug}
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
                            fontSize: isMobile ? '10px' : '14px',
                            fontWeight: 600,
                            marginLeft: '15px',
                            cursor: 'pointer',
                            '&:hover': {
                              color: 'primary.main'
                            }
                          }}
                          color='secondary'
                        >
                          Follow
                        </Typography>
                      </Stack>
                    }
                    secondary={<React.Fragment>{'Spain'}</React.Fragment>}
                  />
                </ListItem>
              </List>
              <Divider variant='inset' />
              <Stack direction={'row'} gap={isMobile ? 1 : 3} sx={{ margin: '15px 0px 15px 15px' }}>
                <Avatar
                  sx={{ width: isMobile ? '45px' : '40px', height: isMobile ? '45px' : '40px' }}
                  src={post.user?.profile?.avatar}
                ></Avatar>
                <Stack>
                  <Box>
                    <Stack direction={'row'} sx={{ alignItems: 'center', marginTop: '3px' }}>
                      <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                        {post.user?.profile?.firstname + ' ' + post.user?.profile?.lastname}
                      </Typography>
                      <Typography
                        sx={{
                          color: 'rgba(0, 0, 0, 0.50)',
                          fontSize: isMobile ? '10px' : '13px',
                          fontWeight: 400,
                          marginLeft: '7px'
                        }}
                      >
                        {post.user?.profile?.slug}
                      </Typography>
                      <Typography
                        sx={{
                          color: 'rgba(0, 0, 0, 0.50)',
                          fontSize: isMobile ? '13px' : '12px',
                          fontWeight: 400,
                          wordWrap: 'break-word',
                          marginLeft: '15px'
                        }}
                      >
                        {timeSince(new Date(post.createdAt))}
                      </Typography>
                      <Box
                        sx={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          marginLeft: '15px',
                          marginRight: '10px',
                          backgroundColor: 'rgba(0, 0, 0, 0.50)'
                        }}
                      ></Box>
                      {post?.categories?.map((category: any, index: number) => (
                        <Chip
                          variant='outlined'
                          key={index}
                          label={category.name}
                          sx={{
                            fontSize: isMobile ? '10px' : '12px',
                            fontWeight: 600,
                            borderRadius: '10px',
                            padding: '2px 10px',
                            margin: '0 10px'
                          }}
                          color='secondary'
                        />
                      ))}
                    </Stack>
                    <Box
                      sx={{
                        margin: isMobile ? '5px 0' : '10px 0',
                        fontSize: isMobile ? '13px' : '14px',
                        width: '90%'
                      }}
                    >
                      {post.content && <HashtagWrapper text={post.content} />}
                    </Box>
                  </Box>
                </Stack>
              </Stack>
              <Divider variant='inset' />
              <Box sx={{ paddingRight: '15px' }}>
                {comments.map((comment: Comment, index: number) => (
                  <CommentCard key={comment._id} comment={comment} replyComment={replyComment} />
                ))}
                {comments.length >= 10 && comments.length < totalComments && (
                  <Stack direction={'row'} sx={{ alignItems: 'center', marginLeft: '20px', marginTop: '20px' }}>
                    <Typography
                      onClick={() => fetchComments()}
                      color='primary'
                      sx={{
                        fontWeight: 'bold',
                        verticalAlign: 'middle',
                        fontSize: '14px',
                        cursor: 'pointer',
                        opacity: 0.7
                      }}
                    >
                      Show more
                    </Typography>
                    {loading && <CircularProgress size={14} sx={{ marginLeft: '20px' }} />}
                  </Stack>
                )}
              </Box>
            </Box>
            <Box
              sx={{
                position: 'fixed',
                width: hasImages ? '45%' : '100%',
                bottom: '0px', // Adjust the position as needed
                zIndex: 999, // Adjust the z-index as needed
                backgroundColor: 'white', // Background color
                height: '190px',
                borderTop: '1px solid #e8ebed',
                borderRadius: '12px'
              }}
            >
              <Stack
                direction={'row'}
                gap={isMobile ? 1 : 2}
                sx={{
                  margin: isMobile ? '7px 0px 30px 0px' : '15px 10px 5px 10px',
                  alignItems: 'center'
                }}
              >
                <Stack direction={'row'} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                  <IconButton
                    onClick={() => {
                      handleLike()
                    }}
                  >
                    {post.isLiked ? (
                      <FavoriteRoundedIcon color='secondary' />
                    ) : (
                      <FavoriteBorderRoundedIcon color='secondary' />
                    )}
                    {/* <FavoriteBorderRoundedIcon color='secondary' /> */}
                  </IconButton>
                  <span style={{ marginLeft: isMobile ? '7px' : '5px', fontWeight: 600, fontSize: '13px' }}>
                    {post.numLikes}
                  </span>
                </Stack>
                <Stack direction={'row'} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                  <IconButton>
                    <ChatBubbleOutlineIcon color='secondary' />
                  </IconButton>
                  <span style={{ marginLeft: isMobile ? '7px' : '5px', fontWeight: 600, fontSize: '13px' }}>
                    {post.numComments}
                  </span>
                </Stack>
                <Stack direction={'row'} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                  <IconButton>
                    <ShareIcon color='secondary' />
                  </IconButton>
                </Stack>
              </Stack>
              <Typography
                sx={{
                  fontSize: isMobile ? '13px' : '15px',
                  fontWeight: 400,
                  opacity: 0.7,
                  marginTop: '10px',
                  wordWrap: 'break-word',
                  marginLeft: '25px'
                }}
              >
                {timeSince(new Date(post.createdAt))}
              </Typography>
              <Box sx={{ padding: '0 13px', marginTop: '15px' }}>
                <FormControl sx={{ width: '100%' }}>
                  <TextField
                    multiline
                    size='small'
                    variant='outlined'
                    placeholder='Write a comment...'
                    sx={{
                      '& fieldset': { border: 'none' },
                      '& .MuiInputBase-root': {
                        height: '60px',
                        maxHeight: '70px',
                        overflow: 'auto'
                      },
                      background: '#f8e5ee',
                      borderRadius: '10px',
                      marginBottom: '15px'
                    }}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        if (comment === '') return
                        createComment()
                        //clear input
                        setComment('')
                      }
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <EmojiPicker content={comment} setContent={setComment} sizeMedium={false} />
                        </InputAdornment>
                      )
                    }}
                  />
                </FormControl>
                {/* <CustomTextfield /> */}
              </Box>
            </Box>
          </Box>
        </Box>
        <IconButton
          sx={{ position: 'absolute', top: '-3%', right: hasImages ? '-10%' : '-47%' }}
          onClick={() => handleClose()}
        >
          <CloseRoundedIcon sx={{ color: 'white', fontSize: '25px' }} />
        </IconButton>
      </Box>
    </Modal>
  )
}

export default PostDetail
