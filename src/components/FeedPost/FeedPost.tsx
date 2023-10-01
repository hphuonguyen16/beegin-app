import { Card, Grid } from '@mui/material'

import PostContent from './PostContent'
import PostMedia from './PostMedia'
import PostAction from './PostAction'

export default function FeedPost() {
  return (
    <Card sx={{ margin: '25px 0' }}>
      <PostContent />
      <PostMedia />
      <PostAction />
    </Card>
  )
}
