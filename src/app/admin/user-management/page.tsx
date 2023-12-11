/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Typography,
  TextField,
  InputAdornment,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import UrlConfig from '@/config/urlConfig'
import React, { useEffect, useState } from 'react'
import withAuth from '@/authorization/withAuth'

function page() {
  const axiosPrivate = useAxiosPrivate()
  const [page, setPage] = useState(1)
  const [data, setData] = useState<any[]>([])
  const handleDeleteUser = async (userId: string) => {
    try {
      // Implement the logic to delete a user
      // Example: await axiosPrivate.delete(`/api/v1/users/${userId}`);
    } catch (error) {
      console.log(error)
    }
  }
  const [selectedRole, setSelectedRole] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const filteredData = data.filter((user: any) => {
    const firstname = user.profile?.firstname || ''
    const lastname = user.profile?.lastname || ''
    const email = user.email || ''

    const lowerCaseSearchTerm = searchTerm.toLowerCase()

    return (
      firstname.toLowerCase().includes(lowerCaseSearchTerm) ||
      lastname.toLowerCase().includes(lowerCaseSearchTerm) ||
      email.toLowerCase().includes(lowerCaseSearchTerm)
    )
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params: {
          fields: string
          sort: string
          limit: number
          page: number
          role?: string // Make role property optional
        } = {
          fields: 'email,role',
          sort: 'createAt',
          limit: 8,
          page: page
        }
        if (selectedRole !== '') {
          params.role = selectedRole
        }

        const response = await axiosPrivate.get(UrlConfig.admin.getAllUsers, { params })
        setData(response.data.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [page, selectedRole])

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1)
  }

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1))
  }
  const handleRoleChange = (event: any) => {
    setSelectedRole(event.target.value as string)
  }
  return (
    <div style={{ height: '100%', overflowY: 'auto' }}>
      <Grid container spacing={2} xs={12} sx={{ marginLeft: '20px' }}>
        <Grid item xs={4}>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            id='outlined-basic'
            label='Search'
            variant='outlined'
            sx={{ width: '80%', margin: '20px 30px', background: 'white' }}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl style={{ marginBottom: '15px', marginTop: '20px', minWidth: 120, background: 'white' }}>
            <InputLabel id='role-label'>Filter</InputLabel>
            <Select labelId='role-label' id='role-select' value={selectedRole} onChange={(e) => handleRoleChange(e)}>
              <MenuItem value=''>All</MenuItem>
              <MenuItem value='user'>User</MenuItem>
              <MenuItem value='admin'>Admin</MenuItem>
              <MenuItem value='business'>Business</MenuItem>

              {/* Add more roles as needed */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>

      <TableContainer component={Paper} style={{ marginRight: '15px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ textAlign: 'center' }}>First Name</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Last Name</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Email</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Role</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(filteredData) &&
              filteredData.map((user) => (
                <TableRow key={user._id}>
                  <TableCell style={{ textAlign: 'center' }}>{user.profile?.firstname || '-'}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{user.profile?.lastname || '-'}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{user.email}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{user.role}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    <Button variant='outlined' onClick={() => handleDeleteUser(user._id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
        <IconButton style={{ color: 'gray', marginRight: '15px' }} onClick={() => handlePrevPage()}>
          <ArrowBackIosIcon />
        </IconButton>
        <Typography
          variant='h4'
          sx={{
            fontWeight: '100',
            textAlign: 'center',
            fontSize: '20px',
            marginTop: '20px !important',
            marginBottom: '20px'
          }}
        >
          {page}
        </Typography>
        <IconButton style={{ color: 'gray', marginLeft: '15px' }} onClick={() => handleNextPage()}>
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default withAuth(page)(['admin'])
