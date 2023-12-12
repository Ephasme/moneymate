import { Box, Typography, IconButton } from "@mui/material";
import { useStore } from "../../store";
import * as dateFns from "date-fns";
import ArrowLeft from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowRight from "@mui/icons-material/ArrowCircleRightOutlined";

export const CurrentMonthSelector = () => {
  const currentMonth = useStore((state) => state.currentMonth);
  const moveNextMonth = useStore((state) => state.moveNextMonth);
  const movePreviousMonth = useStore((state) => state.movePreviousMonth);
  return (
    <Box className="flex">
      <IconButton
        size="medium"
        onClick={() => {
          movePreviousMonth();
        }}
      >
        <ArrowLeft fontSize="large" />
      </IconButton>
      <Box className="flex flex-col justify-center items-center">
        <Box className="flex font-bold text-[1.2rem] max-h-[22px]">
          {dateFns.format(currentMonth, "MM/yyyy")}
        </Box>
        <Box className="flex max-h-[22px]">
          <Typography variant="caption">Add a note...</Typography>
        </Box>
      </Box>
      <IconButton
        size="medium"
        onClick={() => {
          moveNextMonth();
        }}
      >
        <ArrowRight fontSize="large" />
      </IconButton>
    </Box>
  );
};
