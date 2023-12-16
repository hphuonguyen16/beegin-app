import React from 'react'
import { useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { Button, Badge, Popover, Typography, Box } from '@mui/material'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded'
import NotificationTab from './NotificationTab'
import { useNotifications } from '../../context/NotificationContext'
import UrlConfig from '@/config/urlConfig'
import { Notification } from '@/types/notification'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'

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
  const axiosPrivate = useAxiosPrivate()
  const { notifsState, notifsDispatch } = useNotifications()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  async function getNotifications() {
    try {
      const res = await axiosPrivate(UrlConfig.notifications.getNotifications)
      const data = res.data.data as Notification[]
      notifsDispatch({
        type: 'SET_NOTIFICATIONS',
        payload: {
          notifications: data,
          total: res.data.numUnread
        }
      })
    } catch (error) {
      console.error('Error fetching notifications:', error)
    }
  }

  useEffect(() => {
    getNotifications()
  }, [])

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover-notif' : undefined
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
          <Badge badgeContent={notifsState.total} color='error' overlap='circular'>
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
        sx={{
          '& .MuiPopover-paper': {
            '@media (-webkit-device-pixel-ratio: 1.25)': {
              left: '1300px !important'
            }
          }
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
