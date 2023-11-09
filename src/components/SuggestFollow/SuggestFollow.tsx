import { Box, Typography, Stack } from '@mui/material'
import SuggestFollowCard from './SuggestFollowCard'

import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import UrlConfig from '@/config/urlConfig'
import { useEffect, useState } from 'react'

function SuggestFollow() {
  const axiosPrivate = useAxiosPrivate()
  const storedData = sessionStorage.getItem('myData')
  const [data, setData] = useState(storedData ? [JSON.parse(storedData)] : [])
  console.log(storedData)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosPrivate.get(UrlConfig.me.suggestFollow)
        const responseData = response.data.data
        sessionStorage.setItem('myData', JSON.stringify(responseData))
      } catch (error) {
        console.log(error)
      }
    }

    fetchPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [1])
  return (
    <Box>
      <Stack direction={'row'} sx={{ justifyContent: 'space-between', alignItems: 'center', margin: '10px 0' }}>
        <Typography variant='h4' sx={{ color: 'black' }}>
          Suggestions for you
        </Typography>
        <Typography
          color='secondary'
          sx={{
            fontWeight: 'bold',
            verticalAlign: 'middle',
            cursor: 'pointer'
          }}
          variant='h4'
        >
          Show more
        </Typography>
      </Stack>
      <Box sx={{ marginLeft: '-13px' }}>
        {data && data.length > 0 ? (
          data[0].map((item: any, index: number) => <SuggestFollowCard key={index} user={item} />)
        ) : (
          <Box></Box>
        )}
      </Box>
    </Box>
  )
}

export default SuggestFollow
