import React from 'react'
import { styled } from '@mui/material/styles'
import { Button, Badge, Popover, Typography, Box } from '@mui/material'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded'
import NotificationTab from './NotificationTab'

const StyledIconNotifBox = styled('div')(({ theme }) => ({
  width: '55px',
  height: '55px',
  borderRadius: '50%',
  backgroundColor: 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  border: `1px solid ${theme.palette.primary.light}`,
  '& svg': {
    fontSize: '28px',
    color: theme.palette.primary.light
  }
}))

const NotificationPopover = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  return (
    <div>
      <Button
        aria-describedby={id}
        sx={{
          borderRadius: '50%',
          // ...(open && { backgroundColor: (theme) => `${alpha(theme.palette.primary.main, 0.8)} !important`, }),
          transition: 'all 0.15s ease-in-out'
        }}
        onClick={handleClick}
      >
        <StyledIconNotifBox>
          <Badge badgeContent={4} color='error' overlap='circular'>
            <NotificationsRoundedIcon />
          </Badge>
        </StyledIconNotifBox>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <Typography variant={'h4'} sx={{ padding: '25px 0px 10px 15px', fontSize: '17px' }}>
          Notifications
        </Typography>
        <NotificationTab />
      </Popover>
    </div>
  )
}

export default NotificationPopover
