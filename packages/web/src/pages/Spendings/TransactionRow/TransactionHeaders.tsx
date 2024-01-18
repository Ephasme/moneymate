import CalendarIcon from "@mui/icons-material/CalendarToday";
import ChatIcon from "@mui/icons-material/Chat";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import FolderIcon from "@mui/icons-material/Folder";
import PaymentsIcon from "@mui/icons-material/Payments";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Box } from "@mui/material";
import { Checkbox } from "../../Common/Checkbox";

export const TransactionHeaders = () => {
  return (
    <Box className="contents">
      <Box className="header flex items-center border-b-[#BCC0CD] border-b py-2 text-[#999EAD] font-medium gap-1">
        <Checkbox />
      </Box>
      <Box className="header flex items-center px-2 border-b-[#BCC0CD] border-b py-2 text-[#999EAD] font-medium gap-1">
        <ShoppingBagIcon style={{ width: 16, height: 16 }} />
        <Box>Marchand</Box>
      </Box>
      <Box className="header flex items-center px-2 border-b-[#BCC0CD] border-b py-2 text-[#999EAD] font-medium gap-1">
        <CalendarIcon style={{ width: 16, height: 16 }} />
        <Box>Date</Box>
      </Box>
      <Box className="header flex items-center px-2 border-b-[#BCC0CD] border-b py-2 text-[#999EAD] font-medium gap-1">
        <CreditCardIcon style={{ width: 16, height: 16 }} />
        <Box>Compte</Box>
      </Box>
      <Box className="header flex items-center px-2 border-b-[#BCC0CD] border-b py-2 text-[#999EAD] font-medium gap-1">
        <ChatIcon style={{ width: 16, height: 16 }} />
        <Box>Note</Box>
      </Box>
      <Box className="header flex items-center px-2 border-b-[#BCC0CD] border-b py-2 text-[#999EAD] font-medium gap-1">
        <FolderIcon style={{ width: 16, height: 16 }} />
        <Box>Envelope</Box>
      </Box>

      <Box className="header flex items-center justify-end px-2 border-b-[#BCC0CD] border-b text-[#999EAD] font-medium gap-1">
        <PaymentsIcon style={{ width: 16, height: 16 }} />
        <Box>Thune</Box>
      </Box>
      <Box className="header"></Box>
    </Box>
  );
};
