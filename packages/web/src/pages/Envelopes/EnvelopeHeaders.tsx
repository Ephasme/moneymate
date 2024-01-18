import InsertChartIcon from "@mui/icons-material/InsertChart";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import PaymentsIcon from "@mui/icons-material/Payments";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import { Box } from "@mui/material";
import { Checkbox } from "../Common/Checkbox";

export const EnvelopeHeaders = () => {
  return (
    <Box
      className="contents"
      sx={{
        "& > div": {
          display: "flex",
          alignItems: "center",
          gap: "0.25rem",
          fontSize: "0.875rem",
          padding: "0rem 0.5rem 0.5rem 0.5rem",
          color: "#999EAD",
          borderBottom: "1px solid #BCC0CD",
        },
        "& > div:first-child,div:last-child": {
          borderBottom: "none",
        },
      }}
    >
      <Box></Box>
      <Box>
        <Checkbox />
      </Box>
      <Box>
        <TextFieldsIcon style={{ width: 16, height: 16 }} />
        <Box>Nom</Box>
      </Box>
      <Box>
        <InsertChartIcon style={{ width: 16, height: 16 }} />
        <Box>Chart</Box>
      </Box>
      <Box>
        <LocalFireDepartmentIcon style={{ width: 16, height: 16 }} />
        <Box>Prio</Box>
      </Box>
      <Box className="flex justify-end">
        <PaymentsIcon style={{ width: 16, height: 16 }} />
        <Box>Assigné</Box>
      </Box>
      <Box className="flex justify-end">
        <PaymentsIcon style={{ width: 16, height: 16 }} />
        <Box>Restant</Box>
      </Box>
      <Box></Box>
    </Box>
  );
};
