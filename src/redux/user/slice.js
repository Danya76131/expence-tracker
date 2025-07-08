import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getCurrentUser,
  updateUser,
  userAvatarChange,
  deleteUserAvatar,
} from "./operations";
// import { userLogout } from "../auth/operations";

const initialState = {
  user: null,
  isLoading: false,
  isError: false,
};

const slice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.user = payload;
        console.log("User", payload);
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.user = { ...state.user, ...payload };
      })
      .addCase(userAvatarChange.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.user = { ...state.user, avatarUrl: payload.avatarUrl };
      })
      .addCase(deleteUserAvatar.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.user = { ...state.user, avatarUrl: null };
      })
      // .addCase(userLogout.fulfilled, () => {
      //   return { ...initialState };
      // })

      .addMatcher(
        isAnyOf(
          getCurrentUser.pending,
          updateUser.pending,
          userAvatarChange.pending,
          deleteUserAvatar.pending
        ),
        (state) => {
          state.isLoading = true;
          state.isError = false;
        }
      )

      .addMatcher(
        isAnyOf(
          getCurrentUser.rejected,
          updateUser.rejected,
          userAvatarChange.rejected,
          deleteUserAvatar.rejected
        ),
        (state) => {
          state.isLoading = false;
          state.isError = true;
        }
      );
  },
});

export const userReducer = slice.reducer;
