import { Box } from "@mui/joy";
import { TopBar } from "../Common";

export const MainLayout = ({
  leftPanel,
  rightPanel,
  children,
}: {
  leftPanel?: React.ReactNode;
  rightPanel?: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <Box className="grid grid-cols-[auto_1fr_auto] grid-rows-[auto_1fr] w-screen h-screen">
      <Box className="flex row-span-2">{leftPanel}</Box>
      <Box className="flex justify-end col-span-2">
        <TopBar />
      </Box>
      {children}
      {rightPanel && <Box className="flex">{rightPanel}</Box>}
    </Box>
  );
};
