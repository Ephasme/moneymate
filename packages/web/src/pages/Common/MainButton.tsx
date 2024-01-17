import { Box, ButtonBase } from "@mui/material";

export const MainButton = ({
  text,
  onClick = () => {},
  collapsed,
}: {
  text: string;
  onClick?: () => void;
  collapsed?: boolean;
}) => {
  return (
    <ButtonBase
      onClick={() => onClick()}
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
      {!collapsed && <Box className="font-semibold">{text}</Box>}
    </ButtonBase>
  );
};
