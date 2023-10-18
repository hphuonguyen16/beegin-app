'use client'

import { FormGroup, Stack, TextField, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useState } from 'react'
import { Register } from '@/types/register'

interface RegisterFormsProps {
  step: number
  formValues: Register
  formErrors: Register
  setFormValues: (formValues: Register) => void
  setFormErrors: (formErrors: Register) => void
}

const RegisterForms = ({ step, formValues, setFormValues, formErrors, setFormErrors }: RegisterFormsProps) => {
  const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFormValues({
      ...formValues,
      [name]: value
    })
    setFormErrors({
      ...formErrors,
      [name]: value.length > 0 ? true : false
    })
  }

  return (
    <form>
      <FormGroup sx={{ display: step === 0 ? '' : 'none' }}>
        <Stack spacing={3} className='w-full px-5'>
          <TextField
            error={!formErrors.email}
            id='email'
            name='email'
            label='Email'
            value={formValues.email}
            helperText={!formErrors.email && 'Please fill in your email'}
            onChange={handleTextFieldChange}
          />
          <TextField
            error={!formErrors.password}
            id='password'
            name='password'
            type='password'
            label='Password'
            value={formValues.password}
            helperText={!formErrors.password && 'Please fill in your password'}
            onChange={handleTextFieldChange}
          />
          <TextField
            error={!formErrors.passwordConfirm}
            id='password'
            name='passwordConfirm'
            type='password'
            label='Confirm Password'
            value={formValues.passwordConfirm}
            helperText={!formErrors.passwordConfirm && 'Please confirm your password'}
            onChange={handleTextFieldChange}
          />
        </Stack>
      </FormGroup>
      <FormGroup sx={{ display: step === 1 ? '' : 'none' }}>
        <Stack spacing={3} className='w-full px-5'>
          <Stack direction='row' spacing={3}>
            <TextField
              error={!formErrors.firstname}
              id='firstname'
              name='firstname'
              label='First Name'
              value={formValues.firstname}
              helperText={!formErrors.firstname && 'Please fill in your first name'}
              onChange={handleTextFieldChange}
            />
            <TextField
              error={!formErrors.lastname}
              id='lastname'
              name='lastname'
              label='Last Name'
              value={formValues.lastname}
              helperText={!formErrors.lastname && 'Please fill in your last name'}
              onChange={handleTextFieldChange}
            />
          </Stack>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Age</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={formValues.gender === true ? 1 : 0}
              label='Age'
              onChange={(e) => setFormValues({ ...formValues, gender: e.target.value === 1 ? true : false })}
            >
              <MenuItem value={1}>Male</MenuItem>
              <MenuItem value={0}>Female</MenuItem>
            </Select>
          </FormControl>
          <TextField
            error={!formErrors.address}
            id='address'
            name='address'
            type='address'
            label='Address'
            value={formValues.address}
            helperText={!formErrors.address && 'Please fill in your address'}
            onChange={handleTextFieldChange}
          />
          <TextField
            error={!formErrors.bio}
            id='bio'
            name='bio'
            type='bio'
            label='Bio'
            value={formValues.bio}
            helperText={!formErrors.bio && 'Please fill in your bio'}
            onChange={handleTextFieldChange}
          />
        </Stack>
      </FormGroup>
      <FormGroup sx={{ display: step === 2 ? '' : 'none' }}></FormGroup>
    </form>
  )
}

export default RegisterForms
