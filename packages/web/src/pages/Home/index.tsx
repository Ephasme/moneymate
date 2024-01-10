import { Navigate } from "react-router-dom";
import { useStore } from "../../store";

export const Home = () => {
  const budgetId = useStore((state) => state.budgetId);
  if (!budgetId) return <Navigate to="/welcome" />;
  return <Navigate to={`/${budgetId}/envelopes`} />;
};
