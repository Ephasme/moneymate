import { Box } from "@mui/material";
import FireIcon from "@mui/icons-material/LocalFireDepartment";

export const PriorityIcon = ({ level }: { level: 1 | 2 | 3 }) => {
  return (
    <Box className="flex items-center">
      {level <= 3 && (
        <Box className="w-[14px]">
          <FireIcon fontSize="small" />
        </Box>
      )}
      {level <= 2 && (
        <Box className="w-[14px]">
          <FireIcon fontSize="small" />
        </Box>
      )}
      {level <= 1 && (
        <Box className="w-[14px]">
          <FireIcon fontSize="small" />
        </Box>
      )}
    </Box>
  );
};
