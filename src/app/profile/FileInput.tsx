import { useState, useEffect } from 'react'
import { Box, Button } from '@mui/material'
import Image from 'next/image'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'

const FileInput = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage))
    }
  }, [selectedImage])

  const handleFileChange = (e: any) => {
    const file = e.target.files[0]
    setSelectedImage(file)
  }

  return (
    <>
      <input accept='image/*' type='file' id='select-image' style={{ display: 'none' }} onChange={handleFileChange} />
      <label htmlFor='select-image'>
        <Button
          variant='outlined'
          color='primary'
          component='span'
          style={{
            position: 'absolute',
            borderRadius: '50%',
            width: '40px',
            height: '55px',
            alignItems: 'center',
            margin: '20px 25px'
          }}
        >
          <AddAPhotoIcon fontSize='medium' />
        </Button>
      </label>
      {imageUrl && selectedImage && (
        <Box mt={2} textAlign='center'>
          <Image
            src={imageUrl}
            alt={selectedImage}
            width={100}
            height={200}
            style={{ width: '100%', height: '200px', borderRadius: '10px' }}
          />
        </Box>
      )}
    </>
  )
}

export default FileInput
