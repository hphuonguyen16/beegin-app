import React from 'react'
import { IconButton, Popover } from '@mui/material'
import { useState } from 'react'
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined'
import Picker from 'emoji-picker-react'

interface EmojiPickerProps {
  content: string
  setContent: any
}

const EmojiPicker = ({ content, setContent }: EmojiPickerProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [showPicker, setShowPicker] = useState(false)
  const openAnchorEl = Boolean(anchorEl)
  const id = openAnchorEl ? 'simple-popover' : undefined
  const openPicker = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    setShowPicker((prev) => !prev)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const onEmojiClick = (emojiObject: any, event: any) => {
    setContent((prevInput: string) => prevInput + emojiObject.emoji)
    setShowPicker(false)
  }

  return (
    <>
      <IconButton aria-describedby={id} onClick={openPicker}>
        <EmojiEmotionsOutlinedIcon color='secondary' fontSize='large' />
      </IconButton>
      <Popover
        id={id}
        open={openAnchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        <Picker onEmojiClick={onEmojiClick} />
      </Popover>
    </>
  )
}

export default EmojiPicker
