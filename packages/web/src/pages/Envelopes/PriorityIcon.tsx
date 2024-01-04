import { Box } from "@mui/material";
import { FireIcon } from "../../icons/FireIcon";

export const PriorityIcon = ({ level }: { level: 1 | 2 | 3 }) => {
  return (
    <Box className="flex items-center">
      {level <= 3 && (
        <Box className="w-[14px]">
          <FireIcon />
        </Box>
      )}
      {level <= 2 && (
        <Box className="w-[14px]">
          <FireIcon />
        </Box>
      )}
      {level <= 1 && (
        <Box className="w-[14px]">
          <FireIcon />
        </Box>
      )}
    </Box>
  );
};
