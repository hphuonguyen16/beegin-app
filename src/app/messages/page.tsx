'use client'

import useResponsive from '@/hooks/useResponsive'
import { Grid, Box, styled } from '@mui/material'
import ChatList from './ChatList'
import ChatBox from './ChatBox'
import React, { useState } from 'react'

const StyledBox = styled('div')(({ theme }) => ({
  width: '100%',
  height: '96%',
  backgroundColor: '#FFFFFF',
  borderRadius: '16px',
  padding: '15px 30px',
}))

const INFO_PANE_WIDTH = "30%";

export default function Page() {
  const isMobile = useResponsive('down', 'sm');

  return <Box sx={{ width: "100%", height: "100%" }}> <Grid sx={{ width: "100%", height: "100%" }} container spacing={3}>
    <Grid item xs={4}>
      <StyledBox>
        <ChatList />
      </StyledBox>
    </Grid>

    <Grid item xs={8} sx={{ height: "100%" }}>
      <StyledBox sx={{ padding: 0, display: 'flex', position: 'relative' }}>
        <ChatBox />
      </StyledBox>
    </Grid>
  </Grid>
  </Box>
}
