import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeUpdateActionCreator } from '../features/userSlice';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Rating,
  TextField,
  Typography,
} from '@mui/material';
import { addBook } from '../features/librarySlice';

// const sxStyle = {
//   fontSize: '2rem',
//   backgroundColor: '',
//   width: 800,
//   height: 1000,
//   border: 'solid 10px black',
// };

function UpdateBookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [summary, setSummary] = useState('');
  const [review, setReview] = useState(0);

  const username = useSelector(state => state.user.username);

  const dispatch = useDispatch();

  const close = () => {
    dispatch(closeUpdateActionCreator());
  }

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(
      addBook({
        username,
        title,
        author,
        genre,
        summary,
        review,
      }),
    );
  };

  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            size: '1px',
          },
        },
      },
    },
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ThemeProvider theme={theme}>
          <FormGroup
            sx={{
              padding: 2,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'primary.main',
            }}>
            <FormLabel component='legend'>Title</FormLabel>
            <TextField
              required
              name='title'
              variant='outlined'
              size='small'
              value={title}
              onChange={e => setTitle(e.target.value)}
              sx={{ paddingBottom: 2 }}
            />
            <FormLabel component='legend'>Author</FormLabel>
            <TextField
              required
              name='author'
              variant='outlined'
              size='small'
              value={author}
              onChange={e => setAuthor(e.target.value)}
              sx={{ paddingBottom: 2 }}
            />
            <FormLabel component='legend'>Genre</FormLabel>
            <TextField
              name='genre'
              variant='outlined'
              size='small'
              value={genre}
              onChange={e => setGenre(e.target.value)}
              sx={{ paddingBottom: 2 }}
            />
            <FormLabel component='legend'>Summary</FormLabel>
            <TextField
              name='summary'
              variant='outlined'
              size='small'
              value={summary}
              onChange={e => setSummary(e.target.value)}
              sx={{ paddingBottom: 2 }}
            />
            <Typography component='legend'>Review</Typography>
            <Rating
              name='review'
              size='small'
              value={review}
              onChange={e => setReview(e.target.value)}
              sx={{ paddingBottom: 2 }}
            />
            <Button type='submit' variant='outlined'>
              Submit
            </Button>
          </FormGroup>
        </ThemeProvider>
      </form>
      <Button onClick={() => {close()}} variant='outlined'>Close</Button>
    </div>
  );
}

export default UpdateBookForm;