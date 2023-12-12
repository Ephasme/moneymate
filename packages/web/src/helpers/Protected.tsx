import { Outlet, Navigate } from "react-router-dom";
import { useStore } from "../store";

export const Protected = () => {
  const token = useStore((state) => state.token);
  if (!token) return <Navigate to="/sign-in" />;
  return <Outlet />;
};
