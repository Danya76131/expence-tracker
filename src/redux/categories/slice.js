import { createSlice } from "@reduxjs/toolkit";
import {
  addCategory,
  deleteCategory,
  editCategory,
  getCategories,
} from "./operations";

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const initialState = {
  categories: {
    expenses: [],
    incomes: [],
  },
  error: null,
  isLoading: false,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) =>
    builder

      .addCase(getCategories.pending, handlePending)
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, handleRejected)

      .addCase(addCategory.pending, handlePending)
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories[action.payload.type].push(action.payload);
      })
      .addCase(addCategory.rejected, handleRejected)

      .addCase(editCategory.pending, handlePending)
      .addCase(editCategory.fulfilled, (state, { payload }) => {
        state.categories.expenses = state.categories?.expenses.map((item) => {
          if (item._id === payload._id) {
            return payload;
          }
          return item;
        });
        state.categories.incomes = state.categories?.incomes.map((item) => {
          if (item._id === payload._id) {
            return payload;
          }
          return item;
        });
      })
      .addCase(editCategory.rejected, handleRejected)

      .addCase(deleteCategory.pending, handlePending)
      .addCase(deleteCategory.fulfilled, (state, { payload }) => {
        state.categories[payload.type] = state.categories[payload.type].filter(
          (item) => item._id !== payload.id
        );
      })
      .addCase(deleteCategory.rejected, handleRejected),

  // .addCase(logIn.fulfilled, (state, { payload: { user } }) => {
  //   state.categories.expenses = user.categories?.expenses || [];
  //   state.categories.incomes = user.categories?.incomes || [];
  // })
  // .addCase(fetchCurrentUser.fulfilled, (state, { payload }) => {
  //   state.categories.expenses = payload.categories?.expenses || [];
  //   state.categories.incomes = payload.categories?.incomes || [];
  // })
  // .addCase(logOut.fulfilled, (state) => {
  //   return initialState;
  // }),
});

export const categoriesReducer = categoriesSlice.reducer;
