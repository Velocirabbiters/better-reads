/* eslint-disable no-unused-expressions */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk('user/login', async data => {
  try {
    const response = await axios.post('/login', data);
    return response.data;
  } catch (err) {
    console.log({ error: 'Error in user validation.' });
  }
});

export const signupUser = createAsyncThunk('/signup', async data => {
  try {
    const response = await axios.post('/signup', data);
    return response.data;
  } catch (err) {
    console.log({ error: 'Error in user validation.' });
  }
});

const initialState = {
  username: '',
  userId: '',
  failedLogin: false,
  failedSignup: false,
  loggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {},
    logout: (state, action) => {
      // state.user = null;
    },
    signup: (state, action) => {},
    reload: (state, action) => {
      // state.failedSignup = false;
      state.failedLogin = false;
      console.log("we're in reload");
    },
  },
  extraReducers: builder => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.username = action.payload.user;
        state.userId = action.payload.id;
        state.loggedIn = true;
      } else {
        state.failedLogin = true;
      }
    }),
      // builder.addCase(loginUser.rejected, (state, action) => {
      //   state.failedLogin = true;
      // }),
      builder.addCase(signupUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.username = action.payload.username;
          state.userId = action.payload.id;
          state.loggedIn = true;
        } else {
          state.failedSignup = true;
        }
      });
    // builder.addCase(signupUser.rejected, (state, action) => {
    //   console.log('error');
    //   state.failedLogin = true;
    // });
  },
});

export const { login, logout, signup, reload } = userSlice.actions;
// export const selectUser = state => state.user.user;

export default userSlice.reducer;
