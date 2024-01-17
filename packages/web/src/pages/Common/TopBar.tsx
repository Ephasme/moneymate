import { MAIN_ENVELOPE_ID } from "@moneymate/shared";
import { Avatar, Box } from "@mui/material";
import { formatCurrency } from "../../helpers/formatCurrency";
import { useEnvelope } from "../../hooks/queries";
import { MonthSelector } from "./MonthSelector";
import { useStore } from "../../store";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TuneIcon from "@mui/icons-material/Tune";

const TopBarReadyToAssign = () => {
  const isCollapsed = useStore((state) => state.leftPanelCollapsed);
  const { data: mainEnvelope } = useEnvelope(MAIN_ENVELOPE_ID);

  if (!isCollapsed) return null;
  if (!mainEnvelope) return null;

  return (
    <Box className="flex items-center font-medium text-2xl mr-6">
      {formatCurrency(mainEnvelope.balance)}
    </Box>
  );
};

export const TopBar = ({ leftPart }: { leftPart?: React.ReactNode } = {}) => {
  return (
    <Box className="flex flex-grow items-center justify-between">
      <Box>{leftPart}</Box>
      <Box className="flex items-center justify-end min-h-[4.7rem] pr-8">
        <TopBarReadyToAssign />
        <Box className="flex mr-[1.5rem]">
          <SearchIcon />
        </Box>
        <MonthSelector />
        <Box className="mr-[1.5rem]">
          <TuneIcon />
        </Box>
        <Box className="mr-[1.5rem]">
          <MoreVertIcon />
        </Box>
        <Box className="flex items-center">
          <Avatar sx={{ height: "2.5rem", width: "2.5rem" }} />
          <Box className="flex flex-col leading-4 ml-3 w-[6rem]">
            <Box className="text-ellipsis overflow-hidden font-bold">
              Cassandra
            </Box>
            <Box className="text-ellipsis overflow-hidden">
              cassandra.de.carvalho@gmail.com
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
