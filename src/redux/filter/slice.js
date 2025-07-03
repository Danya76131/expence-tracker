import { createSlice } from "@reduxjs/toolkit";
const filterSlice = createSlice({
  name: "filter",
  initialState: {},
});

export const filterReducer = filterSlice.reducer;
