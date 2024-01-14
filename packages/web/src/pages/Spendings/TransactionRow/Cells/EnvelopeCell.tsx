import { Autocomplete, Box, TextField } from "@mui/material";
import { produce } from "immer";
import { useEnvelopes } from "../../../../hooks/queries";
import { useTransactionRowContext } from "../useTransactionContext";

export const EnvelopeCell = () => {
  const { transaction, isEditing, setTransaction, setIsEditing } =
    useTransactionRowContext();

  const { data: envelopes = [] } = useEnvelopes();

  if (isEditing && transaction.allocations.length === 1) {
    const allocation = transaction.allocations[0];
    return (
      <Autocomplete
        options={envelopes}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(props) => <TextField {...props} variant="standard" />}
        fullWidth
        value={
          envelopes.find((env) => env.id === allocation.envelopeId) ?? null
        }
        onChange={(_, value) => {
          if (value) {
            setTransaction(
              produce((transaction) => {
                const allocation = transaction.allocations[0];
                allocation.envelopeId = value.id;
                allocation.envelopeName = value.name;
                allocation.amount = transaction.amount;
              })
            );
          }
        }}
      />
    );
  }

  return transaction.allocations.length === 1 ? (
    <Box
      className="flex items-center w-full h-full"
      onClick={() => {
        setIsEditing(true);
      }}
    >
      <Box>{transaction.allocations[0].envelopeName}</Box>
    </Box>
  ) : transaction.allocations.length > 1 ? (
    <Box
      onClick={() => {
        setIsEditing(true);
      }}
      className="italic"
    >
      Dépense divisée
    </Box>
  ) : (
    <Box
      onClick={() => {
        setIsEditing(true);
      }}
      className="text-[#ED4800] font-bold underline underline-offset-2"
    >
      Assigner une enveloppe
    </Box>
  );
};
