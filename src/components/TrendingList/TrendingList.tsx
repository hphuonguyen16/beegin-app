import { Grid, Typography, Box, Stack } from '@mui/material'
import TrendingCard from './TrendingCard'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { useEffect, useState } from 'react'
import UrlConfig from '@/config/urlConfig'
import { TrendingHashtag } from '@/types/trendingHashtag'
import { axiosPrivate } from '@/axios'
import { InsertEmoticon } from '@mui/icons-material'

interface HashTagListProps {
  trendingHashtags: TrendingHashtag[]
}
export default function TrendingList({ trendingHashtags }: HashTagListProps) {
  // const [trendingHashtags, setTrendingHashtags] = useState<TrendingHashtag[]>([])
  // const axios = useAxiosPrivate()

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(UrlConfig.trending.getTrendingHashtags)
  //       setTrendingHashtags(response.data.data)
  //     } catch (error) {}
  //   }
  //   fetchData()
  //   console.log(trendingHashtags)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])
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
        {trendingHashtags.map((item) => (
          <TrendingCard key={item._id} trend={item} />
        ))}
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
