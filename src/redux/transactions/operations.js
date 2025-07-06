import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/authApi";

export const getTransactions = createAsyncThunk(
  "transactions/all",
  async (type, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`transactions/${type}`);
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`transactions/${id}`);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
