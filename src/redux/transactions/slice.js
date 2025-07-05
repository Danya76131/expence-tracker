// import { createSlice } from "@reduxjs/toolkit";
// const transactionsSlice = createSlice({
//   name: "transactions",
//   initialState: {},
// });

// export const transactionsReducer = transactionsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { deleteTransaction, getTransactions } from "./operations";

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    incomes: [],
    expenses: [],
    loading: false,
    error: false,
  },
  extraReducers: (builder) =>
    builder
      .addCase(getTransactions.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getTransactions.fulfilled, (state, { payload, meta }) => {
        state.loading = false;
        state.error = false;
        if (meta.arg === "incomes") {
          state.incomes = payload;
        } else {
          state.expenses = payload;
        }
      })
      .addCase(getTransactions.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(deleteTransaction.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteTransaction.fulfilled, (state, { payload, meta }) => {
        state.loading = false;
        state.error = false;
        state.incomes = state.incomes.filter(
          (transaction) => transaction._id !== meta.arg
        );
        state.expenses = state.expenses.filter(
          (transaction) => transaction._id !== meta.arg
        );
      })
      .addCase(deleteTransaction.rejected, (state) => {
        state.loading = false;
        state.error = true;
      }),
});

export const transactionsReducer = transactionsSlice.reducer;
