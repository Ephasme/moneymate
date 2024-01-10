import { Box } from "@mui/joy";

export const Tag = ({
  startIcon = undefined,
  text,
}: {
  startIcon?: JSX.Element;
  text?: string;
}) => {
  return (
    <Box className="whitespace-nowrap flex gap-1 items-center bg-white rounded-full px-3 text-[0.825rem] leading-4 font-medium">
      {startIcon}
      {text && <Box>{text}</Box>}
    </Box>
  );
};
