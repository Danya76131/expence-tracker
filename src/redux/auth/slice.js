import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://expense-tracker.b.goit.study/api/';
axios.defaults.headers.common['Content-Type'] = 'application/json';

const transformToJSON = (data) => JSON.stringify(data);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('/auth/register', credentials, {
        transformRequest: [transformToJSON]
      });
      
      if (!response.data) {
        throw new Error('No data received');
      }
      if (!response.data.user || !response.data.accessToken) {
        throw new Error('Invalid server response structure');
      }
      
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: err.response?.data?.message || err.message,
        status: err.response?.status
      });
    }
  }
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('/auth/login', credentials, {
        transformRequest: [transformToJSON]
      });
      
      // Проверка структуры ответа
      const { user, accessToken, refreshToken, sid } = response.data;
      if (!user || !accessToken || !refreshToken || !sid) {
        throw new Error('Invalid response structure');
      }
      
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: err.response?.data?.message || err.message,
        status: err.response?.status
      });
    }
  }
);

export const refresh = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const sid = state.auth.sid;
      const refreshToken = state.auth.refreshToken;

      if (!sid || !refreshToken) {
        return thunkAPI.rejectWithValue({
          message: 'No refresh token or sid',
          status: 401
        });
      }

      const response = await axios.post(
        '/auth/refresh',
        { sid },
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
          transformRequest: [transformToJSON]
        }
      );

      const { accessToken, refreshToken: newRefreshToken, sid: newSid } = response.data;
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      return { accessToken, refreshToken: newRefreshToken, sid: newSid };
    } catch (err) {
      return thunkAPI.rejectWithValue({
        message: err.response?.data?.message || 'Refresh failed',
        status: err.response?.status
      });
    }
  }
);

const initialState = {
  user: { name: null, email: null, _id: null },
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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken || null;
        state.sid = action.payload.sid || null;
        state.isLoggedIn = true;
        axios.defaults.headers.common.Authorization = `Bearer ${action.payload.accessToken}`;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = {
          message: action.payload.message,
          isEmailError: action.payload.status === 409
        };
      })
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.sid = action.payload.sid;
        state.isLoggedIn = true;
        axios.defaults.headers.common.Authorization = `Bearer ${action.payload.accessToken}`;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = {
          message: action.payload.message,
          isCredentialsError: action.payload.status === 403
        };
      })
      .addCase(refresh.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.sid = action.payload.sid;
        state.isLoggedIn = true;
      })
      .addCase(refresh.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
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