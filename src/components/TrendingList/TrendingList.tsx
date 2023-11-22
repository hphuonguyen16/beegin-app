import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Grid, Typography, Box, Stack, CircularProgress } from '@mui/material'
import { useRouter } from 'next/navigation'

import TrendingCard from './TrendingCard'
import { TrendingHashtag } from '@/types/trendingHashtag'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import UrlConfig from '@/config/urlConfig'

interface TrendingListProps {
  count: number
  isFull: boolean
}
export default function TrendingList({ count = 5, isFull }: TrendingListProps) {
  const [loading, setLoading] = useState<boolean>(true)
  const [trendingHashtags, setTrendingHashtags] = useState<TrendingHashtag[]>([])
  const axios = useAxiosPrivate()
  const router = useRouter()
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axios.get(UrlConfig.trending.getTrendingHashtags(count))
        setTrendingHashtags(response.data.data)
        console.log(response.data.data)
        setLoading(false)
      } catch (error) {}
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleShowMore = () => {
    router.push('/trends')
  }
  return (
    <Grid
      sx={{
        // maxHeight: '100%',
        // overflow: 'auto',
        backgroundColor: 'transparent',
        padding: '0 0 30px 0',
        borderRadius: '10px'
      }}
    >
      <Typography variant='h3' sx={{ paddingBottom: '10px', color: 'black' }}>
        Trends for you
      </Typography>

      <Stack spacing={1} sx={{ marginBottom: '30px' }}>
        {loading ? (
          <CircularProgress color='primary' sx={{ alignSelf: 'center' }} />
        ) : (
          trendingHashtags.map((item, index) => {
            const href = `/search?q=${encodeURIComponent(item.hashtag.name)}&f=top`
            return (
              <Link key={index} href={href}>
                <TrendingCard key={index} trend={item} />
              </Link>
            )
          })
        )}
      </Stack>
      {!isFull && (
        <Typography
          onClick={handleShowMore}
          color='primary'
          sx={{
            fontWeight: 'bold',
            verticalAlign: 'middle',
            fontSize: '18px',
            cursor: 'pointer',
            margin: '0 0 20px 0'
          }}
        >
          Show more
        </Typography>
      )}
    </Grid>
  )
}
