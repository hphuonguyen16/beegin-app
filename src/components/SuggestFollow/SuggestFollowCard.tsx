import React from 'react'
import { Card, CardHeader, Avatar, Button } from '@mui/material'

export default function SuggestFollowCard(props: any) {
  const { name, username, avatar } = props.user
  const [follow, setFollow] = React.useState(false)
  const handleFollow = () => {
    setFollow((prev: boolean) => !prev)
  }
  return (
    <Card sx={{ position: 'relative', margin: '10px' }}>
      <CardHeader
        avatar={<Avatar src={avatar} />}
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
        sx={{ padding: '20px' }}
      />
    </Card>
  )
}
