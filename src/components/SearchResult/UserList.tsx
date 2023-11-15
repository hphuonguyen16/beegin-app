import * as React from 'react'
import { useState, useEffect } from 'react'
import PostCard from '@/components/Posts/PostCard'
import { Post } from '@/types/post'
import { Box, Stack } from '@mui/material'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import UrlConfig from '@/config/urlConfig'
import { ParsedUrlQuery } from 'querystring'
import { useSearchParams } from 'next/navigation'
import UserCard from './UserCard'
import SearchProfile from '@/types/searchProfile'

interface UserListProps {
  f: string
}
function UserList({ f }: UserListProps) {
  const [profiles, setProfiles] = useState<SearchProfile[]>([])
  const axios = useAxiosPrivate()
  const searchParams = useSearchParams()
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        if (searchParams.get('q') !== null) {
          const q = searchParams.get('q') ?? ''
          const response = await axios.get(UrlConfig.search.searchUsers(encodeURIComponent(q)))
          setProfiles(response.data.data)
        }
      } catch (error) {}
    }

    fetchProfiles()
  }, [searchParams])
  return (
    <Stack spacing={1}>
      {profiles.map((profile, index) => (
        <UserCard key={index} profile={profile} />
      ))}
    </Stack>
  )
}

export default UserList
