import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { setAuthHeader } from "../../api/authApi";

export const getCurrentUser = createAsyncThunk(
  "user/current",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.accessToken;
      if (!token) return rejectWithValue("No token");

      setAuthHeader(token);
      const { data } = await api.get("users/current");
      return data;
    } catch (error) {
      return rejectWithValue(error.status);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/update",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await api.patch("users/info", userData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const userAvatarChange = createAsyncThunk(
  "user/avatarChange",
  async (avatarUrl, { rejectWithValue }) => {
    try {
      const { data } = await api.patch("users/avatar", avatarUrl);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUserAvatar = createAsyncThunk(
  "user/avatarDelete",
  async (_, { getState, rejectWithValue }) => {
    try {
      const avatar = getState().user.user.avatarUrl;
      if (!avatar) return rejectWithValue("No avatar!");

      await api.delete("users/avatar");
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
