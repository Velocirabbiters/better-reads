import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Rating,
  TextField,
  Typography,
  MenuItem,
  Select,
} from '@mui/material';
import { addBook } from '../features/librarySlice';

// const sxStyle = {
//   fontSize: '2rem',
//   backgroundColor: '',
//   width: 800,
//   height: 1000,
//   border: 'solid 10px black',
// };

function AddBookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [summary, setSummary] = useState('');
  const [review, setReview] = useState(0);
  const [booksAndBookID, setBooksAndBookID] = useState([]);
  const [titleSelectorVal, setTitleSelectorVal] = useState('');
  const username = useSelector(state => state.user.username);
  const user_id = useSelector(state => state.user.user_id);

  const dispatch = useDispatch();

  useEffect(() => {
    getDropDownData().then(data => setBooksAndBookID(data));
  }, []);

  const getDropDownData = async () => {
    let data = await fetch('/books', {
      Headers: {
        'Content-Type': 'application/json',
      },
    });
    const tempBooksAndID = [];
    data = await data.json();
    console.log(data);
    data.forEach(e => {
      tempBooksAndID.push({
        title: e.title,
        id: e.book_id,
      });
    });
    return tempBooksAndID;
  };
  const titleSelectorChangeHandle = e => {
    setTitleSelectorVal(e.target.value);
  };
  const handleSubmit = e => {
    console.log("HELLO");
    e.preventDefault();
    const reviewInfo = {
      user_id: user_id,
      book_id: titleSelectorVal,
      review: summary,
      rating: Number(review)
    };
    console.log('reviewInfo: ', reviewInfo);
    dispatch(
      addBook(reviewInfo),
    );
  };
  const options = [];
  for (let i = 0; i < booksAndBookID.length; i++) {
    options.push(
      <MenuItem value={booksAndBookID[i].id}>
        {booksAndBookID[i].title}
      </MenuItem>,
    );
  }
  console.log(booksAndBookID);
  return (
    <div className='addBookFrom'>
      <form onSubmit={handleSubmit}>
        <FormGroup
          sx={{
            padding: 2,
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'primary.main',
          }}>
          <FormLabel component='legend'>Title</FormLabel>
          <Select
            labelId='book title selector label'
            id='book title selector'
            value={titleSelectorVal}
            label='Title'
            onChange={titleSelectorChangeHandle}>
            {options}
          </Select>
          {/* <TextField
            required
            name='title'
            variant='outlined'
            placeholder='Harry Potter and The Sorcerers Stone...'
            value={title}
            onChange={e => setTitle(e.target.value)}
            sx={{ paddingBottom: 2 }}
          />
          <FormLabel component='legend'>Author</FormLabel>
          <TextField
            required
            name='author'
            variant='outlined'
            placeholder='J.K. Rowling...'
            value={author}
            onChange={e => setAuthor(e.target.value)}
            sx={{ paddingBottom: 2 }}
          />
          <FormLabel component='legend'>Genre</FormLabel>
          <TextField
            name='genre'
            variant='outlined'
            placeholder='Fantasy...'
            value={genre}
            onChange={e => setGenre(e.target.value)}
            sx={{ paddingBottom: 2 }}
          /> */}
          <FormLabel component='legend'>Review</FormLabel>
          <TextField
            name='review'
            variant='outlined'
            placeholder=''
            value={summary}
            onChange={e => setSummary(e.target.value)}
            sx={{ paddingBottom: 2 }}
          />
          <Typography component='legend'>Rating</Typography>
          <Rating
            name='rating'
            value={review}
            onChange={e => setReview(e.target.value)}
            sx={{ paddingBottom: 2 }}
          />
          <Button type='submit' variant='outlined'>
            Submit
          </Button>
        </FormGroup>
      </form>
    </div>
  );
}

export default AddBookForm;
