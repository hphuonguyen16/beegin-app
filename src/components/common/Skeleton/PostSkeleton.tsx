import useResponsive from '@/hooks/useResponsive'
import { Box, Card, CardHeader, Skeleton, Stack } from '@mui/material'
import React from 'react'

const PostSkeleton = () => {
  const isMobile = useResponsive('down', 'sm')

  return (
    <Stack direction={'row'} gap={isMobile ? 1 : 3}>
      <Skeleton animation='wave' variant='circular' width={60} height={60} />
      <Box
        sx={{
          width: '75%',
          minWidth: !isMobile ? '72%' : '100%'
        }}
      >
        <Skeleton animation='wave' variant='text' height={25} sx={{ width: '60%' }} />
        <Skeleton animation='wave' variant='text' height={35} />
        <Skeleton
          variant='rounded'
          height={250}
          sx={{
            mt: 2
          }}
        />
      </Box>
    </Stack>
  )
}

export default PostSkeleton
