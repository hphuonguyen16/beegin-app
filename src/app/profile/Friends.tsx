'use client'
import React, { useState } from 'react'
import { Grid, Paper, Typography, Box, Stack, styled } from '@mui/material'
import Image from 'next/image'
import background from '@/assets/background1.jpg'
import avatar from '@/assets/tom.jpg'
import PeopleIcon from '@mui/icons-material/People'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined'
import SuggestFollow from '@/components/SuggestFollow/SuggestFollow'
import SuggestFollowCard from '@/components/SuggestFollow/SuggestFollowCard'
const suggested_follow_list = [
  {
    name: 'Arthur Shelby',
    username: 'arthurshelby1',
    avatar: 'https://pbs.twimg.com/profile_images/1498070100393754625/C2V-fbll_400x400.jpg'
  },
  {
    name: 'Donald J. Trump',
    username: 'realDonaldTrump',
    avatar: 'https://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_400x400.jpg'
  },
  {
    name: 'Eva Fox',
    username: 'EvaFoxU',
    avatar: 'https://pbs.twimg.com/profile_images/1699898466959347712/WS3HVOtW_400x400.jpg'
  }
]
function Friends() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [buttonFollow, setButtonFollow] = useState(true)
  return (
    <Stack>
      <Grid container spacing={2} margin={'0'}>
        <Grid
          item
          xs={6}
          style={{
            backgroundColor: buttonFollow === true ? '#ffd9fc' : 'white',
            color: buttonFollow === true ? '#9747FF' : 'black',
            paddingBottom: '15px',
            borderTopLeftRadius: '10px'
          }}
        >
          <Typography
            variant='h4'
            sx={{
              fontWeight: '200',
              textAlign: 'center',
              fontSize: '16px',
              cursor: 'pointer'
            }}
            onClick={() => setButtonFollow(true)}
          >
            Following
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          style={{
            backgroundColor: buttonFollow === false ? '#ffd9fc' : 'white',
            color: buttonFollow === false ? '#9747FF' : 'black',
            paddingBottom: '15px'
          }}
        >
          <Typography
            variant='h4'
            sx={{
              fontWeight: '200',
              textAlign: 'center',
              fontSize: '16px',
              cursor: 'pointer'
            }}
            onClick={() => setButtonFollow(false)}
          >
            Follower
          </Typography>
        </Grid>
      </Grid>
      <Box>
        {buttonFollow === true
          ? suggested_follow_list.map((user, index) => <SuggestFollowCard key={index} user={user} />)
          : suggested_follow_list.map((user, index) => <SuggestFollowCard key={index} user={user} />)}
      </Box>
    </Stack>
  )
}
export default Friends
