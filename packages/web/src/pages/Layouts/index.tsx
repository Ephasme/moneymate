import { Box } from "@mui/material";
import { LeftPanel, TopBar } from "../Common";

export const MainLayout = ({
  leftPanel = <LeftPanel />,
  children,
}: {
  leftPanel?: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <Box className="flex w-screen h-screen">
      <Box className="flex">{leftPanel}</Box>
      <Box className="flex flex-grow flex-col">
        <TopBar />
        {children}
      </Box>
    </Box>
  );
};
