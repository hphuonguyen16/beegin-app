import React from 'react'
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

const StyledSidebar = styled(Box)(({ theme }) => ({
  height: '100%',
  width: '300px',
  backgroundColor: '#fff'
}))

const StyledLinkBox = styled('div')(({ theme }) => ({
  width: '100%',
  padding: '15px 0',
  '& a': {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center'
  },
  transition: 'background-color 0.3s ease-in-out', //Smooth background color transition on hover
  '&:hover': {
    backdropFilter: 'blur(4px)', // Use 'backdropFilter' with a CSS value
    boxShadow: '-2px 5px 13px rgba(0, 0, 0, 0.06)'
  }
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
        <Image src={logo} alt='logo' width={100} height={100} style={{ margin: 'auto' }} />
      </Box>
      <Box>
        <Typography variant='h4' sx={{ fontWeight: 'bold', marginTop: '20px', marginLeft: '22px' }}>
          Menu
        </Typography>
        <Stack direction='column' sx={{ marginTop: '20px', width: '100%' }}>
          {menuItems.map((item) => (
            <StyledLinkBox key={item.path}>
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
                      opacity: isLinkActive(item.path) ? 0.8 : 0.5
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
