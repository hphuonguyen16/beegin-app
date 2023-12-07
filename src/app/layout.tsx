'use client'
import './globals.css'
import '@/styles/typing.css'
import { Poppins } from 'next/font/google'
import ThemeProvider from '../theme'
import * as React from 'react'
import Layout from '@/layouts'
import { usePathname } from 'next/navigation'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
import { AuthProvider, useAuth } from '@/context/AuthContext'
import { Snackbar } from '@mui/material'
import { SnackbarContextProvider } from '@/context/snackbarContext'
import { PostProvider } from '@/context/PostContext'
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import ArticleIcon from '@mui/icons-material/Article'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined'
import SummarizeIcon from '@mui/icons-material/Summarize'
import { HomeOutlined, TextsmsOutlined, Person2Outlined, SettingsOutlined, ExploreOutlined } from '@mui/icons-material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TanstackProvider from '@/providers/TanstackProvider'

import { BsHouse } from "react-icons/bs";
import { FaHouseChimney, FaRegUser, FaUser, FaCircleUser, FaRegCircleUser } from "react-icons/fa6";
import { FaCompass, FaRegCompass } from "react-icons/fa";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { BiMessageSquareDetail } from "react-icons/bi";
import { IoHome, IoHomeOutline } from "react-icons/io5";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { TiHomeOutline, TiHome } from "react-icons/ti";


const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins'
})

// export const metadata = {
//   title: 'Beegin app',
//   description:
//     'A new next generation social media application!',
// };
const menuItems = [
  {
    icon: <AiOutlineHome />,
    iconActive: <AiFillHome />,
    label: 'Home',
    path: '/home'
  },
  {
    icon: <FaRegCompass />
    ,
    iconActive: <FaCompass />,
    label: 'Explore',
    path: '/explore'
  },
  {
    icon: <BiMessageSquareDetail />,
    iconActive: <BiSolidMessageSquareDetail />,
    label: 'Messages',
    path: '/messages'
  },
  {
    icon: <FaRegCircleUser />,
    iconActive: <FaCircleUser />,
    label: 'Profile',
    path: '/profile'
  },
  // {
  //   icon: <SettingsOutlined />,
  //   iconActive: <SettingsRoundedIcon />,
  //   label: 'Settings',
  //   path: '/settings'
  // }
]

const menuAdminItems = [
  {
    icon: <AnalyticsOutlinedIcon />,
    iconActive: <AnalyticsIcon />,
    label: 'Overview',
    path: '/admin/overview'
  },
  {
    icon: <ArticleOutlinedIcon />,
    iconActive: <ArticleIcon />,
    label: 'Reports',
    path: '/admin/reports'
  },
  {
    icon: <PeopleOutlineOutlinedIcon />,
    iconActive: <PeopleAltIcon />,
    label: 'User Management',
    path: '/admin/user-management'
  },
  {
    icon: <SummarizeOutlinedIcon />,
    iconActive: <SummarizeIcon />,
    label: 'Advertisements',
    path: '/admin/advertisements'
  }
]

export default function RootLayout({ children, session }: { children: React.ReactNode; session: any }) {
  const pathname = usePathname()
  const noLayoutPaths = ['/login', '/register', '/verify']
  const isAdminPath = pathname.startsWith('/admin')
  if (noLayoutPaths.includes(pathname)) {
    return (
      <html lang='en'>
        <Head>
          <link rel='icon' href='/favicon.ico' sizes='any' />
          {/* <meta name="description" content={metadata.description} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={metadata.title} /> */}
        </Head>
        <body className={poppins.variable}>
          <AuthProvider>
            <TanstackProvider>
              <SnackbarContextProvider>
                <SessionProvider session={session}>
                  <PostProvider>
                    <ThemeProvider>{children}</ThemeProvider>
                  </PostProvider>
                </SessionProvider>
              </SnackbarContextProvider>
            </TanstackProvider>
          </AuthProvider>
        </body>
      </html>
    )
  } else {
    return (
      <html lang='en'>
        <Head>
          <link rel='icon' href='/favicon.ico' sizes='any' />
          {/* <meta name="description" content={metadata.description} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={metadata.title} /> */}
        </Head>
        <body className={poppins.variable}>
          <AuthProvider>
            <TanstackProvider>
              <SnackbarContextProvider>
                <SessionProvider session={session}>
                  <PostProvider>
                    <ThemeProvider>
                      {isAdminPath ? (
                        // Use menuAdminItems for admin path
                        <Layout menuItems={menuAdminItems}>{children}</Layout>
                      ) : (
                        // Use menuItems for other paths
                        <Layout menuItems={menuItems}>{children}</Layout>
                      )}
                    </ThemeProvider>
                  </PostProvider>
                </SessionProvider>
              </SnackbarContextProvider>
            </TanstackProvider>
          </AuthProvider>
        </body>
      </html>
    )
  }
}
