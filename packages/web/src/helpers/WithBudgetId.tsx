import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "../store";

export type BudgetIdContext = { budgetId: string };

export const WithBudgetId = () => {
  const budgetId = useStore((state) => state.budgetId);
  if (!budgetId) return <Navigate to="/welcome" />;
  return <Outlet context={{ budgetId }} />;
};
