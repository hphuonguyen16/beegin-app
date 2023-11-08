'use client'
import * as React from 'react'
import { useState } from 'react'
import PostLayout from '@/layouts/PostLayout'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import PostList from '@/components/SearchResult/PostList'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

export default function Page() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [value, setValue] = useState(searchParams.get('f') ?? 'top')
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    const url = `/search?hashtag=${searchParams.get('hashtag') ?? ''}&f=${newValue}`
    router.push(url)
    setValue(newValue)
  }
  return (
    <PostLayout>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList
              onChange={handleChange}
              aria-label='lab API tabs example'
              variant='fullWidth'
              textColor='primary'
              indicatorColor='primary'
            >
              <Tab label='Top' value='top' sx={{ fontSize: '20px' }} />
              <Tab label='Latest' value='latest' sx={{ fontSize: '20px' }} />
              <Tab label='User' value='user' sx={{ fontSize: '20px' }} />
              <Tab label='Media' value='media' sx={{ fontSize: '20px' }} />
            </TabList>
          </Box>
          <TabPanel value='top'>Top list</TabPanel>
          <TabPanel value='latest'>
            <PostList />
          </TabPanel>
          <TabPanel value='user'>User list</TabPanel>
          <TabPanel value='media'>Media list</TabPanel>
        </TabContext>
      </Box>
    </PostLayout>
  )
}