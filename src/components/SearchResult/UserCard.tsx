import * as React from 'react'
import { Avatar, Card, CardContent, CardHeader, Grid, Stack, Typography } from '@mui/material'
import ButtonFollow from '../ButtonFollow/ButtonFollow'
import searchProfile from '@/types/searchProfile'
import { last } from 'lodash'
import FollowSearchButton from '../ButtonFollow/FollowSearchButton'

interface UserCardProps {
  profile: searchProfile
}
export default function UserCard({ profile }: UserCardProps) {
  const { id, avatar, firstname, lastname, user, bio } = profile
  return (
    <Card>
      <Grid container spacing={0}>
        <Grid sx={{ padding: '20px', minWidth: '60px' }} item xs={1}>
          <Avatar sx={{ width: '60px', height: '60px' }} src={avatar} />
        </Grid>
        <Grid sx={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }} item xs={11}>
          <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <Stack>
              <Typography
                sx={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  '&:hover': {
                    color: 'primary.main',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }
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
