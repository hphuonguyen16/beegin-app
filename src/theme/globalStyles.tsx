// @mui
import { GlobalStyles as MUIGlobalStyles } from '@mui/material'
import React from 'react'

// ----------------------------------------------------------------------

export default function GlobalStyles() {
  const inputGlobalStyles = (
    <MUIGlobalStyles
      styles={{
        '*': {
          boxSizing: 'border-box',
          '&::-webkit-scrollbar': {
            width: '10px',
            backgroundColor: 'transparent'
          },
          '&::-webkit-scrollbar-track': {
            webkitBoxShow: ' inset 0 0 6px rgba(0,0,0,0.3)',
            backgroundColor: 'transparent'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#E7C6FF',
            border: '2px solid #E7C6FF',
            borderRadius: '5px'
          }
        },
        html: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
          WebkitOverflowScrolling: 'touch'
        },
        body: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%'
        },
        '#root': {
          width: '100%',
          height: '100%'
        },
        input: {
          '&[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button': {
              margin: 0,
              WebkitAppearance: 'none'
            },
            '&::-webkit-inner-spin-button': {
              margin: 0,
              WebkitAppearance: 'none'
            }
          }
        },

        img: {
          display: 'block',
          maxWidth: '100%'
        },
        ul: {
          margin: 0,
          padding: 0
        }
      }}
    />
  )

  return inputGlobalStyles
}
