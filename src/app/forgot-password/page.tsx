/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'
// @mui
import { styled } from '@mui/material/styles'
import {
    Link,
    Container,
    Typography,
    Stack,
    Button,
    TextField,
    Checkbox,
    FormControlLabel,
    Box,
    CircularProgress
} from '@mui/material'
import { LogoDev } from '@mui/icons-material'

// hooks
import useResponsive from '@/hooks/useResponsive'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import { useRouter } from 'next/navigation'

// auth
import Cookies from 'js-cookie' // Import js-cookie

// components
import Image from 'next/image'

// assets
import LoginBanner from '@/assets/login_banner.jpg'
import { useAuth } from '@/context/AuthContext'
import urlConfig from '@/config/urlConfig'
import Snackbar from '@/components/common/Snackbar'
import useSnackbar from '@/context/snackbarContext'
import Loader from '@/components/common/Loader/Loader'
import { User } from '@/types/user'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'

//----------------------------------------------------------------

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
        borderRadius: 12
    },
    [theme.breakpoints.down('md')]: {
        height: '100vh'
    }
}))

const StyledBanner = styled('div')(({ theme }) => ({
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    backgroundColor: theme.palette.background.default
}))

const StyledContent = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        width: '80%',
        maxWidth: 420,
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: theme.spacing(10, 0)
    },
    [theme.breakpoints.down('md')]: {
        width: '85%',
        maxWidth: 420,
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: theme.spacing(10, 0),
        alignItems: 'center'
    }
}))

//----------------------------------------------------------------

export default function LoginPage() {
    const { setIsAuthenticated, setAccessToken, setUser } = useAuth()
    const pathname = usePathname()
    const isMobile = useResponsive('down', 'md')
    const router = useRouter()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isLoading, setIsLoading] = useState(true)
    const [isResetting, setIsResetting] = useState(false)
    const { setSnack } = useSnackbar()
    const axiosPrivate = useAxiosPrivate();
    const mdUp = useResponsive('up', 'md')

    React.useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 700)
    }, [])

    if (isLoading) {
        return <Loader />
    }

    const handleResetPw = async () => {
        setIsResetting(true)

        const result = await axiosPrivate.post(urlConfig.user.resetPassword, {
            email: email,
        });

        if (result) {
            // redirect to '/'
            router.push('/login')
        } else {
            setIsResetting(false)
            setSnack({ open: true, type: 'error', message: 'Reset password successfully! Check your email to retrieve your new password.' })
        }
    }

    return (
        <>
            <Snackbar />
            <title> Forgot Password | Beegin </title>
            <StyledRoot>
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
                                style={{ objectFit: 'cover', borderTopLeftRadius: 12, borderBottomLeftRadius: 12 }}
                                fill
                                src={LoginBanner}
                                alt='login'
                            />
                        </Box>
                    </StyledBanner>
                )}

                <Container
                    maxWidth='sm'
                    sx={{
                        backgroundColor: '#fff',
                        margin: 0,
                        minWidth: '50%',
                        width: 'auto',
                        height: '100%',
                        zIndex: 10,
                        borderTopRightRadius: '12px',
                        borderBottomRightRadius: '12px',
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <StyledContent>
                        <LogoDev fontSize='large' sx={{ color: (theme) => theme.palette.primary.main }}></LogoDev>
                        <Typography variant='h4' gutterBottom className='mt-8 mb-6'>
                            Sign in to Beegin
                        </Typography>
                        <Stack spacing={3} className='w-full'>
                            <TextField
                                name='email'
                                label='Email'
                                className='mt-6'
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                            />
                        </Stack>

                        <Button
                            size='large'
                            color='inherit'
                            variant='outlined'
                            disabled={isResetting ? true : false}
                            sx={{
                                background: isResetting
                                    ? //@ts-ignore
                                    (theme) => `${theme.palette.disabled}!important`
                                    : `linear-gradient(110deg, #f59df1 30%, #c474ed 60%, #c89df2 95%) !important`,
                                color: 'white !important',
                                width: '100%'
                            }}
                            onClick={() => {
                                handleResetPw()
                            }}
                        >
                            {isResetting ? (
                                <CircularProgress size={20} sx={{ color: (theme) => theme.palette.secondary.dark }} />
                            ) : (
                                'Reset Password'
                            )}
                        </Button>
                    </StyledContent>
                </Container>
            </StyledRoot>
        </>
    )
}
//}
