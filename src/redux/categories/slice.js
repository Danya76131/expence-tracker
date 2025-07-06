import { createSlice } from "@reduxjs/toolkit";
import { addCategories, getCategories } from "./operations";
const categoriesSlice = createSlice({
  name: "categories",
  initialState: {

    categories: { incomes: [], expenses: [] },
  },
  extraReducers: (builder) => builder
    .addCase(addCategories.fulfilled, (state, { payload }) => {
      const type = payload.type;
      if (type === "incomes") {
        state.categories.incomes.push(payload);
      } else {
        state.categories.expenses.push(payload);
      }
      state.isError = false;
      state.isLoading = false;
    })
    .addCase(getCategories.fulfilled, (state, { payload }) => {
      state.isError = false;
      state.isLoading = false;
      state.categories.incomes = payload.incomes;
      state.categories.expenses = payload.expenses;
    })
})


export const categoriesReducer = categoriesSlice.reducer;
