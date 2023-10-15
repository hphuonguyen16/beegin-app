'use client'

import { FormGroup, Stack, TextField, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useState } from 'react'
import { Register } from '@/types/register'

interface RegisterFormsProps {
  step: number
  formValues: Register
  setFormValues: (formValues: Register) => void
}

const RegisterForms = ({ step, formValues, setFormValues }: RegisterFormsProps) => {
  console.log(formValues)

  const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  return (
    <form>
      <FormGroup sx={{ display: step === 0 ? '' : 'none' }}>
        <Stack spacing={3} className='w-full px-5'>
          <TextField id='email' name='email' label='Email' value={formValues.email} onChange={handleTextFieldChange} />
          <TextField
            id='password'
            name='password'
            type='password'
            label='Password'
            value={formValues.password}
            onChange={handleTextFieldChange}
          />
          <TextField
            id='password'
            name='passwordConfirm'
            type='password'
            label='Confirm Password'
            value={formValues.passwordConfirm}
            onChange={handleTextFieldChange}
          />
        </Stack>
      </FormGroup>
      <FormGroup sx={{ display: step === 1 ? '' : 'none' }}>
        <Stack spacing={3} className='w-full px-5'>
          <Stack direction='row' spacing={3}>
            <TextField
              id='firstname'
              name='firstname'
              label='First Name'
              value={formValues.firstname}
              onChange={handleTextFieldChange}
            />
            <TextField
              id='lastname'
              name='lastname'
              label='Last Name'
              value={formValues.lastname}
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
            id='address'
            name='address'
            type='address'
            label='Address'
            value={formValues.address}
            onChange={handleTextFieldChange}
          />
          <TextField
            id='bio'
            name='bio'
            type='bio'
            label='Bio'
            value={formValues.bio}
            onChange={handleTextFieldChange}
          />
        </Stack>
      </FormGroup>
      <FormGroup sx={{ display: step === 2 ? '' : 'none' }}></FormGroup>
    </form>
  )
}

export default RegisterForms
