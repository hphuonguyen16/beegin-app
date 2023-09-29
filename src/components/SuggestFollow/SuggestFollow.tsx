import { Box, Typography } from '@mui/material'
import SuggestFollowCard from './SuggestFollowCard'

//temp data
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
function SuggestFollow() {
  return (
    <Box>
      <Typography variant='h3' sx={{ paddingBottom: '10px', color: 'black' }}>
        Suggestions for you
      </Typography>

      {suggested_follow_list.map((user, index) => (
        <SuggestFollowCard key={index} user={user} />
      ))}

      <Typography
        color='primary'
        sx={{
          fontWeight: 'bold',
          verticalAlign: 'middle',
          fontSize: '18px',
          margin: '10px',
          cursor: 'pointer'
        }}
      >
        Show more
      </Typography>
    </Box>
  )
}

export default SuggestFollow
