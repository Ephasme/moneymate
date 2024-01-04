import {
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react";
import { Box, ButtonBase } from "@mui/material";
import { useState } from "react";
import { SmallArrowDownIcon } from "../../icons/SmallArrowDownIcon";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useStore } from "../../store";
import * as fns from "date-fns";
import { fr } from "date-fns/locale";
import _ from "lodash";

export const MonthSelector = () => {
  const [open, setOpen] = useState(false);
  const currentMonth = useStore((state) => state.currentMonth);
  const setCurrentMonth = useStore((state) => state.setCurrentMonth);
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
  });
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getFloatingProps, getReferenceProps } = useInteractions([
    click,
    dismiss,
  ]);
  return (
    <>
      <Box
        onClick={() => setOpen(true)}
        ref={refs.setReference}
        className="cursor-pointer flex items-center mr-[1.5rem]"
        {...getReferenceProps()}
      >
        <Box className="mr-[0.37rem] font-bold">
          {_.capitalize(fns.format(currentMonth, "MMM yyyy", { locale: fr }))}
        </Box>
        <Box>
          <SmallArrowDownIcon />
        </Box>
      </Box>
      <FloatingPortal>
        {open && (
          <Box
            className="flex flex-col items-center justify-center bg-white rounded-2xl p-8"
            sx={{
              boxShadow:
                "0px 0px 8px 0px rgba(0, 0, 0, 0.08), 0px 0.5px 0px 0px rgba(0, 0, 0, 0.12)",
            }}
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            <Box className="flex gap-1 justify-center items-center w-full border-b-[0.5px] pb-5 mb-4 border-b-[#999EAD]">
              <ButtonBase
                onClick={() => {
                  setCurrentMonth(fns.subYears(currentMonth, 1));
                }}
                style={{ borderRadius: "999rem" }}
              >
                <ArrowLeftIcon />
              </ButtonBase>
              <Box className="font-bold">{fns.getYear(currentMonth)}</Box>
              <ButtonBase
                onClick={() => {
                  setCurrentMonth(fns.addYears(currentMonth, 1));
                }}
                style={{ borderRadius: "999rem" }}
              >
                <ArrowRightIcon />
              </ButtonBase>
            </Box>
            <Box
              className={`grid items-center justify-start grid-cols-3 gap-x-4 gap-y-2`}
            >
              {_.range(12).map((month) => (
                <Box
                  onClick={() => {
                    setCurrentMonth(fns.setMonth(currentMonth, month));
                  }}
                  className={`cursor-pointer max-w-fit ${
                    fns.getMonth(currentMonth) === month
                      ? "bg-[#F2F4F8] py-1 px-3 rounded-2xl"
                      : "py-1 px-3"
                  }`}
                >
                  {_.capitalize(
                    fns.format(fns.setMonth(currentMonth, month), "MMMM", {
                      locale: fr,
                    })
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </FloatingPortal>
    </>
  );
};
