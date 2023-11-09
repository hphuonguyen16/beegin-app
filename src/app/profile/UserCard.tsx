import React, { useEffect, useState } from 'react'
import { CardHeader, Avatar, Box, Card } from '@mui/material'
import ButtonFollow from '../../components/ButtonFollow/ButtonFollow'
import { useRouter } from 'next/navigation'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import UrlConfig from '@/config/urlConfig'

export default function CardUser(props: any) {
  const { firstname, lastname, avatar } = props.profile
  const router = useRouter()
  const axiosPrivate = useAxiosPrivate()
  const [checkId, setCheck] = useState<boolean>()
  const redirectToProfile = (id: string) => {
    if (checkId) {
      router.push(`/profile`)
    } else {
      router.push(`/profile/${id}`)
    }
  }

  const [isVisible, setIsVisible] = useState(true)
  // const sendDataToParent = (data: string) => {
  //   props.sendDataToParent(data)
  // }
  const handleDataFromChild = (data: string) => {
    if (data === 'unfollow') {
      setIsVisible(false)
    }
  }
  useEffect(() => {
    const checkId = async () => {
      try {
        const response = await axiosPrivate.get(UrlConfig.me.checkId(props.userId))
        setCheck(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    checkId()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [1])

  return isVisible ? (
    <Card
      sx={{ position: 'relative', padding: '0 !important', width: '80%', boxShadow: '2px', cursor: 'pointer' }}
      onClick={() => redirectToProfile(props.userId)}
    >
      <CardHeader
        sx={{
          padding: '20px',
          '&:hover': {
            color: '#9747FF',
            fontWeight: 'bold'
          }
        }}
        avatar={<Avatar src={avatar} sx={{ width: '60px', height: '60px', marginRight: '10px' }} />}
        title={firstname + ' ' + lastname}
        subheader={`@username`}
        // action={<ButtonFollow userId={props.userId} sendDataToParent={handleDataFromChild}></ButtonFollow>}
      />
    </Card>
  ) : null
}
