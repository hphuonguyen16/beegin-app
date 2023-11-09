import React, { useState } from 'react'
import { Card, CardHeader, Avatar, Button, Box } from '@mui/material'
import ButtonFollow from '../ButtonFollow/ButtonFollow'
import { useRouter } from 'next/navigation'

export default function SuggestFollowCard(props: any) {
  const { firstname, lastname, avatar } = props.user.user.profile
  const { count } = props.user
  const router = useRouter()
  const redirectToProfile = (id: string) => {
    router.push(`/profile/${id}`)
  }
  const [isVisible, setIsVisible] = useState(true)

  const handleDataFromChild = (data: string) => {
    if (data === 'follow') {
      setIsVisible(false)
    }
  }
  return isVisible ? (
    <Box sx={{ position: 'relative', padding: '0 !important', width: '100%' }}>
      <CardHeader
        sx={{ padding: '20px' }}
        avatar={
          <Avatar
            src={avatar}
            sx={{ width: '60px', height: '60px', marginRight: '10px', cursor: 'pointer' }}
            onClick={() => redirectToProfile(props.user.user._id)}
          />
        }
        title={firstname + ' ' + lastname}
        subheader={`${count} mutual following`}
        action={<ButtonFollow userId={props.user.user._id} sendDataToParent={handleDataFromChild}></ButtonFollow>}
      />
    </Box>
  ) : null
}
