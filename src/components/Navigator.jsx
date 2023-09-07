import React from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { navigatePageActionCreator } from '../features/userSlice';

function Navigator() {
  const dispatch = useDispatch();

  const navigate = (page) => {
    dispatch(navigatePageActionCreator(page))
  };

  return (
    <div align='center'>
      <br></br>
      <ButtonGroup variant="outlined">
        <Button onClick={() => {navigate('library')}}>Your Library</Button>
        <Button onClick={() => {navigate('social')}}>Your Followers</Button>
      </ButtonGroup>
    </div>
  );
}

export default Navigator;
