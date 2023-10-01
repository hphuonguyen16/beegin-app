import React from 'react'
import { CardActions, Icon, IconButton } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import IosShareIcon from '@mui/icons-material/IosShare'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'

interface PostActionData {
  id: string
  like: number
  comment: number
  share: number
}

export default function PostAction() {
  const [isLiked, setIsLiked] = React.useState(false)

  const handleLikeClick = () => {
    setIsLiked((prev) => !prev)
    // set some logic code and call api here
  }
  return (
    <CardActions disableSpacing sx={{ justifyContent: 'space-between', margin: '0 15px' }}>
      <IconButton onClick={handleLikeClick} size='large' color='primary'>
        {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
      <IconButton color='primary'>
        <ChatBubbleOutlineIcon />
      </IconButton>
      <IconButton color='primary'>
        <ShareOutlinedIcon />
      </IconButton>
    </CardActions>
  )
}
