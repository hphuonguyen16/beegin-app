import React from 'react'
import { MoreVertOutlined } from '@mui/icons-material'
import { Avatar, Card, CardContent, CardHeader, Typography, IconButton, Box } from '@mui/material'

export default function PostContent() {
  return (
    <Box>
      <CardHeader
        avatar={<Avatar src='https://pbs.twimg.com/profile_images/1699898466959347712/WS3HVOtW_400x400.jpg' />}
        title='Ave Fox'
        subheader='@avefoxu'
        action={
          <IconButton>
            <MoreVertOutlined />
          </IconButton>
        }
      />
      <CardContent>
        <Typography variant='h5'>
          This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of
          frozen peas along with the mussels, if you like.
        </Typography>
      </CardContent>
    </Box>
  )
}
