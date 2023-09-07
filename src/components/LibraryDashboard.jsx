import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { getBooks } from '../features/librarySlice';
import { Button } from '@mui/material';
import { openUpdateActionCreator } from '../features/userSlice';

function LibraryDashboard() {
  const username = useSelector(state => state.user.username);
  // const bookCount = useSelector(state => state.library.bookCount);
  const bookData = useSelector(state => state.library.bookList);
  const dispatch = useDispatch();

  const body = {
    username: username,
  };

  useEffect(() => {
    dispatch(getBooks(body));
  }, []);

  const rows = bookData.map((book, index) => ({
    id: index + 1,
    title: book.title,
    author: book.author,
    genre: book.genre,
    summary: book.summary,
    review: book.review,
  }));

  const openUpdate = () => {
    dispatch(openUpdateActionCreator())
  }

  const update = <Button onClick={() => {openUpdate()}}>Update</Button>;
  const del = <Button>Delete</Button>;

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 150,
    },
    { field: 'title', headerName: 'Title', width: 350 },
    { field: 'author', headerName: 'Author', width: 150 },
    { field: 'genre', headerName: 'Genre', width: 150 },
    { field: 'summary', headerName: 'Summary', width: 350 },
    { field: 'review', headerName: 'Review', width: 150 },
    { field: 'update', headerName: '', width: 150, renderCell: () => {return update}},
    { field: 'delete', headerName: '', width: 150, renderCell: () => {return del}}
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
