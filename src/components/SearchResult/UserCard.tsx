import * as React from 'react'
import { Avatar, Card, CardContent, CardHeader, Grid, Stack, Typography } from '@mui/material'
import ButtonFollow from '../ButtonFollow/ButtonFollow'
import Profile from '@/types/profile'

interface UserCardProps {
  profile: Profile
}
export default function UserCard({ profile }: UserCardProps) {
  return (
    <Card>
      <Grid container spacing={0}>
        <Grid sx={{ padding: '20px' }} item xs={1}>
          <Avatar
            sx={{ width: '60px', height: '60px' }}
            src='https://pbs.twimg.com/profile_images/1690782755230220288/tRKXuCNd_400x400.jpg'
          />
        </Grid>
        <Grid sx={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }} item xs={11}>
          <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <Stack>
              <Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}>Pinky G</Typography>
              <Typography>@pinkyG_</Typography>
            </Stack>
            <ButtonFollow />
          </Stack>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid sx={{ padding: '0px 0px 20px 20px' }} item xs={11}>
          <Typography>Hello this is an message</Typography>
        </Grid>
      </Grid>
    </Card>
  )
}
