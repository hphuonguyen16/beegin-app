/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { Grid, Paper, Typography, Box, Stack, styled, Button, Avatar, Card } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import UrlConfig from '@/config/urlConfig'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useRouter } from 'next/navigation'
// hooks

import React, { useEffect, useState } from 'react'
import withAuth from '@/authorization/withAuth'

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
  const [data, setData] = useState<any[]>([])
  const router = useRouter()
  const handleProcessing = async (status: string, reportId: string) => {
    try {
      const currentDate = new Date()
      const updatedData = data.map((report) =>
        report._id === reportId
          ? {
              ...report,
              status,
              processingDate: currentDate.toISOString()
            }
          : report
      )
      setData(updatedData)
      await axiosPrivate.post(UrlConfig.admin.reportProcessing, { status, reportId })
    } catch (error) {
      console.log(error)
    }
  }
  const redirectToPosts = async (id: String) => {
    try {
      router.push(`/posts/${id}`)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get(UrlConfig.admin.getAllReports)
        setData(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])
  return (
    <div>
      <TableContainer component={Paper} style={{ marginRight: '15px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ textAlign: 'center' }}>Reporter</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Post</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Reason</TableCell>
              <TableCell style={{ textAlign: 'center' }}>CreatedAt</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Status</TableCell>
              <TableCell style={{ textAlign: 'center' }}>ProcessingDate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((report) => (
              <TableRow key={report._id}>
                <TableCell style={{ textAlign: 'center' }}>
                  {report.reporter.profile.firstname} {report.reporter.profile.lastname}
                </TableCell>
                <TableCell style={{ textAlign: 'center' }}>
                  <Button onClick={() => redirectToPosts(report.post)}>View detail</Button>
                </TableCell>
                <TableCell style={{ textAlign: 'center' }}>{report.reason}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>{new Date(report.createdAt).toLocaleDateString()}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>
                  {report.status === 'Processing' ? (
                    <>
                      <IconButton style={{ color: '#17c817' }} onClick={() => handleProcessing('Accepted', report._id)}>
                        <CheckCircleIcon />
                      </IconButton>
                      <IconButton style={{ color: 'red' }} onClick={() => handleProcessing('Rejected', report._id)}>
                        <CancelIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>{report.status}</>
                  )}
                </TableCell>
                <TableCell style={{ textAlign: 'center' }}>
                  {report.processingDate != null ? new Date(report.processingDate).toLocaleDateString() : ''}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default withAuth(page)(['admin'])
