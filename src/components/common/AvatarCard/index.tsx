import useResponsive from '@/hooks/useResponsive'
import { Grid, Box, Stack, Typography, styled, Badge, Avatar } from '@mui/material'

const AvatarCard = ({ name, subtitle, avatar, vertical = false }: { name: string, subtitle: string, avatar: string, vertical: boolean }) => {
    const isMobile = useResponsive('down', 'sm')

    return <Stack direction={vertical? "column" :"row"} alignItems={"center"}>
        <Avatar
            sx={{ width: vertical ? '60px' : '45px', height: vertical ? '60px' : '45px', borderRadius: "50%" }}
            src={avatar}
        >
        </Avatar>
        <Stack sx={{ justifyContent: "center", paddingLeft: vertical ? '0' : '15px', alignItems: vertical ? "center" : "normal" }}>
            <Typography component="div" variant="h4" sx={{marginY: vertical ? "10px" : 0}}>
                {name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ lineHeight: 1, padding: vertical ? "0 20px" : 0, textAlign: vertical ? "center" : "initial" }}>
                {subtitle}
            </Typography>
        </Stack>
    </Stack>
}

export default AvatarCard;