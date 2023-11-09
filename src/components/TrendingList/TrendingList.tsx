import { Grid, Typography, Box, Stack } from '@mui/material'
import TrendingCard from './TrendingCard'
import { TrendingHashtag } from '@/types/trendingHashtag'
import Link from 'next/link'
interface HashTagListProps {
  trendingHashtags: TrendingHashtag[]
}
export default function TrendingList({ trendingHashtags }: HashTagListProps) {
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
        {trendingHashtags.map((item) => {
          const href = `/search?hashtag=${item.hashtag.name.substring(1)}&f=top`
          return (
            <Link key={item._id} href={href}>
              <TrendingCard trend={item} />
            </Link>
          )
        })}
      </Stack>
      <Typography
        color='primary'
        sx={{
          fontWeight: 'bold',
          verticalAlign: 'middle',
          fontSize: '18px',
          cursor: 'pointer',
          margin: '20px 0'
        }}
      >
        Show more
      </Typography>
    </Grid>
  )
}
