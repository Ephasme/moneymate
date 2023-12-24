import {
  FloatingArrow,
  offset,
  useFloating,
  arrow,
  shift,
  useDismiss,
  useInteractions,
} from "@floating-ui/react";
import { Box, Button, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { useAccountsStore } from "./store";
import { NumericFormat } from "react-number-format";
import * as mil from "../../helpers/mil";

export const ReconcileButton = () => {
  const expectedReconciledBalance = useAccountsStore(
    (state) => state.expectedReconciledBalance
  );
  const setExpectedReconciledBalance = useAccountsStore(
    (state) => state.setExpectedReconciledBalance
  );
  const [reconciledBalance, setReconciledBalance] = useState<bigint>(0n);
  const arrowRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { floatingStyles, refs, context } = useFloating({
    onOpenChange: setIsOpen,
    open: isOpen,
    middleware: [arrow({ element: arrowRef }), offset(10), shift()],
  });
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);
  return (
    <Box>
      <Button
        disabled={!!expectedReconciledBalance}
        ref={refs.setReference}
        size="large"
        variant="contained"
        onClick={() => {
          setIsOpen(true);
        }}
        {...getReferenceProps()}
      >
        {expectedReconciledBalance ? "Reconciling..." : "Reconcile"}
      </Button>
      {isOpen && (
        <Box
          className="p-2 bg-white"
          ref={refs.setFloating}
          style={floatingStyles}
          sx={{
            boxShadow: "0px 5px 25px 5px rgba(0,0,0,0.2)",
          }}
          {...getFloatingProps()}
        >
          <FloatingArrow
            className="fill-white"
            ref={arrowRef}
            context={context}
          />
          <Box className="flex gap-2 flex-col">
            <NumericFormat
              inputProps={{
                style: {
                  backgroundColor: "white",
                  textAlign: "right",
                },
              }}
              label="Current balance"
              className="text-right"
              customInput={TextField}
              value={mil.divStr(reconciledBalance)}
              onValueChange={({ value }) => {
                if (value) {
                  setReconciledBalance(mil.mult(value));
                }
              }}
              decimalScale={2}
              decimalSeparator=","
              thousandSeparator=" "
            />
            <Button
              variant="outlined"
              onClick={() => {
                setExpectedReconciledBalance(reconciledBalance);
                setIsOpen(false);
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};
