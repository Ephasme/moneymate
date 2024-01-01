import { Avatar, Box } from "@mui/material";
import { DotsVerticalIcon } from "../../icons/DotsVerticalIcon";
import { DottedBarsIcon } from "../../icons/DottedBarsIcon";
import { SmallArrowDownIcon } from "../../icons/SmallArrowDownIcon";
import { MagnifierIcon } from "../../icons/MagnifierIcon";

export const TopBar = () => {
  return (
    <Box className="flex items-center justify-end h-[4.7rem] pr-8">
      <Box className="flex mr-[1.5rem]">
        <MagnifierIcon />
      </Box>
      <Box className="flex items-center mr-[1.5rem]">
        <Box className="mr-[0.37rem] font-bold">Déc. 2023</Box>
        <Box>
          <SmallArrowDownIcon />
        </Box>
      </Box>
      <Box className="mr-[1.5rem]">
        <DottedBarsIcon />
      </Box>
      <Box className="mr-[1.5rem]">
        <DotsVerticalIcon />
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
  );
};
