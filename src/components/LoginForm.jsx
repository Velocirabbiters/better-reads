import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Stack, Button, TextField } from '@mui/material';
import { loginUser, reload } from '../features/userSlice';
// import other components here

function LoginForm(props) {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const failedLogin = useSelector(state => state.user.failedLogin);
  const dispatch = useDispatch();

  dispatch(reload);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(
      loginUser({
        username,
        password,
      }),
    );
  };

  return (
    <div style={styles.h3} className='LoginSignup'>
      <Stack style={styles.h3}>
        <h2>Login</h2>
        <span style={styles.error}>
          {failedLogin ? 'incorrect username or password' : ''}
        </span>
        <form onSubmit={handleSubmit} style={styles.form}>
          <TextField
            required
            size='small'
            id='username'
            label='Username'
            placeholder='Username'
            autoComplete='current-username'
            value={username}
            variant='filled'
            onChange={e => setUsername(e.target.value)}
          />
          <TextField
            required
            size='small'
            id='password'
            type='password'
            placeholder='Password'
            label='Password'
            autoComplete='current-password'
            variant='filled'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            variant='outlined'
            size='small'
            id='login'
            className='auth-button'
            type='submit'>
            Log in
          </Button>
        </form>
        <p>
          Don't have an account? <Link to='/signup'>Sign Up!</Link>
        </p>
      </Stack>
    </div>
  );
}

const styles = {
  loginContainer: {
    display: 'flex',
    flexDirection: 'column',
    border: 'solid thin black',
    alignItems: 'center',
    width: '30%',
    minWidth: '240px',
    maxWidth: '350px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    border: 'solid thin black',
    alignItems: 'center',
    width: '100%%',
    margin: '20px 10px 100px 10px',
  },
  h3: {
    display: 'flex',
    flexDirection: 'column',
    border: 'solid thin black',
    alignItems: 'center',
    width: '100%%',
  },
  error: {
    color: 'red',
    fontSize: 'small',
    position: 'absolute',
    alignSelf: 'center',
    testWrap: 'wrap',
  },
};

export default LoginForm;
