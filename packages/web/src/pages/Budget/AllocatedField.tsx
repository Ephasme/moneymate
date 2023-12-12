import { MAIN_ENVELOPE_ID } from "@moneymate/shared";
import { Box, ClickAwayListener } from "@mui/material";
import { useEffect, useState } from "react";
import { useStore } from "../../store";
import { formatCurrency } from "../../helpers/formatCurrency";
import { useEnvelope } from "../Common/useEnvelope";
import { NumericFormat } from "react-number-format";
import { useSaveTransfer } from "../Common/useSaveTransfer";
import * as mil from "../../helpers/mil";

export const AllocatedField = ({ envelopeId }: { envelopeId: string }) => {
  const envelope = useEnvelope(envelopeId);
  const budgetId = useStore((state) => state.budgetId);
  const [mode, setMode] = useState<"edit" | "view">("view");
  const [newValue, setNewValue] = useState<bigint>(0n);
  const { mutate: saveTransfer } = useSaveTransfer();

  useEffect(() => {
    if (envelope) {
      setNewValue(envelope.allocated);
    }
  }, [envelope]);

  if (!envelope) return <Box>Loading...</Box>;

  if (mode === "edit") {
    return (
      <ClickAwayListener
        onClickAway={() => {
          setMode("view");
        }}
      >
        <Box>
          <NumericFormat
            autoFocus
            value={mil.div(newValue)}
            onValueChange={(ev) => {
              if (ev.value) {
                setNewValue(mil.mult(ev.value));
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveTransfer({
                  budgetId,
                  fromEnvelopeId: MAIN_ENVELOPE_ID,
                  toEnvelopeId: envelope.id,
                  amount: (newValue - envelope.allocated).toString(),
                });
                setMode("view");
              }
            }}
            decimalScale={2}
            thousandSeparator={" "}
            decimalSeparator=","
            className="font-number border border-solid border-[#685555] rounded-md text-right pl-2 pr-2"
          />
        </Box>
      </ClickAwayListener>
    );
  }

  return (
    <Box
      onClick={() => {
        setMode("edit");
      }}
      className={
        "bg-white border border-solid border-white hover:border-[#0000ff] " +
        "rounded-md pl-2 pr-2 text-right hover:cursor-text flex-grow font-number"
      }
    >
      {formatCurrency(envelope.allocated)}
    </Box>
  );
};
