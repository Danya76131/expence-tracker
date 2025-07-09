import { createSlice } from "@reduxjs/toolkit";
import {
  addCategory,
  deleteCategory,
  editCategory,
  getCategories,
} from "./operations";
import { login, userLogout } from "../auth/operations";

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
  incomesPercent: [],
  expensesPercent: [],
  error: null,
  isLoading: false,
};

// 🔸 Функція для підрахунку відсотків:
const calculatePercent = (array) => {
  const total = array.reduce((acc, item) => acc + (item.sum || 0), 0);
  return array.map((item) => ({
    ...item,
    percent: total ? (item.sum / total) * 100 : 0,
  }));
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,

  reducers: {
    setIncomesCategories: (state, action) => {
      state.categories.incomes = action.payload;
      state.incomesPercent = calculatePercent(action.payload);
    },
    setExpensesCategories: (state, action) => {
      state.categories.expenses = action.payload;
      state.expensesPercent = calculatePercent(action.payload);
    },
  },

  extraReducers: (builder) =>
    builder
      .addCase(getCategories.pending, handlePending)
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;

        // ✅ Розрахунок відсотків
        state.expensesPercent = calculatePercent(action.payload.expenses || []);
        state.incomesPercent = calculatePercent(action.payload.incomes || []);

        console.log("Data Fulfilled", action.payload);
      })
      .addCase(getCategories.rejected, handleRejected)

      .addCase(addCategory.pending, handlePending)
      .addCase(addCategory.fulfilled, (state, action) => {
        const { type } = action.payload;
        state.categories[type].push(action.payload);

        // ✅ Оновити відсотки
        if (type === "incomes") {
          state.incomesPercent = calculatePercent(state.categories.incomes);
        } else {
          state.expensesPercent = calculatePercent(state.categories.expenses);
        }
      })
      .addCase(addCategory.rejected, handleRejected)

      .addCase(editCategory.pending, handlePending)
      .addCase(editCategory.fulfilled, (state, { payload }) => {
        const { _id } = payload;

        state.categories.expenses = state.categories.expenses.map((item) =>
          item._id === _id ? payload : item
        );
        state.categories.incomes = state.categories.incomes.map((item) =>
          item._id === _id ? payload : item
        );

        // ✅ Оновити відсотки
        state.incomesPercent = calculatePercent(state.categories.incomes);
        state.expensesPercent = calculatePercent(state.categories.expenses);
      })
      .addCase(editCategory.rejected, handleRejected)

      .addCase(deleteCategory.pending, handlePending)
      .addCase(deleteCategory.fulfilled, (state, { payload }) => {
        const { type, id } = payload;
        state.categories[type] = state.categories[type].filter(
          (item) => item._id !== id
        );

        // ✅ Оновити відсотки
        if (type === "incomes") {
          state.incomesPercent = calculatePercent(state.categories.incomes);
        } else {
          state.expensesPercent = calculatePercent(state.categories.expenses);
        }
      })
      .addCase(deleteCategory.rejected, handleRejected)

      .addCase(login.fulfilled, (state, { payload: { user } }) => {
        state.categories.expenses = user.categories?.expenses || [];
        state.categories.incomes = user.categories?.incomes || [];

        // ✅ Оновити відсотки при логіні
        state.incomesPercent = calculatePercent(state.categories.incomes);
        state.expensesPercent = calculatePercent(state.categories.expenses);
      })

      .addCase(userLogout.fulfilled, () => {
        return { ...initialState };
      }),
});

export const { setIncomesCategories, setExpensesCategories } =
  categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;
