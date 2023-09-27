// @mui
import { styled } from '@mui/material/styles'
//
import React, { PropsWithChildren, ReactNode } from 'react'

import Sidebar from '@/layouts/Sidebar'

import { TextField, InputAdornment, FormControl, Box, Stack } from '@mui/material'

import SearchRoundedIcon from '@mui/icons-material/SearchRounded'

import Person2RoundedIcon from '@mui/icons-material/Person2Rounded'

import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded'
// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64
const APP_BAR_DESKTOP = 92

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
  maxHeight: '100vh'
})

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  minHeight: '100%',
  maxHeight: '100vh',
  overflow: 'hidden',
  marginLeft: '25px',
  paddingBottom: theme.spacing(10)
}))

const HeaderBar = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginRight: '25px',
  alignItems: 'center',
  padding: theme.spacing(2)
}))

const StyledIconBox = styled('div')(({ theme }) => ({
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.light,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  '& svg': {
    fontSize: '28px',
    color: 'white'
  }
}))

const StyledIconNotifBox = styled('div')(({ theme }) => ({
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  backgroundColor: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  border: `1px solid ${theme.palette.primary.light}`,
  '& svg': {
    fontSize: '28px',
    color: theme.palette.primary.light
  }
}))

// const poppins = Poppins({
//   weight: '400',
//   subsets: ['latin'],
//   display: 'swap'
// })

// ----------------------------------------------------------------------

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <StyledRoot>
      <aside>
        <Sidebar />
      </aside>
      <Main>
        <HeaderBar>
          <FormControl sx={{ width: '700px' }}>
            <TextField
              size='small'
              variant='outlined'
              placeholder='Search'
              sx={{
                marginLeft: '15px',
                '& .MuiInputBase-root': {
                  height: '50px'
                },
                background: 'white',
                borderRadius: '10px',
                marginBottom: '15px'
              }}
              //   onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchRoundedIcon />
                  </InputAdornment>
                )
              }}
            />
          </FormControl>
          <Stack direction={'row'} spacing={2}>
            <StyledIconNotifBox>
              <NotificationsRoundedIcon />
            </StyledIconNotifBox>
            <StyledIconBox>
              <Person2RoundedIcon />
            </StyledIconBox>
          </Stack>
        </HeaderBar>
        {children}
      </Main>
    </StyledRoot>
  )
}

export default Layout
