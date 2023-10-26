'use client'
import React from 'react'
import {
  Box,
  Chip,
  Divider,
  FormControl,
  IconButton,
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

const images = [
  'https://images.pexels.com/photos/6422029/pexels-photo-6422029.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/6588618/pexels-photo-6588618.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/4480156/pexels-photo-4480156.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/5836625/pexels-photo-5836625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
]

interface PostDetailProps {
  post: Post
  open: boolean
  handleClose: () => void
}
const PostDetail = ({ post, open, handleClose }: PostDetailProps) => {
  const isMobile = useResponsive('down', 'sm')
  const hasImages = post.images?.length === 0 ? false : true
  const axiosPrivate = useAxiosPrivate()
  const [comments, setComments] = React.useState([]) // [Comment
  const fetchComments = async () => {
    const response = await axiosPrivate.get(urlConfig.posts.getComments(post._id))
    setComments(response.data.data)
  }
  console.log(comments)
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchComments()
      } catch (error) {
        // Handle any errors that occur during the fetchComments() function
      }
    }

    fetchData()
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
          <Box sx={{ width: hasImages ? '45%' : '100%', height: '83%', bgcolor: 'background.paper', overflow: 'auto' }}>
            <Box sx={{ overflow: 'auto', width: '100%', height: '100%' }}>
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ListItem alignItems='flex-start'>
                  <ListItemAvatar>
                    <Avatar alt='Remy Sharp' src={post.user.profile?.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Stack direction={'row'} sx={{ alignItems: 'center', marginTop: '3px' }}>
                        <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                          {post.user.profile?.firstname + ' ' + post.user.profile?.lastname}
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
                  src={post.user.profile?.avatar}
                ></Avatar>
                <Stack>
                  <Box>
                    <Stack direction={'row'} sx={{ alignItems: 'center', marginTop: '3px' }}>
                      <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                        {post.user.profile?.firstname + ' ' + post.user.profile?.lastname}
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
                      {post.categories.map((category: any, index: number) => (
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
                      {post.content}
                    </Box>
                  </Box>
                </Stack>
              </Stack>
              <Divider variant='inset' />
              <Box>
                {comments.map((comment: Comment, index: number) => (
                  <CommentCard key={index} comment={comment} />
                ))}
              </Box>
            </Box>
            <Box
              sx={{
                position: 'fixed',
                width: hasImages ? '45%' : '100%',
                bottom: '0px', // Adjust the position as needed
                zIndex: 999, // Adjust the z-index as needed
                backgroundColor: 'white', // Background color
                height: '170px',
                borderTop: '1px solid #e8ebed'
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
                  // onClick={() => {
                  //   handleLike()
                  // }}
                  >
                    {/* {liked ? <FavoriteRoundedIcon color='secondary' /> : <FavoriteBorderRoundedIcon color='secondary' />} */}
                    <FavoriteBorderRoundedIcon color='secondary' />
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
                    //   onChange={handleChange}
                  />
                </FormControl>
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
