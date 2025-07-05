import { createSlice } from "@reduxjs/toolkit";
const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {},
});

export const transactionsReducer = transactionsSlice.reducer;
