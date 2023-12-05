/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { Grid, Paper, Typography, Box, Stack, styled, Button, Avatar, Card } from '@mui/material'
import Image from 'next/image'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import UrlConfig from '@/config/urlConfig'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
// hooks

import React, { useEffect, useState } from 'react'

//component-style
const StyledProfile = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  color: '#FFFFFF',
  overflow: 'auto',
  position: 'relative'
}))

const BoxStyle = styled(Card)(({ theme }) => ({
  width: '240px',
  height: '200px',
  borderRadius: '15px',
  backgroundColor: 'white'
}))
function page() {
  const axiosPrivate = useAxiosPrivate()
  return (
    <div>
    </div>
  )
}

export default page
