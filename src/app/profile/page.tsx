'use client'
import React, { useState } from 'react'
import { Grid, Paper, Typography, Box, Stack, styled, Button, Modal } from '@mui/material'
import Image from 'next/image'
import background from '@/assets/background1.jpg'
import avatar from '@/assets/tom.jpg'
import PeopleIcon from '@mui/icons-material/People'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined'
import Friends from './Friends'
import EditProfile from './EditProfile'
import Post from '../../components/Posts/PostCard'
//component-style
const StyledProfile = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  color: '#FFFFFF',
  overflow: 'auto',
  position: 'relative'
}))

const Information = styled('div')(({ theme }) => ({
  height: '100%',
  borderRadius: '15px',
  backgroundColor: 'white',
  transform: 'translateY(-40px)'
}))
const Posts = styled('div')(({ theme }) => ({
  height: '730px',
  borderRadius: '15px',
  backgroundColor: 'white',
  transform: 'translateY(-40px)'
}))
const ButtonCustom = styled('div')(({ theme }) => ({
  width: '120px',
  height: '80px',
  borderRadius: '15px',
  backgroundColor: '#FEFAFA',
  border: '1px solid #D9D9D9',
  cursor: 'pointer'
}))
function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [action, setAction] = useState(true)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <StyledProfile>
      <Box>
        <Image src={background} alt='background' style={{ width: '100%', height: '250px', borderRadius: '10px' }} />
        <Button
          variant={'outlined'}
          sx={{
            padding: '10px 20px',
            width: '130px',
            borderRadius: '18px',
            top: '22%',
            position: 'absolute',
            right:'100px',
            backgroundColor: 'white !important'
          }}
          onClick={handleOpen}
        >
          Edit profile
        </Button>
        <EditProfile open={open} onClose={handleClose} data={'Tran Thanh Binh'}></EditProfile>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Stack spacing={2} alignItems='center'>
            <Box>
              <Information>
                <Stack spacing={2} alignItems='center'>
                  <Paper style={{ backgroundColor: 'white' }}>
                    <Image
                      src={avatar}
                      alt='avatar'
                      style={{ width: '100px', height: '100px', borderRadius: '50%', marginTop: '25px' }}
                    />
                  </Paper>
                  <Paper style={{ backgroundColor: 'white' }}>
                    <Typography variant='h4'>Tom Holland</Typography>
                  </Paper>
                  <Paper style={{ backgroundColor: 'white' }}>
                    <Typography variant='h6' sx={{ fontWeight: 'light', marginTop: '0px', fontSize: '13px' }}>
                      <LocationOnIcon fontSize='medium' /> United Kingdom
                    </Typography>
                  </Paper>
                  <Paper style={{ backgroundColor: 'white' }}>
                    <Typography
                      variant='h6'
                      sx={{
                        fontWeight: 'light',
                        textAlign: 'center',
                        fontSize: '15px',
                        fontFamily: 'Inter',
                        margin: '0 15px'
                      }}
                    >
                      {' '}
                      “ Whoever is happy will make you happy too ”
                    </Typography>
                  </Paper>
                  <Box style={{ backgroundColor: 'white', marginTop: '15px' }}>
                    <Grid container spacing={2}>
                      <Grid item xs={4} paddingRight='16px'>
                        <Stack spacing={2}>
                          <Typography
                            variant='h4'
                            sx={{ fontWeight: 'light', textAlign: 'center', fontSize: '15px', fontFamily: 'Inter' }}
                          >
                            Posts
                          </Typography>
                          <Typography
                            variant='h4'
                            sx={{
                              fontWeight: 'medium',
                              textAlign: 'center',
                              fontSize: '15px',
                              fontFamily: 'Inter',
                              marginTop: '6px !important'
                            }}
                          >
                            1.2K
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={4} paddingRight='16px'>
                        <Stack spacing={2} paddingBottom={2}>
                          <Typography
                            variant='h4'
                            sx={{ fontWeight: 'light', textAlign: 'center', fontSize: '15px', fontFamily: 'Inter' }}
                          >
                            Followers
                          </Typography>
                          <Typography
                            variant='h4'
                            sx={{
                              fontWeight: 'medium',
                              textAlign: 'center',
                              fontSize: '15px',
                              fontFamily: 'Inter',
                              marginTop: '6px !important'
                            }}
                          >
                            5.8M
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={4} paddingRight='16px'>
                        <Stack spacing={2}>
                          <Typography
                            variant='h4'
                            sx={{ fontWeight: 'light', textAlign: 'center', fontSize: '15px', fontFamily: 'Inter' }}
                          >
                            Following
                          </Typography>
                          <Typography
                            variant='h4'
                            sx={{
                              fontWeight: 'medium',
                              textAlign: 'center',
                              fontSize: '15px',
                              fontFamily: 'Inter',
                              marginTop: '6px !important'
                            }}
                          >
                            1
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Box>
                </Stack>
              </Information>
            </Box>
            <Box>
              <Grid container spacing={2} sx={{ marginBottom: '30px' }}>
                <Grid item xs={6}>
                  <ButtonCustom onClick={() => setAction(true)}>
                    <Stack spacing={2} textAlign='center' alignItems='center'>
                      <BoltOutlinedIcon color='primary' fontSize='medium' style={{ marginTop: '10px' }} />
                      <Typography
                        variant='h4'
                        sx={{
                          fontWeight: '200',
                          textAlign: 'center',
                          fontSize: '15px',
                          marginTop: '3px !important',
                          color:theme=>theme.palette.primary.main
                        }}
                      >
                        Activities
                      </Typography>
                    </Stack>
                  </ButtonCustom>
                </Grid>
                <Grid item xs={6}>
                  <ButtonCustom onClick={() => setAction(false)}>
                    <Stack spacing={2} textAlign='center' alignItems='center'>
                      <PeopleIcon color='primary' fontSize='medium' style={{ marginTop: '10px' }} />
                      <Typography
                        variant='h4'
                        sx={{
                          fontWeight: '200',
                          textAlign: 'center',
                          fontSize: '15px',
                          marginTop: '3px !important',
                          color:theme=>theme.palette.primary.main
                        }}
                      >
                        Socials
                      </Typography>
                    </Stack>
                  </ButtonCustom>
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper>
            <Posts>
              {action === true ? (
                <Box padding={3}>
                  <Post></Post>
                </Box>
              ) : (
                <Friends></Friends>
              )}
            </Posts>
          </Paper>
        </Grid>
      </Grid>
    </StyledProfile>
  )
}

export default page
