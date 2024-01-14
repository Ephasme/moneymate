import { Box, ButtonBase } from "@mui/material";
import { BigPlusIcon } from "../../icons/BigPlusIcon";

export const MainButton = ({
  text,
  setIsOpened,
  collapsed,
}: {
  text: string;
  setIsOpened: (value: boolean) => void;
  collapsed?: boolean;
}) => {
  return (
    <ButtonBase
      onClick={() => setIsOpened(true)}
      sx={{
        "&.MuiButtonBase-root": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "0.93rem",
          gap: "1rem",
          paddingTop: "0.88rem",
          paddingBottom: "0.88rem",
          paddingLeft: collapsed ? "0.88rem" : "2rem",
          paddingRight: collapsed ? "0.88rem" : "2rem",
          lineHeight: "normal",
          color: "#FFF",
          fontFamily: 'Montserrat, "sans-serif"',
          borderRadius: "3rem",
          background: "#212121",
        },
      }}
    >
      <BigPlusIcon />
      {!collapsed && <Box className="font-semibold">{text}</Box>}
    </ButtonBase>
  );
};
