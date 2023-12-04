/* eslint-disable react-hooks/exhaustive-deps */
// @mui
'use client';

import {
	Typography,
	Avatar,
	Box,
	MenuItem,
	ListItemIcon,
	ListItemText,
	Divider,
	IconButton,
	Button,
	Stack,
	Card,
	Paper,
	Slide,
	Menu,
} from "@mui/material";
import { LockResetOutlined, Logout, PersonOutline, SensorOccupiedOutlined, ArrowBackIosNew, GTranslate, AccountCircle, ArrowForwardIos } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded'

// hooks
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/navigation";

// utils
import { bgBlur } from "@/utils/cssStyles";
// import ImageEncode from "@/common/utils/ImageEncode";
import setLanguage from "next-translate/setLanguage";

// components
import Popover from "@/components/common/Popover";
import Link from "next/link";

// configs
import UrlConfig from "@/config/urlConfig";
import { useAuth } from "@/context/AuthContext";

//----------------------------------------------------------------

const StyledIconBox = styled('div')(({ theme }) => ({
	width: '55px',
	height: '55px',
	borderRadius: '50%',
	backgroundColor: theme.palette.primary.light,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	cursor: 'pointer', ":hover": { scale: "105%" },
	// border: "2px white solid",
	'& svg': {
		fontSize: '24px',
		color: 'white'
	},
	boxShadow: '-7px 10px 21px 1px rgba(204.44, 128.17, 240.32, 0.30)'
}))

const LANGS = [
	{
		value: "vi",
		label: "Vietnamese",
		icon: "/icons/ic_flag_vi.svg",
	},
	{
		value: "en",
		label: "English",
		icon: "/icons/ic_flag_en.svg",
	},
];

//----------------------------------------------------------------  

const ProfilePopover = () => {
	const { user } = useAuth();
	const router = useRouter()
	const [profileImage, setProfileImage] = useState<any>(null);

	const containerRef = useRef(null);
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event: any) => {
		console.log("ttt")
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	const signOutFn = () => {
		console.log("sign out")
		localStorage.clear();
		router.push('/login')
	}

	const { t, lang } = useTranslation();
	const currentLang = LANGS.find((x) => x.value === lang);

	const [parent, setParent] = useState(null);

	const handleSlideToChild = (parent: any) => () => {
		setParent(parent);
	};
	const handleSlideToParent = () => {
		setParent(null);
	};

	const handleLangClick = async (lang: any) => {
		// handleSlideToParent();
		await setLanguage(lang);
	};

	const underBreakPointsSm = true;

	return (
		<div>
			<Button sx={{
				borderRadius: '50%',
				// ...(open && { backgroundColor: (theme) => `${alpha(theme.palette.primary.main, 0.8)} !important`, }),
				transition: "all 0.15s ease-in-out",
			}} onClick={handleClick}>
				<StyledIconBox>
					<Person2RoundedIcon />
				</StyledIconBox>
			</Button>
			<Menu open={open} anchorEl={anchorEl} onClose={handleClose} sx={{ "& .MuiList-root": { height: parent ? "132px" : "235px", overflow: "hidden", transition: "0.2s all ease-in-out" } }}>
				<Paper
					sx={{ display: "flex", }}
					ref={containerRef}
				>
					<Slide
						direction="left"
						in={!!parent}
						appear={false}
						container={containerRef.current}
					>
						<Paper sx={{ position: "absolute", width: "100%" }}>
							<Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", marginLeft: "10px" }}>
								<IconButton
									onClick={handleSlideToParent}
									sx={{ display: "block", padding: "0 10px" }}
								>
									<ArrowBackIosNew sx={{ fontSize: " 15px" }} />
								</IconButton>
								<ListItemText>Language</ListItemText>
							</Box>
							<Stack sx={{ p: "8px" }}>
								{LANGS.map((option) => (
									<MenuItem key={option.value} selected={option.value === lang} onClick={() => handleLangClick(option.value)} sx={{ width: "100%", borderRadius: "6px", marginBottom: "6px" }}>
										<Box component="img" alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} />
										<ListItemText>{t("common:" + option.label)}</ListItemText>
									</MenuItem>
								))}
							</Stack>
						</Paper>
					</Slide>
					<Slide
						direction="right"
						in={!parent}
						appear={false}
						container={containerRef.current}
					>
						<Paper>
							<MenuItem sx={{ pointerEvents: "none", marginBottom: "8px", paddingTop: "15px" }}>
								<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "5px" }}>
									<Avatar src={user?.profile.avatar} alt="photoURL" />
									<Box sx={{ ml: 1.5 }}>
										<Typography variant="h5" sx={{ color: "text.primary", lineHeight: "1", marginRight: "10px" }}>
											{user?.profile.firstname + " " + user?.profile.lastname}
										</Typography>

										<Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
											{user?.profile.slug}
										</Typography>
									</Box>
								</Box>
							</MenuItem>

							<Divider sx={{ m: "0 !important" }} />

							<Stack sx={{ p: "8px" }}>
								<Link href="/profile">
									<MenuItem onClick={() => handleClose()} sx={{ width: "100%", borderRadius: "6px", marginBottom: "5px" }}>
										<ListItemIcon sx={{ alignItems: "center" }}>
											<AccountCircle fontSize="small" />
										</ListItemIcon>
										<ListItemText>{t("common:ManageProfile")}</ListItemText>
									</MenuItem>
								</Link>
								<MenuItem onClick={handleSlideToChild("language")} sx={{ width: "100%", borderRadius: "6px", marginBottom: "5px" }}>
									<ListItemIcon sx={{ alignItems: "center" }}>
										<GTranslate fontSize="small" />
									</ListItemIcon>
									<ListItemText>{t("common:Language")}</ListItemText>
									<ArrowForwardIos sx={{ fontSize: "13px" }} />
								</MenuItem>
								{/* <Link href="/identity/security_log">
									<MenuItem onClick={() => handleClose()} sx={{ width: "100%", borderRadius: "6px", marginBottom: "5px" }}>
										<ListItemIcon sx={{ alignItems: "center" }}>
											<LockResetOutlined fontSize="small" />
										</ListItemIcon>
										<ListItemText>{t("common:SecurityLogs")}</ListItemText>
									</MenuItem>
								</Link> */}
							</Stack>

							<Divider sx={{ m: "0px 0" }} />

							<Stack sx={{ p: "8px" }}>
								<MenuItem onClick={signOutFn} sx={{ width: "100%", borderRadius: "6px" }}>
									<ListItemIcon sx={{ color: "#FF4842" }}>
										<Logout fontSize="small" />
									</ListItemIcon>
									<ListItemText sx={{ "& span": { color: "#FF4842 !important" } }}>{t("common:SignOut")}</ListItemText>
								</MenuItem>
							</Stack>
						</Paper>
					</Slide>
				</Paper>
			</Menu>
		</div >
	);
};

export default ProfilePopover;
