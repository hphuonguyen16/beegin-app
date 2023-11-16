import { Box, Typography, Stack } from '@mui/material'
import SuggestFollowCard from './SuggestFollowCard'

import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import UrlConfig from '@/config/urlConfig'
import { useEffect, useState } from 'react'

function SuggestFollow() {
  const axiosPrivate = useAxiosPrivate()
  const storedData = sessionStorage.getItem('myData')
  const [data, setData] = useState(storedData ? [JSON.parse(storedData)][0] : [])
  const storedData2 = sessionStorage.getItem('myData2')
  const [data2, setData2] = useState(storedData2 ? [JSON.parse(storedData2)][0] : [])
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosPrivate.get(UrlConfig.me.suggestFollow)
        const responseData = response.data.data
        sessionStorage.setItem('myData', JSON.stringify(responseData))
        setData(responseData)
        const responseData2 = response.data.data2
        sessionStorage.setItem('myData2', JSON.stringify(responseData2))
        setData2(responseData2)
      } catch (error) {
        console.log(error)
      }
    }

    fetchPosts()
  }, [])

  const handleShowMore = () => {
    setShowAll(!showAll)
  }
  const displayedData = showAll === true ? data : data.slice(0, 3)
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
          onClick={handleShowMore}
        >
          Show more
        </Typography>
      </Stack>
      <Box sx={{ marginLeft: '-13px' }}>
        {displayedData && displayedData.length > 0 ? (
          displayedData.map((item: any, index: number) => <SuggestFollowCard key={index} user={item} />)
        ) : (
          <Box></Box>
        )}
      </Box>
      <Box>
        <Typography variant='h5' sx={{ color: 'black' }}>
          Same interests
        </Typography>
        <Box sx={{ marginLeft: '-13px' }}>
          {data2 && data2.length > 0 ? (
            data2.map((item: any, index: number) => <SuggestFollowCard key={index} user={item} />)
          ) : (
            <Box></Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default SuggestFollow
