import { createSlice } from "@reduxjs/toolkit";
import { createTransaction } from "./operations";

// const initialState = {
//   items: [],
//   isLoading: false,
//   error: null,
// };

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTransaction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const transactionsReducer = transactionsSlice.reducer;
