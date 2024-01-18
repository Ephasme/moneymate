import {
  FloatingPortal,
  autoUpdate,
  useFloating,
  flip,
} from "@floating-ui/react";
import { EnvelopeView } from "@moneymate/shared";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Box, ClickAwayListener } from "@mui/material";
import { useState } from "react";
import { useEnvelopes } from "../../../../hooks/queries";
import { EnvelopeName } from "../../../Common/EnvelopeName";
import { formatCurrency } from "../../../../helpers/formatCurrency";

export const SingleEnvelopeSelector = ({
  value,
  onChange,
}: {
  value: EnvelopeView | null;
  onChange: (value: EnvelopeView | null) => void;
}) => {
  const { data: envelopes = [] } = useEnvelopes();
  const [open, setOpen] = useState(false);
  const { refs, floatingStyles } = useFloating({
    open,
    onOpenChange: setOpen,
    whileElementsMounted(referenceEl, floatingEl, update) {
      const cleanup = autoUpdate(referenceEl, floatingEl, update, {
        ancestorScroll: true,
      });
      return cleanup;
    },
    middleware: [flip()],
  });

  return (
    <ClickAwayListener
      onClickAway={() => {
        setOpen(false);
      }}
    >
      <Box className="contents">
        <Box
          className="flex px-3 py-2 cursor-pointer border border-[#E7E7E8] w-full rounded-lg"
          onClick={() => {
            setOpen(true);
          }}
          ref={refs.setReference}
        >
          <Box className="flex-grow">
            {value ? <EnvelopeName id={value.id} /> : "Select an envelope"}
          </Box>
          <ArrowDropDownIcon sx={{ fill: "#6D6F7B" }} />
        </Box>
        <FloatingPortal>
          {open && (
            <Box
              className="bg-white py-3 shadow-main"
              ref={refs.setFloating}
              style={floatingStyles}
            >
              <Box>
                <input className="border mx-3 my-2 px-2 py-2 rounded-md" />
                <Box
                  className="overflow-auto"
                  sx={{
                    maxHeight: "20vh",
                  }}
                >
                  {envelopes.map((envelope) => (
                    <Box
                      key={envelope.id}
                      className="flex items-center justify-between cursor-pointer px-3 py-2 hover:bg-slate-50"
                      onClick={() => {
                        onChange(envelope);
                        setOpen(false);
                      }}
                    >
                      <EnvelopeName id={envelope.id} />
                      <Box>{formatCurrency(envelope.balance)}</Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          )}
        </FloatingPortal>
      </Box>
    </ClickAwayListener>
  );
};
