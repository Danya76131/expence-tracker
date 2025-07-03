import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: {
    expenses: [],
    incomes: [],
  },
  error: null,
  isLoading: false,
  selectedIndex: null,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) => {
    builder.addCase();
  },
});

export const categoryReducer = categorySlice.reducer;
