/* eslint-disable react-hooks/exhaustive-deps */
// @mui
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
} from "@mui/material";
import { LockResetOutlined, Logout, PersonOutline, SensorOccupiedOutlined } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded'

// hooks
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import useTranslation from "next-translate/useTranslation";

// utils
import { bgBlur } from "@/utils/cssStyles";
// import ImageEncode from "@/common/utils/ImageEncode";

// components
import Popover from "@/components/common/Popover";
import Link from "next/link";

// configs
import UrlConfig from "@/config/urlConfig";

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

//----------------------------------------------------------------  

const ProfilePopover = () => {
	const { t } = useTranslation();
	const { data: session } = useSession();
	const router = useRouter()
	const [profileImage, setProfileImage] = useState(null);

	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		console.log("ttt")
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;
	// async function getUserImage() {
	// 	const response = await fetch(UrlConfig.profile.myAvatar + `/${session?.user.id}`, {
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 			Authorization: `Bearer ${session?.user?.access_token}`,
	// 		},
	// 	}).then((response) => response.arrayBuffer());
	// 	return ImageEncode(response);
	// }
	// useEffect(() => {
	// 	getUserImage().then((data) => {
	// 		setProfileImage(data);
	// 	});
	// }, []);

	const signOutFn = () => {
		console.log("sign out")
		localStorage.clear();
		router.push('/login')
	}

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
			<Popover open={open} anchorEl={anchorEl} onClose={handleClose} minWidth={210}>
				<MenuItem sx={{ pointerEvents: "none", marginBottom: "8px", paddingTop: "15px" }}>
					<Avatar src={profileImage} alt="photoURL" />
					<Box sx={{ ml: 1.5 }}>
						<Typography variant="h5" sx={{ color: "text.primary", lineHeight: "1" }}>
							{session?.user.userInfo.userName}
						</Typography>

						<Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
							{session?.user.userInfo.email}
						</Typography>
					</Box>
				</MenuItem>

				<Divider sx={{ m: "0 !important" }} />

				<Stack sx={{ p: "8px" }}>
					<Link href="/account/manageProfile">
						<MenuItem onClick={() => handleClose()} sx={{ width: "100%", borderRadius: "6px" }}>
							<ListItemIcon sx={{ alignItems: "center" }}>
								<PersonOutline fontSize="small" />
							</ListItemIcon>
							<ListItemText>{t("common:ManageProfile")}</ListItemText>
						</MenuItem>
					</Link>
					<Link href="/">
						<MenuItem onClick={() => handleClose()} sx={{ width: "100%", borderRadius: "6px" }}>
							<ListItemIcon sx={{ alignItems: "center" }}>
								<SensorOccupiedOutlined fontSize="small" />
							</ListItemIcon>
							{/* <ListItemText>{t("common:MyLinkUsers")}</ListItemText> */}
						</MenuItem>
					</Link>
					<Link href="/identity/security_log">
						<MenuItem onClick={() => handleClose()} sx={{ width: "100%", borderRadius: "6px" }}>
							<ListItemIcon sx={{ alignItems: "center" }}>
								<LockResetOutlined fontSize="small" />
							</ListItemIcon>
							{/* <ListItemText>{t("common:SecurityLogs")}</ListItemText> */}
						</MenuItem>
					</Link>
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
			</Popover>
		</div>
	);
};

export default ProfilePopover;
