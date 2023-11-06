'use client'

import useResponsive from '@/hooks/useResponsive'
import { Grid, Box, styled } from '@mui/material'
import ChatList from './ChatList'
import ChatBox from './ChatBox'
import React, { useEffect, useState } from 'react'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import Profile from '@/types/profile'
import CustomSnackbar from '@/components/common/Snackbar'

const StyledBox = styled('div')(({ theme }) => ({
  width: '100%',
  height: '96%',
  backgroundColor: '#FFFFFF',
  borderRadius: '16px',
  padding: '15px 25px',
}))

const INFO_PANE_WIDTH = "30%";

export default function Page() {
  const isMobile = useResponsive('down', 'sm');
  const [selectedFriend, setSelectedFriend] = useState<Profile>()
  const axiosPrivate = useAxiosPrivate()


  return <Box sx={{ width: "100%", height: "100%" }}>
    <Grid sx={{ width: "100%", height: "100%" }} container spacing={3}>
      <Grid item xs={4}>
        <StyledBox>
          <ChatList setSelectedFriend={setSelectedFriend} />
        </StyledBox>
      </Grid>

      <Grid item xs={8} sx={{ height: "100%" }}>
        <StyledBox sx={{ padding: 0, display: 'flex', position: 'relative' }}>
          <ChatBox friend={selectedFriend} />
        </StyledBox>
      </Grid>
    </Grid>
    <CustomSnackbar />
  </Box>
}
