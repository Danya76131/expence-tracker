import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modals: [],
  type: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state, action) {
      state.modals.push({
        modalType: action.payload.modalType,
        modalProps: action.payload.modalProps || {},
      });
    },
    closeModal(state) {
      state.modals.pop();
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
