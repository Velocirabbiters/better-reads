import React from 'react';
import LibraryContainer from './LibraryContainer';
import Navigator from './Navigator';
import { Typography } from '@mui/material';
import SocialContainer from './SocialContainer';
import { useSelector, useDispatch } from 'react-redux';


function MainContainer() {

  const selected = useSelector(state => state.user.page);

  let page = <LibraryContainer />;

  if(selected === 'social'){
    page = <SocialContainer />;
  }

  return (
    <div>
      <Navigator/>
      {page}
    </div>
  );
}

export default MainContainer;