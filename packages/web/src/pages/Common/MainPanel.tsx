import { Box } from "@mui/material";

export const MainPanel = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box className="flex flex-col flex-grow bg-main-panel mr-4 mb-4 rounded-[2rem] overflow-y-auto">
      {children}
    </Box>
  );
};
