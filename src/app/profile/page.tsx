'use client'
import React from 'react';
import { Grid, Paper, Typography, Box, Stack, styled } from '@mui/material';
import Image from 'next/image';
import background from '@/assets/background1.jpg';
import avatar from '@/assets/tom.jpg';
import PeopleIcon from '@mui/icons-material/People';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
const StyledProfile = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  color: '#FFFFFF',
  overflow: 'auto',
  position: 'relative', 
}));

const Information = styled('div')(({ theme }) => ({
  width: '330px',
  height: '350px',
  borderRadius: '15px',
  backgroundColor: 'white',
  position: 'absolute', 
  top: '200px', 
  left: '35px', 
}));
const Posts = styled('div')(({ theme }) => ({
  width: '730px',
  height: '530px',
  borderRadius: '15px',
  backgroundColor: 'white',
  position: 'absolute', 
  top: '200px', 
  right: '35px', 
}));
const Friend = styled('div')(({ theme }) => ({
  width: '120px',
  height: '80px',
  borderRadius: '15px',
  backgroundColor: '#FEFAFA',
  position: 'absolute', 
  top: '600px',
  left: '35px', 
  border: '1px solid #D9D9D9'
}));
const Edit = styled('div')(({ theme }) => ({
  width: '120px',
  height: '80px',
  borderRadius: '15px',
  backgroundColor: '#FEFAFA',
  position: 'absolute',
  top: '600px', 
  left: '235px', 
  border: '1px solid #D9D9D9'

}));
function page() {
  return (
    <StyledProfile>
      <Image src={background} alt='background' style={{ width: '100%', height: '250px', borderRadius: '10px' }} />

      <Grid container spacing={2}>
        <Grid item xs={4} >
          <Paper >
            <Stack spacing={2} alignItems="center">
              <Box>
                  <Information>
                    <Stack spacing={2} alignItems="center" >
                      <Paper style={{backgroundColor:'white'}}>
                        <Image src={avatar} alt='avatar' style={{ width: '100px', height: '100px', borderRadius: '50%', marginTop:'25px' }} />
                      </Paper>
                      <Paper style={{backgroundColor:'white'}}><Typography variant='h4' >Tom Holland</Typography></Paper>
                      <Paper style={{backgroundColor:'white'}}><Typography variant='h6'  sx={{ fontWeight: 'light', marginTop: '0px',fontSize:'13px' }} ><LocationOnIcon fontSize="medium" />   United Kingdom</Typography></Paper>
                      <Paper style={{backgroundColor:'white'}}><Typography variant='h6'  sx={{ fontWeight: 'light', textAlign:'center',fontSize:'15px',fontFamily:'Inter',margin:'0 15px' }} >  “ Whoever is happy will make you happy too ”</Typography></Paper>
                      <Box style={{ backgroundColor: 'white',marginTop:'3px' }}>
                        <Grid container spacing={2}>
                          <Grid item xs={4} paddingRight='16px'>
                          <Stack spacing={2} >
                            <Typography variant='h4' sx={{ fontWeight: 'light', textAlign:'center',fontSize:'15px',fontFamily:'Inter' }}>Posts</Typography>
                            <Typography variant='h4' sx={{ fontWeight: 'medium', textAlign:'center',fontSize:'15px',fontFamily:'Inter' ,marginTop:'6px !important'}}>1.2K</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={4} paddingRight='16px' >
                          <Stack spacing={2} >
                            <Typography variant='h4' sx={{ fontWeight: 'light', textAlign:'center',fontSize:'15px',fontFamily:'Inter' }}>Follower</Typography>
                            <Typography variant='h4' sx={{ fontWeight: 'medium', textAlign:'center',fontSize:'15px',fontFamily:'Inter',marginTop:'6px !important' }}>5.8M</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={4} paddingRight='16px'>
                          <Stack spacing={2} >
                            <Typography variant='h4' sx={{ fontWeight: 'light', textAlign:'center',fontSize:'15px',fontFamily:'Inter' }}>Following</Typography>
                            <Typography variant='h4' sx={{ fontWeight: 'medium', textAlign:'center',fontSize:'15px',fontFamily:'Inter',marginTop:'6px !important' }}>1</Typography>
                            </Stack>
                        </Grid>
                        </Grid>
                      </Box>
                    </Stack>
                  </Information>
              </Box>
              <Box >
                <Grid container spacing={2} >
                  <Grid item xs={4}>
                    <Paper>
                      <Friend>
                        <Stack spacing={2} textAlign='center' alignItems='center' >
                            <PeopleIcon fontSize="medium" style={{marginTop:'10px'}}/>
                            <Typography variant='h4' sx={{ fontWeight: '200', textAlign:'center',fontSize:'16px',fontFamily:'Inria Sans',marginTop:'3px !important'}}>Friend</Typography>        
                          </Stack>
                      </Friend>
                    </Paper>
                    </Grid>
                  <Grid item xs={4}>
                    <Paper>
                      <Edit>
                         <Stack spacing={2} textAlign='center' alignItems='center' >
                            <ManageAccountsIcon fontSize="medium" style={{marginTop:'10px'}} />
                            <Typography variant='h4' sx={{ fontWeight: '200', textAlign:'center',fontSize:'16px',fontFamily:'Inria Sans',marginTop:'3px !important' }}>Edit Profile</Typography>        
                          </Stack>
                      </Edit>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper>
            <Posts></Posts>
          </Paper>
        </Grid>
      </Grid>
    </StyledProfile>
  );
}

export default page;
