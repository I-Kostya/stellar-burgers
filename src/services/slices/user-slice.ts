import { registerUserApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { error } from 'console';
import { setCookie } from '../../utils/cookie';

type UserData = {
  user: TUser;
  password: string;
  isLoading: boolean;
  error: string | null;
};

export const registerUserThunk = createAsyncThunk(
  'user/register',
  registerUserApi
);

const initialState = {
  user: {} || null,
  accessToken: '',
  refreshToken: '',
  password: '',
  isLoading: true,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    getUserSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUserThunk.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.user = action.payload.user;
          setCookie('accessToken', action.payload.accessToken);
          localStorage.setItem('refreshToken', action.payload.refreshToken);
        }
      });
  }
});

export const userReducer = userSlice.reducer;
export const { getUserSelector } = userSlice.selectors;
