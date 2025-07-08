import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIncomes, setExpenses } from "../redux/transactions/slice";
import {
  setIncomesCategories,
  setExpensesCategories,
} from "../redux/categories/slice";

export const useInitFinanceData = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const incomes = useSelector((state) => state.transactions.incomes);
  const expenses = useSelector((state) => state.transactions.expenses);
  const categories = useSelector((state) => state.categories.categories); // містить incomes і expenses

  useEffect(() => {
    if (!isLoggedIn) return;

    // Розрахунок сум
    dispatch(setIncomes(incomes));
    dispatch(setExpenses(expenses));

    // Розрахунок відсотків по категоріях
    dispatch(setIncomesCategories(categories.incomes || []));
    dispatch(setExpensesCategories(categories.expenses || []));
  }, [
    isLoggedIn,
    dispatch,
    incomes,
    expenses,
    categories.incomes,
    categories.expenses,
  ]);
};
