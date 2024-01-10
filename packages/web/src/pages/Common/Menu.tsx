import { Box } from "@mui/joy";
import React, { useState } from "react";
import {
  useFloating,
  useClick,
  useDismiss,
  flip,
  useInteractions,
  FloatingPortal,
} from "@floating-ui/react";

export type MenuProps = {
  trigger: (props: { onOpen: () => void }) => React.ReactNode;
  children:
    | ((props: { onClose: () => void }) => React.ReactNode)
    | React.ReactNode;
  placement?: "bottom" | "left" | "right";
};

export const Menu = ({
  trigger: Trigger,
  children: Children,
  placement,
}: MenuProps) => {
  const [open, setOpen] = useState(false);
  const { refs, context, floatingStyles } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    middleware: [flip()],
  });
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);
  return (
    <>
      <Box className="w-full" ref={refs.setReference} {...getReferenceProps()}>
        <Trigger onOpen={() => setOpen(true)} />
      </Box>
      <FloatingPortal>
        {open && (
          <Box
            className="flex flex-col items-center bg-white rounded-lg py-3"
            sx={{
              boxShadow:
                "0px 0px 16px 0px rgba(0, 0, 0, 0.04), 0px 0px 8px 0px rgba(0, 0, 0, 0.13)",
            }}
            style={floatingStyles}
            ref={refs.setFloating}
            {...getFloatingProps()}
          >
            {typeof Children === "function" ? (
              <Children onClose={() => setOpen(false)} />
            ) : (
              Children
            )}
          </Box>
        )}
      </FloatingPortal>
    </>
  );
};
