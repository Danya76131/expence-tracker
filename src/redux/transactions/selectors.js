export const selectAllIncomes = (state) => state.transactions.incomes;
export const selectAllExpenses = (state) => state.transactions.expenses;
export const selectIncomesTotal = (state) => state.transactions.incomesTotal;
export const selectExpensesTotal = (state) => state.transactions.expensesTotal;
export const selectTransactionByType = (type) => (state) => {
  return type === "incomes"
    ? state.transactions.incomes || []
    : state.transactions.expenses || [];
};

export const selectTotalAmountByType = (type) => (state) => {
  return type === "incomes"
    ? state.transactions.incomesTotal || 0
    : state.transactions.expensesTotal || 0;
};
