import { Box, Stack, Typography } from '@mui/material'
import { Post } from '@/types/post'
import PostCard from '../Posts/PostCard'
interface TrendingPostCardProps {
  category: string
  posts: Post[]
}
export default function TrendingPostCard({ category, posts }: TrendingPostCardProps) {
  return (
    <Box>
      <Typography>{category}</Typography>
      <Stack>
        {posts.map((post) => (
          <PostCard post={post} />
        ))}
      </Stack>
    </Box>
  )
}
