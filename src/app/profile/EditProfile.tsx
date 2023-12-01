'use client'
import React, { useState, useEffect } from 'react'
import { Box, Typography, Modal, Button, Input, styled, Grid, TextField, Avatar } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import EditBackground from './EditBackground'
import EditAvatar from './EditAvatar'
import dayjs, { Dayjs } from 'dayjs'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import UrlConfig from '@/config/urlConfig'

const style = {
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  maxWidth: '600px',
  height: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
  overflow: 'auto',
  position: 'relative'
}

interface ModalProps {
  open: boolean
  onClose: () => void
  data: {
    firstname: string
    lastname: string
    avatar: string
    birthday: Dayjs | null
    background: string
    address: string
    bio: string
    gender: boolean
    slug: string
  }
}

const ModalComponent = (props: ModalProps) => {
  const { onClose, data, open } = props
  const [cropper, setCropper] = useState<any>()
  const axiosPrivate = useAxiosPrivate()
  const [formValues, setFormValues] = useState({
    firstname: '',
    lastname: '',
    address: '',
    bio: '',
    background: '',
    avatar: '',
    gender: false,
    slug: '',
    birthday: dayjs(new Date()) as Dayjs | null
  })

  const editBackground = (imageUrl: string) => {
    setFormValues({ ...formValues, background: imageUrl })
    console.log('background', formValues.avatar)
  }
  const editAvatar = (imageUrl: string) => {
    setFormValues({ ...formValues, avatar: imageUrl })
    console.log('avatar', formValues.avatar)
  }
  useEffect(() => {
    if (data) {
      setFormValues({
        firstname: data.firstname,
        lastname: data.lastname,
        address: data.address,
        bio: data.bio,
        background: data.background,
        avatar: data.avatar,
        gender: data.gender,
        birthday: dayjs(data.birthday),
        slug: data.slug
      })
    }
  }, [data])
  const updateProfile = async () => {
    try {
      const url = UrlConfig.me.updateProfile
      const updatedData = {
        ...formValues
      }
      await axiosPrivate.patch(url, updatedData)
    } catch (err) {
      console.error('API Error:', err)
    }
  }
  const handleInputChange = (event: any) => {
    const { name, value } = event.target
    setFormValues({
      ...formValues,
      [name]: value
    })
  }
  return (
    <Modal open={open} onClose={onClose} aria-labelledby='modal-title' aria-describedby='modal-description'>
      <Box sx={style} style={{ paddingBottom: '10px' }}>
        <Box
          style={{
            width: '100%',
            height: '200px',
            borderRadius: '10px',
            background: `url(${formValues.background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <EditBackground editBackground={editBackground} />
        </Box>
        <Box
          style={{
            width: '150px',
            height: '150px',
            marginLeft: '25px',
            transform: 'translateY(-70px)',
            borderRadius: '50%',
            background: `url(${formValues.avatar ? formValues.avatar : ''})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
           <EditAvatar editAvatar={editAvatar} />
        </Box>
        <Box marginTop={'-30px'}>
          <Grid container>
            <Grid item xs={12} md={6} marginTop={3} marginRight={5}>
              <TextField
                id='outlined-basic'
                label='First Name'
                variant='outlined'
                name='firstname'
                value={formValues.firstname}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={5} marginTop={3}>
              <TextField
                id='outlined-basic'
                label='Last Name'
                variant='outlined'
                name='lastname'
                value={formValues.lastname}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} md={6} marginTop={3} marginRight={5}>
              <TextField
                id='outlined-basic'
                label='Location'
                variant='outlined'
                name='address'
                value={formValues.address}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={5} marginTop={3}>
              <TextField
                id='outlined-basic'
                label='Slug'
                name='slug'
                variant='outlined'
                value={formValues.slug}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} md={6} marginTop={3} marginRight={5}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label='Birthday'
                  value={formValues.birthday}
                  onChange={(newValue) => setFormValues({ ...formValues, birthday: newValue })}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={5} marginTop={3}>
              <FormLabel id='demo-row-radio-buttons-group-label'>Gender</FormLabel>
              <RadioGroup
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                name='gender'
                value={formValues.gender}
                onChange={handleInputChange}
              >
                <FormControlLabel value='true' control={<Radio />} label='Male' />
                <FormControlLabel value='false' control={<Radio />} label='Female' />
              </RadioGroup>
            </Grid>
          </Grid>
          <Box marginTop={3}>
            <TextField
              id='outlined-multiline-static'
              label='Bio'
              multiline
              rows={4}
              style={{ width: '100%' }}
              value={formValues.bio}
              name='bio'
              onChange={handleInputChange}
            />
          </Box>
        </Box>
        <Grid container marginTop={0}>
          <Grid item xs={12} md={6}>
            <Button
              variant={'outlined'}
              sx={{
                margin: '20px auto',
                width: '100px',
                display: 'flex',
                backgroundColor: 'white !important',
                boxShadow: 'none'
              }}
              onClick={onClose}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              variant={'outlined'}
              sx={{
                margin: '20px auto',
                width: '100px',
                display: 'flex',
                backgroundColor: '#E078D8 !important',
                color: 'white',
                border: 'none'
              }}
              onClick={() => {
                onClose()
                updateProfile()
              }}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}

export default ModalComponent
