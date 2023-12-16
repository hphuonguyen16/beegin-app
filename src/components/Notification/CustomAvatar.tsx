import { Avatar, Badge, Box } from '@mui/material'
import React from 'react'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'

const CustomAvatar = () => {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <Badge
        variant='dot'
        color='secondary'
        overlap='circular'
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <Avatar sx={{ width: '45px', height: '45px' }}></Avatar>
        </Box>
        <FavoriteRoundedIcon
          sx={{
            fontSize: '20px',
            position: 'absolute',
            bottom: '0px',
            right: '-6px'
          }}
          color='secondary'
        />
      </Badge>
    </div>
  )
}

export default CustomAvatar
