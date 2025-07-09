import { createSelector } from "@reduxjs/toolkit";

const selectUserState = (state) => state.user;

export const selectUser = createSelector(
  [selectUserState],
  (userState) => userState.user
);
export const selectUserName = createSelector(
  [selectUser],
  (user) => user?.name ?? null
);

export const selectUserAvatar = createSelector(
  [selectUser],
  (user) => user?.avatarUrl ?? null
);

export const selectUserCategories = createSelector(
  [selectUser],
  (user) => user?.categories ?? { incomes: [], expenses: [] }
);
export const selectUserIncomesCategories = createSelector(
  [selectUserCategories],
  (categories) => categories.incomes ?? []
);
export const selectUserExpensesCategories = createSelector(
  [selectUserCategories],
  (categories) => categories.expenses ?? []
);
export const selectUserTransactionsTotal = createSelector(
  [selectUser],
  (user) => user?.transactionsTotal ?? { incomes: 0, expenses: 0 }
);

export const selectUserIncomesTotal = (type) =>
  createSelector(
    [selectUserCategories],
    (categories) => categories[type] ?? []
  );
