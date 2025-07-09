import { createSlice } from "@reduxjs/toolkit";

import { login, register, userLogout } from "./operations";

const initialState = {
  user: {
    name: null,
    email: null,
    avatarUrl: null,
    currency: "uah",
    categories: { incomes: [], expenses: [] },
    transactionsTotal: { incomes: 0, expenses: 0 },
  },
  token: null,
  sid: null,
  refreshToken: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // .addCase(refreshUser.pending, (state) => {
      //   state.isRefreshing = true;
      // })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || { message: "Registration failed" };
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
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || { message: "Login failed" };
      })
      .addCase(userLogout.fulfilled, () => {
        return { ...initialState };
      });
    // .addCase(refreshUser.fulfilled, (state, action) => {
    //   state.token = action.payload.accessToken;
    //   state.refreshToken = action.payload.refreshToken;
    //   state.sid = action.payload.sid;
    //   state.isLoggedIn = true;
    //   state.isRefreshing = false;
    // })
    // .addCase(refreshUser.rejected, (state) => {
    //   state.user = {
    //     name: null,
    //     email: null,
    //     avatarUrl: null,
    //     currency: "uah",
    //     categories: { incomes: [] },
    //     transactionsTotal: { incomes: 0, expenses: 0 },
    //   };
    //   state.isRefreshing = false;
    // });
  },
});

export const { resetError, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
