import { createAsyncThunk } from "@reduxjs/toolkit";

import { selectRefreshToken, selectSid } from "./selectors";

import api, { setAuthHeader } from "../../api/authApi.js";

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      await api.post("/auth/register", credentials);
      await dispatch(
        login({
          password: credentials.password,
          email: credentials.email,
        })
      );
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data || error.message
      );

      let errorMessage = "Registration failed";
      if (error.response) {
        const { status, data } = error.response;
        if (status === 409) {
          errorMessage = data.message || "This email is already in use";
        } else if (status === 400) {
          errorMessage = data.message || "Invalid registration data";
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      return rejectWithValue(errorMessage);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await api.post("/auth/login", credentials);

      const { user, accessToken, refreshToken, sid } = response.data;

      if (!user || !accessToken || !refreshToken || !sid) {
        throw new Error("Invalid server response structure");
      }

      setAuthHeader(accessToken);

      return response.data;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);

      let errorMessage = "Login failed";
      if (error.response) {
        const { status, data } = error.response;
        if (status === 403) {
          errorMessage = data.message || "Invalid email or password";
        } else if (status === 400) {
          errorMessage = data.message || "Invalid input data";
        }
      }

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const refreshToken = selectRefreshToken(state);
    const sid = selectSid(state);

    if (!refreshToken || !sid) {
      // showErrorToast("Session expired. Please login again.");
      return thunkAPI.rejectWithValue("Missing refresh token or session ID");
    }

    try {
      // axios.defaults.headers.common.Authorization = `Bearer ${refreshToken}`;
      setAuthHeader(refreshToken);
      const response = await api.post("/auth/refresh", { sid });

      const {
        accessToken,
        refreshToken: newRefreshToken,
        sid: newSid,
      } = response.data;

      setAuthHeader(accessToken);
      return { accessToken, refreshToken: newRefreshToken, sid: newSid };
    } catch (error) {
      console.error("Refresh error:", error.response?.data || error.message);

      const errorMessage =
        error.response?.data?.message || "Session refresh failed";
      // showErrorToast(errorMessage);

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
