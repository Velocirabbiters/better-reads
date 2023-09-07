import React from 'react';
import LibraryDashboard from './LibraryDashboard';
import AddBookForm from './AddBookForm';
import UpdateBookForm from './UpdateBookForm';
import { useSelector, useDispatch } from 'react-redux';

function LibraryContainer() {
  const isUpdating = useSelector(state => state.user.isUpdating);

  return (
    <div className='matchTableContainer'>
      <div className='outerBox'>
        <AddBookForm />
        {isUpdating ? <UpdateBookForm /> : <div/>}
        <LibraryDashboard />
      </div>
    </div>
  );
}

export default LibraryContainer;
