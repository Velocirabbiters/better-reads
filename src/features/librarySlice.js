import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  bookList: [],
  bookCount: 0,
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const getBooks = createAsyncThunk('library/getBooks', async user_id => {
  try {
    console.log({ params: user_id })
    console.log('running get books again');
    const response = await axios.get('/library', { params: user_id });
    console.log("the response is", response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
});

export const addBook = createAsyncThunk('library/addBook', async data => {
  console.log(data);
  try {
    const response = await axios.post('/review', data);
    console.log("this is the data entering addBook: ", data);
    console.log("this is the response we got from post to /review: ", response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
});

export const removeBook = createAsyncThunk(
  'library/removeBook',
  async bookId => {
    try {
      const response = await axios.delete('');
      return response.data;
    } catch (err) {
      console.log(err);
    }
  },
);

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    // bookAdded: {
    //     reducer(state, action) {
    //         state.bookList.push(action.payload)
    //     },
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(getBooks.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // const loadedBooks = action.payload.map(book => {
        //     return book;
        // });

        // Add any fetched books to the array
        // state.bookList = state.bookList.concat(loadedBooks)
        state.bookList = action.payload;
        state.loggedIn = true;
        console.log('payload', action.payload);
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addBook.pending, (state, action) => {
        console.log('booklist while pending: ', state.bookList);
      })
      .addCase(addBook.fulfilled, (state, action) => {
        console.log('added book erm i mean review');
        console.log('bookList currently: ', state.bookList);
        console.log('payload: ', action.payload);
        state.bookList = action.payload;
      });
  },
});

// export const getBookList = state => state.library.bookList;
// export const getBooksStatus = state => state.library.status;
// export const getBooksError = state => state.library.error;

export const { bookAdded } = librarySlice.actions;

export default librarySlice.reducer;
