import React, { useEffect } from 'react'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import TextsmsRoundedIcon from '@mui/icons-material/TextsmsRounded'
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import FaceRoundedIcon from '@mui/icons-material/FaceRounded'
import { HomeOutlined, TextsmsOutlined, Person2Outlined, SettingsOutlined, FaceOutlined } from '@mui/icons-material'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/assets/logo.png'
import { Box, Stack, Typography, styled } from '@mui/material'
import { usePathname } from 'next/navigation'
import { Poppins } from 'next/font/google'

const StyledSidebar = styled(Box)(({ theme }) => ({
  height: '100%',
  width: '290px',
  backgroundColor: '#fff'
}))

// Define StyledLinkBox with conditional styles
const StyledLinkBox = styled('div')<{ isActive: boolean }>((props) => ({
  width: '100%',
  padding: '15px 0',
  '& a': {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center'
  },
  transition: 'background-color 0.3s ease-in-out', // Smooth background color transition on hover
  '&:hover': {
    backdropFilter: 'blur(4px)', // Use 'backdropFilter' with a CSS value
    boxShadow: '-2px 5px 13px rgba(0, 0, 0, 0.06)',
    transition: 'background-color 0.3s ease-in-out' // Smooth background color transition on hover
  },
  // Conditional styles based on isActive
  ...(props.isActive && {
    backdropFilter: 'blur(4px)',
    boxShadow: '-2px 5px 13px rgba(0, 0, 0, 0.06)',
    transition: 'background-color 0.5s ease-in-out'
  })
}))

const StyledStack = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: '25px'
}))

const StyledIconBox = styled('div')(({ theme }) => ({
  marginRight: '23px',
  '& svg': {
    fontSize: '32px',
    color: theme.palette.primary.main
  }
}))

const menuItems = [
  {
    icon: <HomeOutlined />,
    iconActive: <HomeRoundedIcon />,
    label: 'Home',
    path: '/'
  },
  {
    icon: <TextsmsOutlined />,
    iconActive: <TextsmsRoundedIcon />,
    label: 'Messages',
    path: '/messages'
  },
  {
    icon: <Person2Outlined />,
    iconActive: <Person2RoundedIcon />,
    label: 'Profile',
    path: '/profile'
  },
  {
    icon: <SettingsOutlined />,
    iconActive: <SettingsRoundedIcon />,
    label: 'Settings',
    path: '/settings'
  }
]

const Sidebar = () => {
  const pathname = usePathname() // Get the current route from the router

  // Define a function to determine if the link is active
  const isLinkActive = (path: String) => {
    return path === pathname
  }
  return (
    <StyledSidebar>
      <Box sx={{ padding: '35px 0' }}>
        <Image src={logo} alt='logo' width={110} height={110} style={{ margin: 'auto' }} />
      </Box>
      <Box>
        <Typography variant='h4' sx={{ fontWeight: 'bold', marginTop: '20px', marginLeft: '22px', color: 'black' }}>
          Menu
        </Typography>
        <Stack direction='column' spacing={1} sx={{ marginTop: '25px', width: '100%' }}>
          {menuItems.map((item) => (
            <StyledLinkBox key={item.path} isActive={isLinkActive(item.path)}>
              <Link href={item.path}>
                <StyledStack>
                  <StyledIconBox>
                    {
                      isLinkActive(item.path) ? item.iconActive : item.icon // Use the outlined icon
                    }
                  </StyledIconBox>
                  <Typography
                    color='primary'
                    style={{
                      fontWeight: 'bold',
                      verticalAlign: 'middle',
                      opacity: isLinkActive(item.path) ? 1 : 0.5,
                      fontSize: '18px'
                    }}
                  >
                    {item.label}
                  </Typography>
                </StyledStack>
              </Link>
            </StyledLinkBox>
          ))}
        </Stack>
      </Box>
    </StyledSidebar>
  )
}

export default Sidebar
