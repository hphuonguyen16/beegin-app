import useResponsive from '@/hooks/useResponsive'
import { Grid, Box, Stack, Typography, styled, Badge, Avatar } from '@mui/material'

const AvatarCard = ({ name, subtitle }: { name: string, subtitle: string }) => {
    const isMobile = useResponsive('down', 'sm')

    return <Avatar
        sx={{ width: isMobile ? '45px' : '60px', height: isMobile ? '45px' : '60px', borderRadius: "50%" }}
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwXgjGKE09VrSaXebUnIUdPwDUvD003fJ-6zfbJIlPE4-it8WwGpaAzWTdUZOz1iiMT4g&usqp=CAU'
    >
    </Avatar>
}

export default AvatarCard;