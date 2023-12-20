/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'
// @mui
import { styled } from '@mui/material/styles'
import {
  Container,
  Typography,
  Stack,
  Button,
  Step,
  StepLabel,
  StepIcon,
  Box,
  Stepper,
  CircularProgress,
  IconButton
} from '@mui/material'
import { ArrowBack, LogoDev } from '@mui/icons-material'
import { LockPerson, PersonSearch, AddAPhoto, Check, Favorite } from '@mui/icons-material'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
import { StepIconProps } from '@mui/material/StepIcon'
import axios from 'axios'
import UrlConfig from '@/config/urlConfig'
import RegistrationComplete from './RegistrationSuccess'
import { GiTreeBeehive } from "react-icons/gi";
import { GiBeehive } from "react-icons/gi";

// hooks
import useResponsive from '@/hooks/useResponsive'
import { useEffect, useState } from 'react'

// auth
import { signIn, useSession } from 'next-auth/react'

// components
import Image from 'next/image'
import RegisterForms from './RegisterForms'

// assets
import Banner from '@/assets/register_option_banner.jpg'
import CustomSnackbar from '@/components/common/Snackbar'
import useSnackbar from '@/context/snackbarContext'
import { sassFalse } from 'sass'
import Link from 'next/link'
import logoMobile from '@/assets/logoMobile.png'
import { useRouter } from 'next/navigation'

//----------------------------------------------------------------

const BORDER_RADIUS = '16px'

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    width: '70%',
    height: '80%',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: theme.shadows[18],
    borderRadius: BORDER_RADIUS,
    background: theme.palette.background.paper,
  },
  [theme.breakpoints.down('md')]: {
    height: '100vh'
  }
}))

const StyledBanner = styled('div')(({ theme }) => ({
  width: '42%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: '12px',
  borderTopLeftRadius: BORDER_RADIUS,
  borderBottomLeftRadius: BORDER_RADIUS
}))

const StyledForm = styled(Container)(({ theme }) => ({
  margin: 0,
  minWidth: '58%',
  width: 'auto',
  height: '100%',
  zIndex: 10,
  borderRadius: BORDER_RADIUS,
  display: 'flex',
  justifyContent: 'center'
}))

const StyledContent = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    width: '65%',
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(14, 0)
  },
  [theme.breakpoints.down('md')]: {
    width: '95%',
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: theme.spacing(10, 0),
    alignItems: 'center',
    height: '100%'
  }
}))

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient( 95deg, #f59df1 0%, #c474ed 50%, #c89df2 100%)'
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient( 95deg, #f59df1 0%, #c474ed 50%, #c89df2 100%)'
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1
  }
}))

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean }
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: 'linear-gradient( 136deg, #f59df1 0%, #c474ed 50%, #c89df2 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
  }),
  ...(ownerState.completed && {
    backgroundImage: 'linear-gradient( 136deg, #f59df1 0%, #c474ed 50%, #c89df2 100%)'
  })
}))

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props

  const icons: { [index: string]: React.ReactElement } = {
    1: <LockPerson />,
    2: <PersonSearch />,
    3: <AddAPhoto />,
    4: <Favorite />
  }

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {completed ? <Check className='QontoStepIcon-completedIcon' /> : icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  )
}

const steps = ['Account credentials', 'Profile info', 'Profile picture', 'Preferred topics']

//----------------------------------------------------------------

export default function Register() {
  const [isPersonal, setIsPersonal] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const mdUp = useResponsive('up', 'md')
  const router = useRouter();

  function _handleNext() {
    if (isPersonal) {
      router.push('/register/personal');
    } else {
      router.push('/register/business');
    }
  }

  return (
    <>
      <title> Signup | Beegin </title>
      <StyledRoot>
        <StyledForm>
          <Link href="/login">
            <IconButton sx={{ position: 'absolute', left: "35px", top: "25px" }}>
              <ArrowBack></ArrowBack>
            </IconButton>
          </Link>
          <Link href="/login">
            <IconButton sx={{ position: 'absolute', left: "35px", top: "25px" }}>
              <ArrowBack></ArrowBack>
            </IconButton>
          </Link>
          <StyledContent>
            <Box>
              <Image src={logoMobile} alt='logo' width={38} style={{ margin: '0' }} />
              {/* <LogoDev fontSize='large' sx={{ color: (theme) => theme.palette.primary.main }}></LogoDev> */}
              <Typography variant='h4' gutterBottom className='mt-6 mb-3 text-2xl'>
                Choose your account type
              </Typography>
              <Typography variant='subtitle2' sx={{ fontSize: '13px' }}>Pick an account type based on your need. We offer a wealth experience regardless of the option you choose</Typography>
            </Box>

            <Box sx={{ marginY: '35px' }}>
              <Button variant={isPersonal ? 'contained' : 'outlined'} disabled={isPersonal} onClick={() => setIsPersonal(!isPersonal)}
                sx={{
                  width: '100%', margin: '10px 0', borderRadius: '12px',
                  "&:disabled": {
                    // border: '2px solid rgb(155 99 191 / 63%)', background: '#e7afe01f',
                    '& .MuiTypography-h5': {
                      color: theme => theme.palette.common.white
                    },
                    '& .MuiTypography-subtitle2': {
                      color: theme => theme.palette.grey[100]
                    }
                  }
                }}>
                <Stack direction={"row"} alignItems="center" justifyContent="start" sx={{ width: "100%" }}>
                  <Box sx={{
                    fontSize: "28px", background: theme => isPersonal ? theme.palette.common.white : theme.palette.secondary.main,
                    color: theme => isPersonal ? theme.palette.secondary.main : theme.palette.common.white,
                    padding: '10px 10px', margin: '10px 5px', borderRadius: '12px'
                  }}>
                    <GiTreeBeehive />
                  </Box>
                  <Box sx={{ marginLeft: '15px' }}>
                    <Typography variant='h5' sx={{ textAlign: 'left', lineHeight: 1.25, marginBottom: '5px' }}>Personal</Typography>
                    <Typography variant='subtitle2' sx={{ textTransform: 'initial' }}>Start interacting with your fellow bees</Typography>
                  </Box>
                </Stack>
              </Button>
              <Button variant={!isPersonal ? 'contained' : 'outlined'} disabled={!isPersonal} onClick={() => setIsPersonal(!isPersonal)}
                sx={{
                  width: '100%', margin: '10px 0', borderRadius: '12px',
                  "&:disabled": {
                    // border: '2px solid rgb(155 99 191 / 63%)', background: '#e7afe01f',
                    '& .MuiTypography-h5': {
                      color: theme => theme.palette.common.white
                    },
                    '& .MuiTypography-subtitle2': {
                      color: theme => theme.palette.grey[100]
                    }
                  }
                }}>
                <Stack direction={"row"} alignItems="center" justifyContent="start" sx={{ width: "100%" }}>
                <Box sx={{
                    fontSize: "28px", background: theme => !isPersonal ? theme.palette.common.white : theme.palette.secondary.main,
                    color: theme => !isPersonal ? theme.palette.secondary.main : theme.palette.common.white,
                    padding: '10px 10px', margin: '10px 5px', borderRadius: '12px'
                  }}>
                    <GiBeehive />
                  </Box>
                  <Box sx={{ marginLeft: '15px' }}>
                    <Typography variant='h5' sx={{ textAlign: 'left', lineHeight: 1.25, marginBottom: '5px' }}>Business</Typography>
                    <Typography variant='subtitle2' sx={{ textTransform: 'initial' }}>Further promote your business</Typography>
                  </Box>
                </Stack>
              </Button>
            </Box>


            <Stack direction={'row'} justifyContent={'start'} className='w-full'>
              <Button variant='contained' sx={{ padding: '8px 25px' }} onClick={_handleNext}>Next Step</Button>
            </Stack>
          </StyledContent>
        </StyledForm>

        {mdUp && (
          <StyledBanner>
            <Box
              sx={{
                width: '100%',
                height: '100%',
                position: 'relative'
              }}
            >
              <Image
                style={{ objectFit: 'cover', borderRadius: BORDER_RADIUS }}
                fill
                src={Banner}
                alt='signup'
              />
            </Box>
          </StyledBanner>
        )}
      </StyledRoot >
    </>
  )
}
