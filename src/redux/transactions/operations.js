import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/authApi";

export const getTransactions = createAsyncThunk(
  "transactions/all",
  async (type, { rejectWithValue }) => {
    console.log(type);
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

export const addTransaction = createAsyncThunk(
  "transactions/add",
  async (transaction, { rejectWithValue }) => {
    try {
      console.log("addTransaction", transaction);
      const { data } = await api.post("/transactions", transaction);
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTransactions = createAsyncThunk(
  "transactions/updateTransactions",
  async (transaction, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(
        `/transactions/${transaction.type}/${transaction.id}`,
        transaction
      );
      console.log("Updated transaction:", data);
      return {
        data,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
