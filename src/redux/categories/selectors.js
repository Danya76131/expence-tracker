// import { createSelector } from "@reduxjs/toolkit";

export const selectIsLoading = (state) => state.categories.isLoading;

export const selectCategoryIncomes = (state) =>
  state.categories.categories.incomes;

export const selectCategoryExpenses = (state) =>
  state.categories.categories.expenses;

export const selectCategoryState = (state) => state.categories.categories;

// export const selectCategoryId = (_id) =>
//   createSelector(
//     [selectCategoryExpenses, selectCategoryIncomes],
//     ({ expenses }, incomes) => {
//       console.log("UUUUUU", expenses);
//       return (
//         expenses.find((item) => item.id === _id) ||
//         incomes.find((item) => item.id === _id)
//       );
//     }
//   );

export const selectSelectedItems = (state) => state.categories.selected;
