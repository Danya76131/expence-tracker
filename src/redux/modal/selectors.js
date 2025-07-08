export const selectModalsStack = (state) => state.modal.modals;

export const hasOpenModal = (state) => state.modal.modals.length > 0;
