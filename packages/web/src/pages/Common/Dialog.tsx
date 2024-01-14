import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react";
import { Box } from "@mui/material";
import { useState } from "react";

export const Dialog = ({
  Trigger,
  children,
}: {
  Trigger: (props: { onOpen: () => void }) => React.ReactNode;
  children: (props: { onClose: () => void }) => React.ReactNode;
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
      <Box ref={refs.setReference} {...getReferenceProps()}>
        <Trigger onOpen={() => setIsOpened(true)} />
      </Box>

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
                {children({
                  onClose: () => {
                    setIsOpened(false);
                  },
                })}
              </Box>
            </FloatingFocusManager>
          </FloatingOverlay>
        )}
      </FloatingPortal>
    </>
  );
};
