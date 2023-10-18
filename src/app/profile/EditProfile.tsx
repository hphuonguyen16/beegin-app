// ModalComponent.tsx

import React, { useState, useEffect } from 'react'
import { Box, Typography, Modal, Button, Input, styled, Grid, TextField, Avatar } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import FileInput from './FileInput'
import Image from 'next/image'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'

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
  data: Object
}

const ModalComponent = (props: ModalProps) => {
  const { onClose, data, open } = props
  const [formValues, setFormValues] = useState({
    firstname: '',
    lastname: '',
    address: '',
    bio: '',
    background: '',
    avatar: '',
    gender: '',
    birthday: ''
  })
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
        birthday: data.birthday
      })
    }
  }, [data])
  // const [gender, setGender] = useState('male')
  // const handleChange = (event: any) => {
  //   setGender(event.target.value)
  // }
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormValues({
      ...formValues,
      [name]: value
    })
  }
  return (
    <Modal open={open} onClose={onClose} aria-labelledby='modal-title' aria-describedby='modal-description'>
      <Box sx={style} style={{ paddingBottom: '10px' }}>
        <Box style={{ width: '100%', height: '200px', borderRadius: '10px', background: '#d2cece' }}>
          <FileInput></FileInput>
        </Box>
        <Avatar
          src={data.avatar}
          sx={{ width: '100px', height: '100px', marginLeft: '25px', transform: 'translateY(-40px)' }}
        >
          <FileInput></FileInput>
        </Avatar>
        <Box marginTop={'-30px'}>
          <Grid container>
            <Grid item xs={12} md={6} marginTop={3} marginRight={5}>
              <TextField
                id='outlined-basic'
                label='First Name'
                variant='outlined'
                value={formValues.firstname}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={5} marginTop={3}>
              <TextField
                id='outlined-basic'
                label='Last Name'
                variant='outlined'
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
                value={formValues.address}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={5} marginTop={3}>
              <TextField id='outlined-basic' label='Phone Number' variant='outlined' />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} md={6} marginTop={3} marginRight={5}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label='Birthday' />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={5} marginTop={3}>
              <FormLabel id='demo-row-radio-buttons-group-label'>Gender</FormLabel>
              <RadioGroup
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                name='row-radio-buttons-group'
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
              onClick={onClose}
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
