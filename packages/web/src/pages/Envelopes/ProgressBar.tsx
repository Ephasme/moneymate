import { Box } from "@mui/joy";
import ProgressBarImage from "../../assets/ProgressBar.png";

export const ProgressBar = () => {
  return (
    <Box className="relative">
      <Box
        className="rounded-full h-[0.375rem]"
        sx={{ backgroundColor: "#37B6AE" }}
      ></Box>
      <Box
        className="rounded-s-full h-[0.375rem] w-[50%] absolute top-0 left-0"
        sx={{ backgroundImage: `url(${ProgressBarImage})` }}
      ></Box>
    </Box>
  );
};
