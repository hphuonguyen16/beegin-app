import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Grid, Typography, Box, Stack, CircularProgress } from '@mui/material'
import { useRouter } from 'next/navigation'
import TrendingCard from './TrendingCard'
import { TrendingHashtag } from '@/types/trendingHashtag'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { useQuery } from 'react-query'
import UrlConfig from '@/config/urlConfig'

interface TrendingListProps {
  count: number
  isFull: boolean
}
export default function TrendingList({ count = 5, isFull }: TrendingListProps) {
  // const [loading, setLoading] = useState<boolean>(true)
  // const [trendingHashtags, setTrendingHashtags] = useState<TrendingHashtag[]>([])
  const axios = useAxiosPrivate()
  const router = useRouter()
  const fetchData = async () => {
    try {
      const response = await axios.get(UrlConfig.trending.getTrendingHashtags(count))
      return response.data.data
    } catch (error) {}
  }
  const {
    data: trendingHashtags,
    error,
    isLoading,
    status
  } = useQuery<TrendingHashtag[]>('trendinghastags', fetchData, {
    staleTime: 1000 * 60 * 5
  })
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
        {isLoading ? (
          <CircularProgress color='primary' sx={{ alignSelf: 'center' }} />
        ) : (
          trendingHashtags?.map((item, index) => {
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
