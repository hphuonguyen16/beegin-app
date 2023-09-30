import { Grid, Typography, Box, Stack } from '@mui/material'
import TrendingCard from './TrendingCard'

//temp data
const trendingItems = [
  {
    id: 1,
    des: 'Trending in VietNam',
    trend: '#Zalo',
    postCount: '20,2K'
  },
  {
    id: 2,
    des: 'Trending in Music',
    trend: '#Kpop',
    postCount: '12M'
  },
  {
    id: 1,
    des: 'Trending in VietNam',
    trend: '#Lisa',
    postCount: '14K'
  }
]
export default function TrendingList() {
  return (
    <Grid
      sx={{
        maxHeight: '100%',
        overflow: 'auto',
        backgroundColor: 'transparent',
        padding: '0 20px',
        borderRadius: '10px'
      }}
    >
      <Typography variant='h3' sx={{ paddingBottom: '10px', color: 'black' }}>
        Trends for you
      </Typography>
      <Stack spacing={1}>
        {trendingItems.map((item) => (
          <TrendingCard key={item.id} item={item} />
        ))}
        <TrendingCard item={trendingItems[0]} />
        <TrendingCard item={trendingItems[0]} />
        <TrendingCard item={trendingItems[0]} />
        <TrendingCard item={trendingItems[0]} />
        <TrendingCard item={trendingItems[0]} />
        <TrendingCard item={trendingItems[0]} />
      </Stack>
      <Typography
        color='primary'
        sx={{
          fontWeight: 'bold',
          verticalAlign: 'middle',
          fontSize: '18px',
          marginTop: '10px',
          cursor: 'pointer'
        }}
      >
        Show more
      </Typography>
    </Grid>
  )
}
