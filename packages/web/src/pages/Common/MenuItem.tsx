import { Box } from "@mui/joy";
import React from "react";

export const MenuItem = ({
  onClick = () => {},
  text,
  endIcon,
}: {
  onClick?: () => void;
  text: string;
  endIcon?: React.ReactNode;
}) => {
  return (
    <Box
      onClick={onClick}
      className="w-full flex justify-between hover:bg-[#EBEFFA] cursor-pointer px-5 py-3"
    >
      <Box>{text}</Box>
      <Box>{endIcon}</Box>
    </Box>
  );
};
