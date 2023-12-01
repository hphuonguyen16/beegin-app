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
  CircularProgress
} from '@mui/material'
import { LogoDev } from '@mui/icons-material'
import { LockPerson, PersonSearch, AddAPhoto, Check } from '@mui/icons-material'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
import { StepIconProps } from '@mui/material/StepIcon'
import { Register } from '@/types/register'
import axios from 'axios'
import UrlConfig from '@/config/urlConfig'
import RegistrationComplete from './RegistrationSuccess'

// hooks
import useResponsive from '@/hooks/useResponsive'
import { useEffect, useState } from 'react'

// auth
import { signIn, useSession } from 'next-auth/react'

// components
import Image from 'next/image'
import RegisterForms from './RegisterForms'

// assets
import SignupBanner from '@/assets/signup_banner.jpg'
import CustomSnackbar from '@/components/common/Snackbar'
import useSnackbar from '@/context/snackbarContext'
import { sassFalse } from 'sass'

//----------------------------------------------------------------

const BORDER_RADIUS = '16px'

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    width: '70vw',
    height: '80vh',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: theme.shadows[18],
    borderRadius: BORDER_RADIUS,
    background: theme.palette.background.paper
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
    width: '80%',
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    height: '100%',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: theme.spacing(6, 0)
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
    3: <AddAPhoto />
  }

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {completed ? <Check className='QontoStepIcon-completedIcon' /> : icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  )
}

const steps = ['Account credentials', 'Profile info', 'Profile picture']

//----------------------------------------------------------------

export default function Register() {
  let redirectUrl = ''
  const [cropper, setCropper] = useState<any>()
  const getCropData = async () => {
    if (cropper) {
      const file = await fetch(cropper.getCroppedCanvas().toDataURL())
        .then((res) => res.blob())
        .then((blob) => {
          return new File([blob], 'avatar.png', { type: 'image/png' })
        })
      if (file) {
        const formData = new FormData()
        formData.append('file', file)
        // formData.append('public_id', 'testttt@gmail.com1');
        formData.append('upload_preset', `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`)
        return await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData
          }
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.secure_url !== '') {
              const uploadedFileUrl = data.secure_url
              return uploadedFileUrl
            }
          })
          .catch((err) => console.error(err))
      }
    }
  }
  const [formValues, setFormValues] = useState<Register>({
    email: '',
    password: '',
    passwordConfirm: '',
    firstname: '',
    lastname: '',
    slug: '@',
    gender: true
  })
  console.log(formValues)
  const [formErrors, setFormErrors] = useState<Register>({
    email: true,
    password: true,
    passwordConfirm: true,
    firstname: true,
    lastname: true,
    address: true,
    bio: true,
    gender: true,
    slug: true
  })
  const [success, setSuccess] = useState<boolean>(false)
  const { setSnack } = useSnackbar()
  // useEffect(() => {
  //   const url = new URL(location.href)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   redirectUrl = url.searchParams.get('callbackUrl') || ''
  // }, [])
  const { data: session } = useSession()
  // const router = useRouter();

  const checkFormValues = (fields: (keyof Register)[]) => {
    let values = { ...formValues }
    let errors = { ...formErrors }
    let hasError = false
    fields.forEach((field) => {
      if (values[field] === '') {
        errors[field] = false
        hasError = true
      } else {
        errors[field] = true
      }
    })
    setFormErrors(errors)
    return hasError
  }

  const handleSubmit = async () => {
    var avatar = await getCropData()
    axios
      .post(UrlConfig.user.signup, { ...formValues, avatar: avatar })
      .then((res: any) => {
        setSuccess(true)
      })
      .catch((err: any) => {
        setSnack({
          open: true,
          message: err.response.data.message,
          type: 'error'
        })
      })
  }
  const mdUp = useResponsive('up', 'md')

  const [activeStep, setActiveStep] = useState(2)
  const isLastStep = activeStep === steps.length - 1

  function _sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  async function _submitForm(values: any, actions: any) {
    await _sleep(1000)
    alert(JSON.stringify(values, null, 2))
    actions.setSubmitting(false)

    setActiveStep(activeStep + 1)
  }

  function _handleSubmit() {
    if (isLastStep) {
      // _submitForm(values, actions);
      // var avatar = ;
      handleSubmit()
    } else if (activeStep === 0) {
      const hasError = checkFormValues(['email', 'password', 'passwordConfirm'])
      if (!hasError) {
        setActiveStep(activeStep + 1)
      }
    } else if (activeStep === 1) {
      const hasError = checkFormValues(['firstname', 'lastname', 'address', 'bio'])
      if (!hasError) {
        setActiveStep(activeStep + 1)
      }
    }
  }

  function _handleBack() {
    setActiveStep(activeStep - 1)
  }

  if (session) {
    // router.push("/");
  } else
    return (
      <>
        <CustomSnackbar />
        <title> Signup | Beegin </title>
        {!success ? (
          <StyledRoot>
            <StyledForm>
              <StyledContent>
                <Box>
                  <LogoDev fontSize='large' sx={{ color: (theme) => theme.palette.primary.main }}></LogoDev>
                  <Typography variant='h4' gutterBottom className='mt-6 mb-6'>
                    Create a new account
                  </Typography>

                  <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>

                <RegisterForms
                  step={activeStep}
                  formValues={formValues}
                  setFormValues={setFormValues}
                  setCropper={setCropper}
                  formErrors={formErrors}
                  setFormErrors={setFormErrors}
                />

                <Stack direction={'row'} justifyContent={'space-between'} className='w-full'>
                  {activeStep !== 0 ? <Button onClick={_handleBack}>Back</Button> : <Box></Box>}
                  <div>
                    <Button type='submit' variant='contained' color='primary' onClick={_handleSubmit}>
                      {isLastStep ? 'Register' : 'Next'}
                    </Button>
                    {/* {1 && (
                                        <CircularProgress
                                            size={24}
                                        />
                                    )} */}
                  </div>
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
                    src={SignupBanner}
                    alt='signup'
                  />
                </Box>
              </StyledBanner>
            )}
          </StyledRoot>
        ) : (
          <RegistrationComplete />
        )}
      </>
    )
}
