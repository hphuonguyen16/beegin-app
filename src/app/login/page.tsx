/* eslint-disable @next/next/no-img-element */
'use client'

import React from "react";
// @mui
import { styled } from "@mui/material/styles";
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
} from "@mui/material";
import { LogoDev } from "@mui/icons-material";

// hooks
import useResponsive from "@/hooks/useResponsive";
import { useEffect, useState } from "react";
// import { useRouter } from "next/router";

// auth
import { signIn, useSession } from "next-auth/react";

// components
import Image from "next/image";

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
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: "12px",
    borderTopLeftRadius: BORDER_RADIUS,
    borderBottomLeftRadius: BORDER_RADIUS,
}));

const StyledForm = styled(Container)(({ theme }) => ({
    margin: 0,
    minWidth: "50%",
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
        justifyContent: "center",
        flexDirection: "column",
        padding: theme.spacing(10, 0),
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

//----------------------------------------------------------------

export default function LoginPage() {
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

    if (session) {
        // router.push("/");
    } else
        return (
            <>
                <title> Login | Beegin </title>
                <StyledRoot>
                    {/* {mdUp && ( */}
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
                    {/* )} */}

                    <StyledForm>
                        <StyledContent>
                            <LogoDev fontSize="large" sx={{ color: (theme) => theme.palette.primary.main }}></LogoDev>
                            <Typography variant="h4" gutterBottom className="mt-8 mb-6">
                                Sign in to Beegin
                            </Typography>
                            <Stack spacing={3} className="w-full">
                                <TextField
                                    name="username"
                                    label="Username"
                                    className="mt-6"
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                    }}
                                />

                                <TextField
                                    name="password"
                                    label="Password"
                                    type="password"
                                    className="mt-3"
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            login();
                                        }
                                    }}
                                />
                            </Stack>

                            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2, width: "100%" }}>
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
                                <Link variant="subtitle2" underline="hover">
                                    Forgot password?
                                </Link>
                            </Stack>
                            <Button
                                size="large"
                                color="inherit"
                                variant="outlined"
                                sx={{
                                    background: theme => `linear-gradient(110deg, #f59df1 30%, #c474ed 60%, #c89df2 95%) !important`,
                                    color: "white !important",
                                    width: "100%",
                                }}
                                onClick={login}>
                                Login
                            </Button>
                            <Typography variant="body2" sx={{ mt: 1, mb: 8, width: "100%" }} textAlign={"right"}>
                                Don’t have an account?
                                <Link variant="subtitle2">Get started</Link>
                            </Typography>
                        </StyledContent>
                    </StyledForm>
                </StyledRoot>
            </>
        );
}
