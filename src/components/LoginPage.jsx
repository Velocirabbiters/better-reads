import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
// import other components here

function LoginPage(props) {
  return (
    <div>
      <Routes id='loginContainer' style={styles.loginContainer}>
        <Route path='/' element={<LoginForm />} />
        <Route path='/signup' element={<SignupForm />} />
      </Routes>
    </div>
  );
}

const styles = {
  loginContainer: {
    display: 'flex',
    flexDirection: 'column',
    border: 'solid thin black',
    alignItems: 'center',
    minWidth: '240px',
    backgroundColor: 'red',
  },
};

export default LoginPage;
