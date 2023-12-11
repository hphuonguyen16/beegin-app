'use client'
import withAuth from '@/authorization/withAuth'
import React from 'react'

const page = () => {
  return <div>page</div>
}

export default withAuth(page)(['admin'])
