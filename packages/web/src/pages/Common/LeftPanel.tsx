import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store";
import { AccountList } from "./AccountList";
import { Logo } from "./Logo";
import { useBudget } from "./useBudget";

export const LeftPanel = () => {
  const budgetId = useStore((state) => state.budgetId);
  const navigate = useNavigate();

  const { data: budget } = useBudget();

  if (!budget) return <Box>Loading budget...</Box>;

  return (
    <Box className="flex flex-col">
      <Box className="flex m-3 p-3 px-5 rounded-lg cursor-pointer hover:bg-[#374C9B] gap-3 items-center transition">
        <Box sx={{ width: 40, height: 40 }}>
          <Logo />
        </Box>
        <Box className="text-2xl">{budget.name}</Box>
      </Box>
      <Box className="flex flex-col gap-1 m-3">
        <Box
          className="flex p-2 px-4 rounded-lg cursor-pointer hover:bg-[#374C9B] gap-3 items-center transition"
          onClick={() => {
            navigate(`/${budgetId}/budget`);
          }}
        >
          Budget
        </Box>
        <Box className="flex p-2 px-4 rounded-lg cursor-pointer hover:bg-[#374C9B] gap-3 items-center transition">
          All accounts
        </Box>
        <AccountList />
      </Box>
    </Box>
  );
};
