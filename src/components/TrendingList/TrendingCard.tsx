import React from 'react'
import { Box, Stack, Grid, Typography } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

export default function TrendingCard(props: any) {
  const { des, trend, postCount } = props.item
  return (
    <Box
      sx={{
        width: '100%',
        height: 'auto',
        backgroundColor: 'white',
        padding: '15px',
        borderRadius: '5px',
        opacity: 1,
        '&:hover': {
          backgroundColor: 'palette.common.white',
          opacity: 0.85,
          cursor: 'pointer'
        }
      }}
    >
      <Grid container direction='row' justifyContent='space-between' alignItems='center'>
        <Grid item>
          <Stack spacing={0.5}>
            <Typography
              color='black'
              style={{
                fontWeight: 'normal',
                verticalAlign: 'middle',
                fontSize: '14px'
              }}
            >
              {des}
            </Typography>
            <Typography
              color='black'
              style={{
                fontWeight: 'bold',
                verticalAlign: 'middle',
                fontSize: '18px'
              }}
            >
              {trend}
            </Typography>
            <Typography
              color='black'
              style={{
                fontWeight: 'normal',
                verticalAlign: 'middle',
                fontSize: '14px'
              }}
            >
              {`${postCount} posts`}
            </Typography>
          </Stack>
        </Grid>
        <Grid item>
          <MoreHorizIcon
            sx={{
              height: '40px',
              width: '40px',
              padding: '5px',
              borderRadius: '50%',
              ':hover': {
                backgroundColor: '#d9f3ff'
              }
            }}
          />
        </Grid>
      </Grid>
    </Box>
  )
}
