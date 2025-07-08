import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/authApi";
import { rest } from "lodash";

// export const getTransactions = createAsyncThunk(
//   "transactions/all",
//   async (type, { rejectWithValue }) => {
//     // console.warn("Get operat -->", type);
//     try {
//       const { data } = await api.get(`transactions/${type}`);
//       // console.log(data);
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

export const getTransactions = createAsyncThunk(
  "transactions/all",
  async ({ type, filter, date }, { rejectWithValue }) => {
    // const params = { date, search: filter };
    const params = {};

    if (date) {
      params.date = date;
    }

    if (filter && filter.trim().length >= 3 && filter.trim().length <= 24) {
      params.search = filter.trim();
    }

    console.log("Request params:", params);

    console.log(params);
    try {
      console.log("Request type:", type);
      const { data } = await api.get(`transactions/${type}`, { params });

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

// export const updateTransactions = createAsyncThunk(
//   "transactions/updateTransactions",
//   async ({ type, _id, ...rest }, { rejectWithValue }) => {
//     try {
//       console.warn(rest);
//       const { data } = await api.patch(`/transactions/${type}/${_id}`, rest);
//       console.log("Updated transaction:", data);
//       return {
//         data,
//       };
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

export const updateTransactions = createAsyncThunk(
  "transactions/updateTransactions",
  async (
    { _id, type, date, time, category, sum, comment },
    { rejectWithValue }
  ) => {
    try {
      console.warn(rest);
      const { data } = await api.patch(`/transactions/${type}/${_id}`, {
        date,
        time,
        category,
        sum,
        comment,
      });
      console.log("Updated transaction:", data);
      return {
        data,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// export const editTransaction = createAsyncThunk(
//   'transactions/editTransaction',
//   async ({ _id, type, date, time, category, sum, comment }, thunkAPI) => {
//     try {
//       const { data } = await api.patch(/transactions/${type}/${_id}, {
//         date,
//         time,
//         category,
//         sum,
//         comment,
//       });
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// POST
// "type": "incomes",
//   "date": "2022-12-28",
//   "time": "19:45",
//   "category": "6522bf1f9027bb7d55d6512b",
//   "sum": 700,
//   "comment": "December salary"

// PATCH
// {
//   "date": "2022-12-28",
//   "time": "19:45",
//   "category": "6522bf1f9027bb7d55d6512b",
//   "sum": 700,
//   "comment": "December salary"
// }
