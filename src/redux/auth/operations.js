import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { setAuthHeader } from "../../api/authApi.js";

// const saveTokensToStorage = (data) => {
//   localStorage.setItem("accessToken", data.accessToken);
//   localStorage.setItem("refreshToken", data.refreshToken);
//   localStorage.setItem("sid", data.sid);
// };

// const clearTokensFromStorage = () => {
//   localStorage.removeItem("accessToken");
//   localStorage.removeItem("refreshToken");
//   localStorage.removeItem("sid");
// };

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
      // saveTokensToStorage(response.data);

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

// export const refreshUser = createAsyncThunk(
//   "auth/refresh",
//   async (_, thunkAPI) => {
//     const state = thunkAPI.getState();
//     const refreshToken =
//       state.auth.refreshToken || localStorage.getItem("refreshToken");
//     const sid = state.auth.sid || localStorage.getItem("sid");

//     if (!refreshToken || !sid) {
//       return thunkAPI.rejectWithValue("No session info for refresh");
//     }

//     try {
//       const res = await api.post(
//         "https://expense-tracker.b.goit.study/api/auth/refresh",
//         { sid },
//         {
//           headers: {
//             Authorization: `Bearer ${refreshToken}`,
//           },
//         }
//       );

//       if (res.data.accessToken) {
//         setAuthHeader(res.data.accessToken);
//         return res.data;
//       } else {
//         throw new Error("No access token received");
//       }
//     } catch (error) {
//       clearAuthHeader();
//       clearTokensFromStorage();
//       return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );
