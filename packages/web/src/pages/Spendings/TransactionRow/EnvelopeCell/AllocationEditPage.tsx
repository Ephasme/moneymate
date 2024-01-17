import AddIcon from "@mui/icons-material/AddCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, IconButton } from "@mui/material";
import _ from "lodash";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../../../helpers/formatCurrency";
import { AmountInput } from "../../../Common/AmountInput";
import { useTransactionRowContext } from "../TransactionRowContext";
import { ActionsMenu } from "./ActionsMenu";
import { useMultiEnvelopeSelectorContext } from "./MultiEnvelopeSelectorContext";
import { SingleEnvelopeSelector } from "./SingleEnvelopeSelector";

export const AllocationEditPage = () => {
  const { transaction } = useTransactionRowContext();
  const [errors, setErrors] = useState<string[]>([]);
  const [amountDiff, setAmountDiff] = useState(0n);
  const {
    selection,
    envelopes,
    addEnvelope,
    removeEnvelope,
    setEnvelope,
    setAmount,
    setStep,
    closeSelf,
    submit,
  } = useMultiEnvelopeSelectorContext();

  useEffect(() => {
    const errors = [];
    if (amountDiff !== 0n) {
      errors.push("Les montants doivent correspondre au montant total");
    }
    if (_.some(selection, (x) => !x.envelopeId)) {
      errors.push("Toutes les enveloppes doivent être sélectionnées");
    }
    setErrors(errors);
  }, [amountDiff, selection]);

  useEffect(() => {
    setAmountDiff(
      transaction.amount -
        selection.reduce((acc, x) => acc + (x.amount ?? 0n), 0n)
    );
  }, [selection, transaction.amount]);

  return (
    <Box>
      <Box className="flex items-center gap-2 px-4 py-1 border-b border-[#0000001f] ">
        <Box className="flex items-center flex-grow">
          <IconButton
            onClick={() => {
              setStep(0);
            }}
          >
            <ArrowBackIcon sx={{ fill: "#999EAD" }} />
          </IconButton>
          <Box className="flex-grow font-medium">
            Montant total à répartir :
          </Box>
        </Box>
        <Box className="font-bold">/ {formatCurrency(transaction.amount)}</Box>
        <Box>
          <ActionsMenu />
        </Box>
      </Box>
      <Box className="grid gap-2 py-3 px-4 grid-cols-[auto_auto_40px]">
        {selection.map(({ id, envelopeId, amount }) => (
          <Box
            className="contents"
            sx={{
              "&:not(:hover) .trash-icon": {
                display: "none",
              },
            }}
          >
            <SingleEnvelopeSelector
              value={envelopes.find((x) => x.id === envelopeId) ?? null}
              onChange={(value) => {
                if (value) {
                  setEnvelope(id, value.id);
                }
              }}
            />
            <AmountInput
              value={amount ?? 0n}
              onChange={(value) => {
                if (value) {
                  setAmount(id, value);
                }
              }}
              className="outline-none border-b border-[#999EAD] hover:border-b-2 focus:border-b-2 text-right"
            />
            <Box className="w-[48px]">
              <IconButton
                onClick={() => {
                  removeEnvelope(id);
                }}
                className="trash-icon"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
        <Box
          onClick={() => {
            addEnvelope();
          }}
          className="col-span-3 flex gap-1 items-center font-medium text-[#0039F2] cursor-pointer"
        >
          <Box className="pb-1">
            <AddIcon fontSize="small" />
          </Box>
          <Box className="py-3">Ajouter une enveloppe</Box>
        </Box>
      </Box>
      <Box className="flex gap-2 py-4 px-4 justify-end border-t border-[##0000001f]">
        <Button
          onClick={() => {
            closeSelf();
          }}
          variant="outlined"
        >
          Annuler
        </Button>
        <Button
          onClick={() => {
            submit();
          }}
          disabled={errors.length > 0}
          variant="outlined"
        >
          Valider
        </Button>
      </Box>
    </Box>
  );
};
