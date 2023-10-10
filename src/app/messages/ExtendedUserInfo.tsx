'use client'

import useResponsive from '@/hooks/useResponsive'
import { Grid, Box, Typography } from '@mui/material'
import AvatarCard from '@/components/common/AvatarCard'
import React, { useState } from 'react'

const ExtendedUserInfo = ({ width }: { width: string }) => {
    return <Box sx={{ position: "absolute", top: '50px', right: 0, width: width, backgroundColor: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <AvatarCard name={"test"} subtitle='active 5m ago' />
        <Typography>Function under development</Typography><Typography>Stay tuned</Typography>
    </Box>
}

export default ExtendedUserInfo;