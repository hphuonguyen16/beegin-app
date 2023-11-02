import React from 'react'
import { CardHeader, Avatar, Box } from '@mui/material'
import ButtonFollow from '../../components/ButtonFollow/ButtonFollow'
import { useRouter } from 'next/navigation'

export default function CardUser(props: any) {
  const { firstname, lastname, avatar } = props.profile
  const router = useRouter()
  const redirectToProfile = (id: string) => {
    router.push(`/profile/${id}`)
  }
  return (
    <Box
      sx={{ position: 'relative', padding: '0 !important', width: '100%', cursor: 'pointer' }}
      onClick={() => redirectToProfile(props.userId)}
    >
      <CardHeader
        sx={{ padding: '20px' }}
        avatar={<Avatar src={avatar} sx={{ width: '60px', height: '60px', marginRight: '10px' }} />}
        title={firstname + ' ' + lastname}
        // subheader={`@${username}`}
        action={<ButtonFollow userId={props.userId}></ButtonFollow>}
      />
    </Box>
  )
}
