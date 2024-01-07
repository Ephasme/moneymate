import { Box, ButtonBase } from "@mui/material";
import { BigPlusIcon } from "../../icons/BigPlusIcon";
import React, { useState } from "react";
import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react";
// ABCDEFGHIJKLMNOPQRSTUVWXYZ
// ZYXWVUTSRQPONMLKJIHGFEDCBA
// RÉUSIT

export const MainButton = ({
  text,
  modal: Modal,
  collapsed,
}: {
  text: string;
  modal: ({ onClose }: { onClose: () => void }) => React.ReactElement;
  collapsed?: boolean;
}) => {
  const [isOpen, setIsOpened] = useState(false);
  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpened,
  });
  const dismiss = useDismiss(context);
  const { getFloatingProps, getReferenceProps } = useInteractions([dismiss]);
  return (
    <>
      <ButtonBase
        onClick={() => setIsOpened(true)}
        ref={refs.setReference}
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
        {...getReferenceProps()}
      >
        <BigPlusIcon />
        {!collapsed && <Box className="font-semibold">{text}</Box>}
      </ButtonBase>
      <FloatingPortal>
        {isOpen && (
          <FloatingOverlay
            className="grid place-items-center"
            style={{
              background: "rgba(0, 0, 0, 0.24)",
            }}
          >
            <FloatingFocusManager context={context}>
              <Box
                className=" bg-white rounded-2xl min-w-[35rem]"
                ref={refs.setFloating}
                {...getFloatingProps()}
              >
                <Modal onClose={() => setIsOpened(false)} />
              </Box>
            </FloatingFocusManager>
          </FloatingOverlay>
        )}
      </FloatingPortal>
    </>
  );
};
