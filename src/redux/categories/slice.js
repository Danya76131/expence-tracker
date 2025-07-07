import { createSlice } from "@reduxjs/toolkit";
import {
  addCategory,
  deleteCategory,
  editCategory,
  getCategories,
} from "./operations";
import { login } from "../auth/operations";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
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

        console.log("Data Fulfilled", action.payload);
      })
      .addCase(getCategories.rejected, handleRejected)

      .addCase(addCategory.pending, handlePending)
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories[action.payload.type].push(action.payload);
      })
      .addCase(addCategory.rejected, handleRejected)

      .addCase(editCategory.pending, handlePending)

      .addCase(editCategory.fulfilled, (state, { payload }) => {
        console.log("STATE", state);
        console.log("PayLOAD", payload);
        // state.categories.expenses = state.categories.expenses.map((item) => {
        //   if (item._id === payload._id) {
        //     return payload;
        //   }
        //   return item;
        // });
        console.log("Початковий", JSON.stringify(state.categories.incomes));
        state.categories.incomes = state.categories.incomes.map((item) => {
          if (item._id === payload._id) {
            console.log("Pay", payload);
            return payload;
          }

          return item;
        });
        console.log("Після", JSON.stringify(state.categories.incomes));
      })
      // .addCase(editCategory.fulfilled, (state, { payload }) => {
      //   const { _id } = payload;

      //   state.categories.incomes = state.categories.incomes.map((item) =>
      //     item._id === _id ? payload : item
      //   );
      // })

      .addCase(editCategory.rejected, handleRejected)

      .addCase(deleteCategory.pending, handlePending)
      .addCase(deleteCategory.fulfilled, (state, { payload }) => {
        state.categories[payload.type] = state.categories[payload.type].filter(
          (item) => item._id !== payload.id
        );
      })
      .addCase(deleteCategory.rejected, handleRejected)

      .addCase(login.fulfilled, (state, { payload: { user } }) => {
        state.categories.expenses = user.categories?.expenses || [];
        state.categories.incomes = user.categories?.incomes || [];
      }),
  // .addCase(refreshUser.fulfilled, (state, { payload }) => {
  //   state.categories.expenses = payload.categories?.expenses || [];
  //   state.categories.incomes = payload.categories?.incomes || [];
  // }),
  // .addCase(logOut.fulfilled, (state) => {
  //   return initialState;
  // }),
});

export const categoriesReducer = categoriesSlice.reducer;
