'use client'
import ListFollow from '@/components/ListFollowing/ListFollow'
import SuggestFollow from '@/components/SuggestFollow/SuggestFollow'
import { Divider, Grid, Stack } from '@mui/material'
import { Box } from '@mui/system'
import React, { ReactNode } from 'react'

interface PostLayoutProps {
  children: ReactNode
}

const PostLayout = ({ children }: PostLayoutProps) => {
  return (
    <Box sx={{ display: 'flex', height: '100%', marginRight: '20px' }}>
      <Grid
        sx={{
          width: '65%',
          padding: '20px',
          borderRadius: '10px',
          overflow: 'auto'
        }}
      >
        {children}
      </Grid>
      <Divider orientation='vertical' flexItem sx={{ color: 'rgba(204.44, 128.17, 240.32, 0.25)' }} />
      <Grid
        sx={{
          width: '35%',
          padding: '0 22px',
          borderRadius: '10px'
        }}
      >
        <Stack gap={3}>
          <SuggestFollow />
          <Divider sx={{ color: 'rgba(204.44, 128.17, 240.32, 0.25)' }} />
          <ListFollow />
        </Stack>
      </Grid>
    </Box>
  )
}

export default PostLayout
