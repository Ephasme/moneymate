import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import { useStore } from "../../store";
import { AccountList } from "./AccountList";

export const LeftPanel = () => {
  const budgetId = useStore((state) => state.budgetId);
  const navigate = useNavigate();

  const { data: budget } = useQuery({
    queryKey: ["budgets", { budgetId }],
    queryFn: () => api.getBudget({ budgetId: budgetId! }),
    enabled: !!budgetId,
  });

  if (!budget) return <Box>Loading budget...</Box>;

  return (
    <Box>
      <Box>{budget.name}</Box>
      <Box
        onClick={() => {
          navigate(`/${budgetId}/budget`);
        }}
      >
        Budget
      </Box>
      <AccountList />
    </Box>
  );
};
