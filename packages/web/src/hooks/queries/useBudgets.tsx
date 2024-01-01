import { useQuery } from "@tanstack/react-query";
import { queries } from "./queries";

export const useBudgets = () => useQuery(queries.budgets.list);
