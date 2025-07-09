import { createSlice } from "@reduxjs/toolkit";
import {
  addTransaction,
  deleteTransaction,
  getTransactions,
  updateTransactions,
} from "./operations";
import { userLogout } from "../auth/operations";

const initialState = {
  incomes: [],
  expenses: [],
  loading: false,
  error: false,
  incomesTotal: null,
  expensesTotal: null,
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setIncomes: (state, action) => {
      state.incomes = action.payload;
      state.incomesTotal = action.payload.reduce(
        (acc, tx) => acc + (tx.sum || 0),
        0
      );
    },
    setExpenses: (state, action) => {
      state.expenses = action.payload;
      state.expensesTotal = action.payload.reduce(
        (acc, tx) => acc + (tx.sum || 0),
        0
      );
    },
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
        const { type } = meta.arg;

        if (type === "incomes") {
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
      .addCase(deleteTransaction.fulfilled, (state, { meta }) => {
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
      })
      .addCase(addTransaction.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addTransaction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = false;
        if (payload.transaction.type === "incomes") {
          state.incomes.push(payload.transaction);
          state.incomesTotal = payload.total;
        } else {
          state.expenses.push(payload.transaction);
          state.expensesTotal = payload.total;
        }
      })
      .addCase(addTransaction.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(updateTransactions.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateTransactions.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(updateTransactions.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(userLogout.fulfilled, () => {
        return initialState;
      }),
});

export const { setIncomes, setExpenses } = transactionsSlice.actions;
export const transactionsReducer = transactionsSlice.reducer;
