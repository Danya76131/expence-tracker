import { createSelector } from "@reduxjs/toolkit";

export const selectIsLoading = (state) => state.categories.isLoading;

export const selectCategoryIncomes = (state) =>
  state.categories.categories.incomes;

export const selectCategoryExpenses = (state) =>
  state.categories.categories.expenses;

export const selectCategoryState = (state) => state.categories.categories;

export const selectCategoryByType = (type) =>
  createSelector([selectCategoryState], (categories) => categories[type] ?? []);

export const selectSelectedItems = (state) => state.categories.selected;
