import { createSelector } from "@reduxjs/toolkit";

// export const selectFilter = (state) => state.filter.filter;
// export const selectDate = (state) => state.filter.date;

const selectFilterState = (state) => state.filter;

export const selectFilter = createSelector(
  [selectFilterState],
  (filter) => filter.filter
);

export const selectDate = createSelector(
  [selectFilterState],
  (filter) => filter.date
);
