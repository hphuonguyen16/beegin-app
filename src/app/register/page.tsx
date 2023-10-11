/* eslint-disable @next/next/no-img-element */
'use client'

import React from "react";
// @mui
import { styled } from "@mui/material/styles";
import {
    Container,
    Typography,
    Stack,
    Button, Step, StepLabel, StepIcon,
    Box,
    Stepper,
    CircularProgress,
} from "@mui/material";
import { LogoDev } from "@mui/icons-material";
import { LockPerson, PersonSearch, AddAPhoto, Check } from '@mui/icons-material'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';

// hooks
import useResponsive from "@/hooks/useResponsive";
import { useEffect, useState } from "react";

// auth
import { signIn, useSession } from "next-auth/react";

// components
import Image from "next/image";
import RegisterForms from "./RegisterForms";

// assets
import LoginBanner from '@/assets/login_banner.jpg'


//----------------------------------------------------------------

const BORDER_RADIUS = "16px";

const StyledRoot = styled("div")(({ theme }) => ({
    [theme.breakpoints.up("md")]: {
        display: "flex",
        width: "70vw",
        height: "80vh",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        boxShadow: theme.shadows[18],
        borderRadius: BORDER_RADIUS,
        background: theme.palette.background.paper,
    },
    [theme.breakpoints.down("md")]: {
        height: "100vh",
    },
}));

const StyledBanner = styled("div")(({ theme }) => ({
    width: "30%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: "12px",
    borderTopLeftRadius: BORDER_RADIUS,
    borderBottomLeftRadius: BORDER_RADIUS,
}));

const StyledForm = styled(Container)(({ theme }) => ({
    margin: 0,
    minWidth: "70%",
    width: "auto",
    height: "100%",
    zIndex: 10,
    borderRadius: BORDER_RADIUS,
    display: "flex",
    justifyContent: "center",
}));


const StyledContent = styled("div")(({ theme }) => ({
    [theme.breakpoints.up("md")]: {
        width: "80%",
        maxWidth: 420,
        margin: "auto",
        display: "flex",
        height: "100%",
        justifyContent: "space-between",
        flexDirection: "column",
        padding: theme.spacing(8, 0),
    },
    [theme.breakpoints.down("md")]: {
        width: "85%",
        maxWidth: 420,
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        padding: theme.spacing(10, 0),
        alignItems: "center",
    },
}));

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg, #f59df1 0%, #c474ed 50%, #c89df2 100%)',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg, #f59df1 0%, #c474ed 50%, #c89df2 100%)',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderRadius: 1,
    },
}));

const ColorlibStepIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean };
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
        backgroundImage:
            'linear-gradient( 136deg, #f59df1 0%, #c474ed 50%, #c89df2 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundImage:
            'linear-gradient( 136deg, #f59df1 0%, #c474ed 50%, #c89df2 100%)',
    }),
}));

function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    const icons: { [index: string]: React.ReactElement } = {
        1: <LockPerson />,
        2: <PersonSearch />,
        3: <AddAPhoto />,
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {completed ? (
                <Check className="QontoStepIcon-completedIcon" />
            ) : (
                icons[String(props.icon)]
            )}
        </ColorlibStepIconRoot>

    );
}

const steps = ['Account credentials', 'Profile info', 'Profile picture'];

//----------------------------------------------------------------

export default function Register() {

    let redirectUrl = "";
    useEffect(() => {
        const url = new URL(location.href);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        redirectUrl = url.searchParams.get("callbackUrl") || "";
    }, []);
    const { data: session } = useSession();
    // const router = useRouter();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const login = async () => {
        const res = await signIn("credentials", {
            userNameOrEmailAddress: username,
            password: password,
            redirect: true,
            callbackUrl: redirectUrl,
        });
    };
    const mdUp = useResponsive("up", "md");

    const [activeStep, setActiveStep] = useState(0);
    const isLastStep = activeStep === steps.length - 1;

    function _sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function _submitForm(values: any, actions: any) {
        await _sleep(1000);
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);

        setActiveStep(activeStep + 1);
    }

    function _handleSubmit() {
        if (isLastStep) {
            // _submitForm(values, actions);
        } else {
            setActiveStep(activeStep + 1);
            // actions.setTouched({});
            // actions.setSubmitting(false);
        }
    }

    function _handleBack() {
        setActiveStep(activeStep - 1);
    }

    if (session) {
        // router.push("/");
    } else
        return (
            <>
                <title> Login | Beegin </title>
                <StyledRoot>
                    <StyledForm>
                        <StyledContent>
                            <Box>
                                <LogoDev fontSize="large" sx={{ color: (theme) => theme.palette.primary.main }}></LogoDev>
                                <Typography variant="h4" gutterBottom className="mt-6 mb-6">
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

                            <RegisterForms step={activeStep} />

                            <Stack direction={"row"} justifyContent={"space-between"}>
                                {activeStep !== 0 ? (
                                    <Button onClick={_handleBack} >
                                        Back
                                    </Button>
                                ) : (<Box></Box>)}
                                <div>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        onClick={_handleSubmit}
                                    >
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
                                    width: "100%",
                                    height: "100%",
                                    position: "relative",
                                }}>
                                <Image
                                    style={{ objectFit: "cover", borderRadius: BORDER_RADIUS, }}
                                    fill
                                    src={LoginBanner}
                                    alt="login"
                                />
                            </Box>
                        </StyledBanner>
                    )}
                </StyledRoot>
            </>
        );
}
