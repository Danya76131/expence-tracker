export const selectAllCategories = (state) => state.categories.categories;
export const selectIncomesCategories = (state) => state.categories.categories.incomes;
export const selectExpensesCategories = (state) => state.categories.categories.expenses;
export const selectCategoryByType = (type) => (state) => {
    console.log(type, state.categories);
    return type === "incomes"
        ? state.categories.categories.incomes
        : state.categories.categories.expenses;
}
