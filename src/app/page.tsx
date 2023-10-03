import { Box, Typography, Stack, FormControl, TextField, Avatar, Grid } from '@mui/material'

export default function Home() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Box>
          <Typography variant='h4' sx={{ fontWeight: 'bold', color: 'black' }}>
            Feeds
          </Typography>
          <Stack direction={'row'} sx={{ marginTop: '25px' }} spacing={2}>
            <Avatar sx={{ width: 50, height: 50 }}></Avatar>
            <TextField
              size='small'
              variant='outlined'
              placeholder='What’s on your mind?'
              sx={{
                '& .MuiInputBase-root': {
                  height: '50px'
                },
                background: 'white',
                borderRadius: '10px',
                marginBottom: '15px',
                width: '500px'
              }}
            />
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <div>side page</div>
      </Grid>
    </Grid>
  )
}
