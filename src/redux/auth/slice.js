import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { login, register, refreshUser } from './operations';

axios.defaults.baseURL = 'https://expense-tracker.b.goit.study/api/';
axios.defaults.headers.common['Content-Type'] = 'application/json';

const initialState = {
  user: { name: null, email: null },
  accessToken: null,
  refreshToken: null,
  sid: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
    logout(state) {
      state.user = { name: null, email: null, _id: null };
      state.accessToken = null;
      state.refreshToken = null;
      state.sid = null;
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = null;
      delete axios.defaults.headers.common.Authorization;
    },
  },
  extraReducers: (builder) => {
    builder
    
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken || null;
        state.sid = action.payload.sid || null;
        state.isLoggedIn = true;
        axios.defaults.headers.common.Authorization = `Bearer ${action.payload.accessToken}`;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || { message: 'Registration failed' };
      })
     
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.sid = action.payload.sid;
        state.isLoggedIn = true;
        axios.defaults.headers.common.Authorization = `Bearer ${action.payload.accessToken}`;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || { message: 'Login failed' };
      })
  
      .addCase(refreshUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.sid = action.payload.sid;
        state.isLoggedIn = true;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || { message: 'Refresh failed' };
        state.isLoggedIn = false;
        state.user = { name: null, email: null, _id: null };
        state.accessToken = null;
        state.refreshToken = null;
        state.sid = null;
        delete axios.defaults.headers.common.Authorization;
      });
  },
});

export const { resetError, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
