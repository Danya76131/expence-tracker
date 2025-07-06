import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/authApi";

export const getTransactions = createAsyncThunk(
  "transactions/getTransactions",
  async ({ type, date }, thunkAPI) => {
    try {
      if (type !== "incomes" && type !== "expenses") {
        throw Error("wrong type");
      }
      const params = date ? { date } : {};
      const { data } = await api.get(`/transactions/${type}`, { params });
      return { data, date, type };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
