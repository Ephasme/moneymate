import AddIcon from "@mui/icons-material/AddCircleOutline";
import RemoveIcon from "@mui/icons-material/RemoveCircleOutline";
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import classNames from "classnames";
import { produce } from "immer";
import { NumericFormat } from "react-number-format";
import { v4 as uuid } from "uuid";
import * as mil from "../../../helpers/mil";
import { useEnvelopes } from "../../../hooks/queries";
import { AmountSpan } from "../../Common";
import { AllocationEdit } from "../../TransactionEdit";
import { useTransactionRowContext } from "./useTransactionContext";

const useCommonProps = (
  { noEdit = false }: { noEdit: boolean } = { noEdit: false }
) => {
  const { isHovered, setIsHovered, setIsEditing } = useTransactionRowContext();
  return (className?: string) => ({
    className: classNames(
      ["cursor-pointer", "flex", "items-center", "h-full", "flex-grow"],
      { "bg-[#EAE8F2]": isHovered }
    ).concat(" " + className ?? ""),
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    onClick: () => {
      if (!noEdit) setIsEditing(true);
    },
  });
};

export const ButtonsTransactionSplit = () => {
  const { setIsEditing, resetTransaction } = useTransactionRowContext();
  const commonProps = useCommonProps({
    noEdit: true,
  });
  return (
    <Box {...commonProps("flex justify-end col-span-6")}>
      <Button>Sauver</Button>
      <Button
        onClick={() => {
          setIsEditing(false);
          resetTransaction();
        }}
      >
        Annuler
      </Button>
    </Box>
  );
};

export const SpaceTransactionSplit = () => {
  const commonProps = useCommonProps();
  return (
    <Box {...commonProps("pb-3 col-span-6 border-b border-b-black")}></Box>
  );
};

export const AddTransactionSplit = ({}) => {
  const { setTransaction } = useTransactionRowContext();
  const commonProps = useCommonProps();
  return (
    <>
      <Box {...commonProps()}></Box>
      <Box {...commonProps()}></Box>
      <Box {...commonProps()}>
        <Box className="flex flex-grow justify-end">
          <IconButton
            onClick={() => {
              setTransaction(
                produce((transaction) => {
                  transaction.allocations.push({
                    id: uuid(),
                    envelopeId: null,
                    envelopeName: null,
                    amount: 0n,
                  });
                })
              );
            }}
            size="small"
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Box>
      <Box {...commonProps()}>Ajouter une enveloppe...</Box>
      <Box {...commonProps()}></Box>
      <Box {...commonProps()}></Box>
    </>
  );
};

export const TransactionSplit = ({
  allocation,
  onChange,
}: {
  allocation: AllocationEdit;
  onChange: (allocation: AllocationEdit) => void;
}) => {
  const { isEditing, setTransaction } = useTransactionRowContext();
  const { data: envelopes = [] } = useEnvelopes();
  const commonProps = useCommonProps();
  if (isEditing) {
    return (
      <>
        <Box {...commonProps()}></Box>
        <Box {...commonProps()}></Box>
        <Box {...commonProps()}>
          <Box className="flex flex-grow justify-end">
            <IconButton
              onClick={() => {
                setTransaction(
                  produce((transaction) => {
                    transaction.allocations = transaction.allocations.filter(
                      (a) => a.id !== allocation.id
                    );
                  })
                );
              }}
              size="small"
            >
              <RemoveIcon />
            </IconButton>
          </Box>
        </Box>
        <Box {...commonProps()}>
          <Box className="w-full pr-3">
            <Autocomplete
              options={envelopes}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(props) => (
                <TextField {...props} variant="standard" />
              )}
              fullWidth
              value={
                envelopes.find((env) => env.id === allocation.envelopeId) ??
                null
              }
              onChange={(_, value) => {
                if (value) {
                  onChange({
                    id: allocation.id,
                    envelopeId: value.id,
                    envelopeName: value.name,
                    amount: allocation.amount,
                  });
                }
              }}
            />
          </Box>
        </Box>
        <Box {...commonProps()}>
          <Box className="w-full text-right">
            <NumericFormat
              value={mil.divToNumber(allocation.amount)}
              customInput={TextField}
              variant="standard"
              sx={{
                "& input": {
                  textAlign: "right",
                },
              }}
              onValueChange={({ value }) => {
                if (value) {
                  onChange({
                    id: allocation.id,
                    envelopeId: allocation.envelopeId,
                    envelopeName: allocation.envelopeName,
                    amount: mil.mult(value),
                  });
                }
              }}
            />
          </Box>
        </Box>
        <Box {...commonProps()}></Box>
      </>
    );
  }
  return (
    <>
      <Box {...commonProps()}></Box>
      <Box {...commonProps()}></Box>
      <Box {...commonProps()}></Box>
      <Box {...commonProps()}>
        <Box className="">{allocation.envelopeName}</Box>
      </Box>
      <Box {...commonProps()}>
        <Box className="w-full text-right">
          <AmountSpan amount={allocation.amount} creditColor explicitPositive />
        </Box>
      </Box>
      <Box {...commonProps()}></Box>
    </>
  );
};
