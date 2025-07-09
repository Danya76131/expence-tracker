import { createSlice } from "@reduxjs/toolkit";
import { format } from "date-fns";

const initialState = {
  filter: "",
  date: format(new Date(), "yyyy-MM-dd"),
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.filter = action.payload;
    },
    changeDate: (state, action) => {
      state.date = action.payload;
    },
    resetFilter: () => {
      return initialState;
    },
  },
});

export const filterReducer = filterSlice.reducer;
export const { changeFilter, changeDate, resetFilter } = filterSlice.actions;
