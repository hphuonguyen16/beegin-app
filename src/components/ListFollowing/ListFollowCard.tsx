import React from 'react'
import { Card, CardHeader, Avatar, Button, Box } from '@mui/material'

export default function ListFollowCard(props: any) {
  console.log(props)
  const { name, username, avatar } = props.user
  const [follow, setFollow] = React.useState(false)
  const handleFollow = () => {
    setFollow((prev: boolean) => !prev)
  }
  return (
    <Box sx={{ position: 'relative', padding: '0 !important', width: '100%' }}>
      <CardHeader
        sx={{ padding: '20px' }}
        avatar={<Avatar src={avatar} sx={{ width: '60px', height: '60px', marginRight: '10px' }} />}
        title={name}
        subheader={`@${username}`}
        action={
          <Button
            onClick={handleFollow}
            variant={follow ? 'outlined' : 'contained'}
            sx={{
              padding: '10px 20px',
              width: '100px',
              borderRadius: '18px',
              top: '50%',
              position: 'absolute',
              transform: 'translate(-100%, -50%)'
            }}
          >
            {follow ? 'Following' : 'Follow'}
          </Button>
        }
      />
    </Box>
  )
}
