'use client'
import './globals.css'
import { Poppins } from 'next/font/google'
import ThemeProvider from '../theme'
import * as React from 'react'
import Layout from '@/layouts'
import { usePathname } from 'next/navigation'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
import { AuthProvider } from '@/context/AuthContext'
import { Snackbar } from '@mui/material'
import { SnackbarContextProvider } from '@/context/snackbarContext'
import { PostProvider } from '@/context/PostContext'

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

export default function RootLayout({ children, session }: { children: React.ReactNode; session: any }) {
  const pathname = usePathname()
  if (pathname === '/login' || pathname === '/register' || pathname.startsWith('/verify')) {
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
            <SnackbarContextProvider>
              <SessionProvider session={session}>
                <PostProvider>
                  <ThemeProvider>{children}</ThemeProvider>
                </PostProvider>
              </SessionProvider>
            </SnackbarContextProvider>
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
            <SnackbarContextProvider>
              <SessionProvider session={session}>
                <PostProvider>
                  <ThemeProvider>
                    <Layout>{children}</Layout>
                  </ThemeProvider>
                </PostProvider>
              </SessionProvider>
            </SnackbarContextProvider>
          </AuthProvider>
        </body>
      </html>
    )
  }
}
