import * as React from 'react'
import { useState, useEffect } from 'react'
import PostCard from '@/components/Posts/PostCard'
import { Post } from '@/types/post'
import { Box, CircularProgress, Skeleton, Stack } from '@mui/material'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import UrlConfig from '@/config/urlConfig'
import { ParsedUrlQuery } from 'querystring'
import { useSearchParams } from 'next/navigation'
import UserCard from './UserCard'
import SearchProfile from '@/types/searchProfile'
import NotFound from './NotFound'

interface UserListProps {
  f: string
}
function UserList({ f }: UserListProps) {
  const [profiles, setProfiles] = useState<SearchProfile[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const axios = useAxiosPrivate()
  const searchParams = useSearchParams()
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        if (searchParams.get('q') !== null) {
          setLoading(true)
          const q = searchParams.get('q') ?? ''
          const response = await axios.get(UrlConfig.search.searchUsers(encodeURIComponent(q)))
          console.log(response.data)
          setLoading(false)
          setProfiles(response.data.data)
        }
      } catch (error) {}
    }

    fetchProfiles()
  }, [searchParams])
  return (
    <Stack spacing={1}>
      {loading ? (
        <CircularProgress color='primary' sx={{ alignSelf: 'center' }} />
      ) : profiles.length > 0 ? (
        profiles.map((profile, index) => <UserCard key={index} profile={profile} />)
      ) : (
        <NotFound q={searchParams.get('q')} />
      )}
    </Stack>
  )
}

export default UserList
