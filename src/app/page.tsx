import PostCard from '@/components/Posts/PostCard'
import { Box, Typography, Stack, FormControl, TextField, Avatar, Grid } from '@mui/material'
import PostLayout from '@/layouts/PostLayout'

export default function Home() {
  return (
    <PostLayout>
      <Box>
        <Typography variant='h4' sx={{ fontWeight: 'bold', color: 'black' }}>
          Feeds
        </Typography>
        <Stack direction={'row'} sx={{ marginTop: '25px' }} spacing={2}>
          <Avatar
            src='https://images.pexels.com/photos/928966/pexels-photo-928966.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            sx={{ width: 50, height: 50 }}
          ></Avatar>
          <TextField
            size='small'
            variant='outlined'
            placeholder='What’s on your mind?'
            sx={{
              '& .MuiInputBase-root': {
                height: '50px'
              },
              //   background: 'white',
              //   borderRadius: '10px',
              //   marginBottom: '15px',
              width: '700px'
            }}
          />
        </Stack>
        <Box sx={{ marginTop: '50px' }}>
          <PostCard />
          <PostCard />
        </Box>
      </Box>
    </PostLayout>
  )
}
