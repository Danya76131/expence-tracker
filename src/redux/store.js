import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authReducer } from "./auth/slice";
import { categoriesReducer } from "./categories/slice";
import { filterReducer } from "./filter/slice";
import { transactionsReducer } from "./transactions/slice";
import { userReducer } from "./user/slice";
import { modalReducer } from "./modal/slice";

// Persist config for auth
const persistConfig = {
  key: "auth",
  version: 1,
  storage,
  whitelist: ["accessToken", "refreshToken", "sid", "isLoggedIn", "user"],
};

// Persist config for transactions
const transactionsPersistConfig = {
  key: "transactions",
  version: 1,
  storage,
  whitelist: ["incomesTotal", "expensesTotal", "incomes", "expenses"],
};

// Persist config for categories
const categoriesPersistConfig = {
  key: "categories",
  version: 1,
  storage,
  whitelist: [
    "incomesCategories",
    "expensesCategories",
    "incomesPercent",
    "expensesPercent",
  ],
};

const persistedReducer = persistReducer(persistConfig, authReducer);
const persistedTransactionsReducer = persistReducer(
  transactionsPersistConfig,
  transactionsReducer
);
const persistedCategoriesReducer = persistReducer(
  categoriesPersistConfig,
  categoriesReducer
);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    user: userReducer,
    categories: persistedCategoriesReducer,
    transactions: persistedTransactionsReducer,
    filter: filterReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
