import React, { useState } from 'react'
import { CardHeader, Avatar, Box } from '@mui/material'
import ButtonFollow from '../../components/ButtonFollow/ButtonFollow'
import { useRouter } from 'next/navigation'

export default function CardUser(props: any) {
  const { firstname, lastname, avatar } = props.profile
  const router = useRouter()
  const redirectToProfile = (id: string) => {
    router.push(`/profile/${id}`)
  }

  const [isVisible, setIsVisible] = useState(true)
  // const sendDataToParent = (data: string) => {
  //   props.sendDataToParent(data)
  // }
  const handleDataFromChild = (data: string) => {
    if (data === 'unfollow') {
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
            onClick={() => redirectToProfile(props.userId)}
          />
        }
        title={firstname + ' ' + lastname}
        action={<ButtonFollow userId={props.userId} sendDataToParent={handleDataFromChild}></ButtonFollow>}
      />
    </Box>
  ) : null
}
