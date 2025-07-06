import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { selectRefreshToken, selectSid } from "./selectors";
import {
  showSuccessToast,
  showErrorToast,
} from "../../components/CustomToast/CustomToast.jsx";
import { setAuthHeader } from "../../api/authApi.js";

axios.defaults.baseURL = "https://expense-tracker.b.goit.study/api/";
axios.defaults.headers.common["Content-Type"] = "application/json";

const transformToJSON = (data) => {
  try {
    return JSON.stringify(data);
  } catch (error) {
    console.error("JSON transformation error:", error);
    throw new Error("Invalid data format");
  }
};

// Рег
export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/auth/register", credentials, {
        transformRequest: [transformToJSON],
      });

      showSuccessToast("Registration successful!");

      return response.data;
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

      showErrorToast(errorMessage);

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/auth/login", credentials, {
        transformRequest: [transformToJSON],
      });

      const { user, accessToken, refreshToken, sid } = response.data;

      if (!user || !accessToken || !refreshToken || !sid) {
        throw new Error("Invalid server response structure");
      }

      // axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      setAuthHeader(accessToken);

      showSuccessToast(`Welcome back, ${user.name || user.email}!`);

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

      showErrorToast(errorMessage);

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
      showErrorToast("Session expired. Please login again.");
      return thunkAPI.rejectWithValue("Missing refresh token or session ID");
    }

    try {
      axios.defaults.headers.common.Authorization = `Bearer ${refreshToken}`;

      const response = await axios.post(
        "/auth/refresh",
        { sid },
        {
          transformRequest: [transformToJSON],
        }
      );

      const {
        accessToken,
        refreshToken: newRefreshToken,
        sid: newSid,
      } = response.data;

      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      return { accessToken, refreshToken: newRefreshToken, sid: newSid };
    } catch (error) {
      console.error("Refresh error:", error.response?.data || error.message);

      const errorMessage =
        error.response?.data?.message || "Session refresh failed";
      showErrorToast(errorMessage);

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
