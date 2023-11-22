import * as React from 'react'
import { Avatar, Card, Grid, Stack, Typography } from '@mui/material'
import searchProfile from '@/types/searchProfile'
import { last } from 'lodash'
import FollowSearchButton from '../ButtonFollow/FollowSearchButton'
import { useRouter } from 'next/navigation'

interface UserCardProps {
  profile: searchProfile
}
export default function UserCard({ profile }: UserCardProps) {
  const { id, avatar, firstname, lastname, user, bio } = profile
  const router = useRouter()
  const redirectToProfile = () => {
    if (user) {
      console.log(user)
      router.push(`/profile/${user}`)
    }
  }
  return (
    <Card>
      <Grid
        container
        spacing={0}
        sx={{
          '&:hover': {
            backgroundColor: '#f0f4f7',
            opacity: 1,
            cursor: 'pointer',
            '.usernameTypo': { color: 'primary.main' }
          }
        }}
        onClick={redirectToProfile}
      >
        <Grid sx={{ padding: '20px', minWidth: '60px' }} item xs={1}>
          <Avatar sx={{ width: '60px', height: '60px' }} src={avatar} />
        </Grid>
        <Grid sx={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }} item xs={11}>
          <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <Stack>
              <Typography
                className='usernameTypo'
                sx={{
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}
              >
                {firstname + ' ' + lastname}
              </Typography>
              <Typography>@{firstname + lastname}</Typography>
            </Stack>
            <FollowSearchButton userId={user} />
          </Stack>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid sx={{ padding: '0px 0px 20px 20px' }} item xs={9}>
          <Typography>{bio}</Typography>
        </Grid>
      </Grid>
    </Card>
  )
}
