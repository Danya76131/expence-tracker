import { createSlice } from "@reduxjs/toolkit";
const categoriesSlice = createSlice({
  name: "categories",
  initialState: {},
});

export const categoriesReducer = categoriesSlice.reducer;
