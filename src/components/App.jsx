import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import LoginPage from './LoginPage';
import LibraryContainer from './LibraryContainer';

export default function App() {
  const loggedIn = useSelector(state => state.user.loggedIn);
  return (
    <div>
      <Typography
        sx={{
          boxShadow: 2,
          border: 2,
          color: 'black',
          borderColor: 'black',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'primary.main',
        }}
        variant='h5'
        component='h5'
        align='center'>
        Better Reads
      </Typography>
      <BrowserRouter>
        {loggedIn ? <LibraryContainer /> : <LoginPage />}
      </BrowserRouter>
    </div>
  );
}

const styles = {};
