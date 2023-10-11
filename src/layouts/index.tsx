// @mui
import { styled } from '@mui/material/styles'
//
import React, { PropsWithChildren, ReactNode } from 'react'

import Sidebar from '@/layouts/Sidebar'

import { TextField, InputAdornment, FormControl, Box, Stack, Button, Typography } from '@mui/material'

import SearchRoundedIcon from '@mui/icons-material/SearchRounded'

import Person2RoundedIcon from '@mui/icons-material/Person2Rounded'

import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded'
import { Poppins } from 'next/font/google'
import useResponsive from '@/hooks/useResponsive'
import logoMobile from '@/assets/logoMobile.png'
import Image from 'next/image'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Loader from '@/components/common/Loader/Loader'

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64
const APP_BAR_DESKTOP = 92

const StyledRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
  maxHeight: '100vh',
  width: '100%', // Set width to 100% by default

  [theme.breakpoints.down('sm')]: {
    // Media query for screens with a width of 600px or less (mobile)
    width: '100%' // Set width to 100% for mobile screens
  }
}))

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
})

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  minHeight: '100%',
  width: '100%',
  // overflow: 'auto',
  marginLeft: '20px',
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.down('sm')]: {
    // Media query for screens with a width of 600px or less (mobile)
    marginLeft: '0',
    flexGrow: 1
    // Remove left margin for mobile
  }
}))

const HeaderBar = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginRight: '25px',
  alignItems: 'center',
  padding: theme.spacing(2),

  [theme.breakpoints.down('sm')]: {
    // Media query for screens with a width of 600px or less (mobile)
    flexDirection: 'column', // Change to a column layout for mobile
    alignItems: 'flex-start', // Adjust alignment for mobile
    padding: theme.spacing(1), // Adjust padding for mobile
    marginRight: 0, // Remove right margin for mobile
    width: '100%'
  }
}))

const StyledIconBox = styled('div')(({ theme }) => ({
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.light,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  '& svg': {
    fontSize: '28px',
    color: 'white'
  },
  boxShadow: '-7px 10px 21px 1px rgba(204.44, 128.17, 240.32, 0.30)'
}))

const StyledIconNotifBox = styled('div')(({ theme }) => ({
  width: '60px',
  height: '60px',
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
  const isMobile = useResponsive('down', 'sm')
  const [isLoading, setIsLoading] = React.useState(true)
  const pathname = usePathname() // Get the current route from the router

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  const pathSegments = pathname.split('/')
  const topic =
    pathSegments[pathSegments.length - 1].charAt(0).toUpperCase() + pathSegments[pathSegments.length - 1].slice(1)

  if (isLoading) {
    return <Loader />
  }

  return (
    <StyledRoot>
      <aside>
        <Sidebar />
      </aside>
      <Main className={poppins.className}>
        {!isMobile ? (
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
              <Button sx={{ borderRadius: '50%' }}>
                <StyledIconNotifBox>
                  <NotificationsRoundedIcon />
                </StyledIconNotifBox>
              </Button>
              <Button sx={{ borderRadius: '50%' }}>
                <StyledIconBox>
                  <Person2RoundedIcon />
                </StyledIconBox>
              </Button>
            </Stack>
          </HeaderBar>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              padding: '17px 15px'
            }}
          >
            <Typography variant='h4' sx={{ fontWeight: 'bold', color: 'black' }}>
              {topic || 'Home'}
            </Typography>
            <Image src={logoMobile} alt='logo' width={50} height={50} />
            <Stack direction={'row'} spacing={2} sx={{ justifyContent: 'center', alignItems: 'space-between' }}>
              <NotificationsOutlinedIcon sx={{ fontSize: '40px' }} color='primary' />
              <AccountCircleOutlinedIcon sx={{ fontSize: '40px' }} color='primary' />
            </Stack>
          </Box>
        )}
        {children}
      </Main>
    </StyledRoot>
  )
}

export default Layout
