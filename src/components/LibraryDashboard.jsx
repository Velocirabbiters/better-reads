import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { getBooks } from '../features/librarySlice';
import { Button } from '@mui/material';
import { openUpdateActionCreator } from '../features/userSlice';

function LibraryDashboard() {
  const user_id = useSelector(state => state.user.user_id);
  // const bookCount = useSelector(state => state.library.bookCount);
  const bookData = useSelector(state => state.library.bookList);
  const dispatch = useDispatch();

  const body = {
    user_id: user_id,
  };

  useEffect(() => {
    dispatch(getBooks(body));
  }, []);

  console.log("here is the book data: ", bookData);

  const rows = bookData.map((review, index) => ({ // this is an array of review objects
    id: index + 1,
    title: review.title,
    author: review.author,
    genre: review.genre,
    summary: review.review,
    review: review.rating,
  }));

  const update = (
    <Button>
      Update
    </Button>
  );
  const del = <Button>Delete</Button>;

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 150,
    },
    { field: 'book', headerName: 'Book', width: 350 },
    { field: 'author', headerName: 'Author', width: 150 },
    { field: 'genre', headerName: 'Genre', width: 150 },
    { field: 'review', headerName: 'Review', width: 350 },
    { field: 'rating', headerName: 'Rating', width: 150 },
    {
      field: 'update',
      headerName: '',
      width: 150,
      renderCell: () => {
        return update;
      },
    },
    {
      field: 'delete',
      headerName: '',
      width: 150,
      renderCell: () => {
        return del;
      },
    },
  ];

  return (
    <div className='libraryDashboard'>
      <Box
        sx={{
          height: 520,
          width: '100%',
        }}>
        <DataGrid
          sx={{
            boxShadow: 2,
            border: 2,
          }}
          rows={rows}
          columns={columns}
        />
      </Box>
    </div>
  );
}

export default LibraryDashboard;
