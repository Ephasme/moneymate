import { AllocationEdited } from "@moneymate/shared";
import { Autocomplete, TextField } from "@mui/material";
import { v4 as uuid } from "uuid";
import { useEnvelopes } from "../../hooks/queries/useEnvelopes";
import { produce } from "immer";

export const SingleAllocationEditor = ({
  allocation,
  onChange,
}: {
  allocation?: AllocationEdited;
  onChange?: (allocations: AllocationEdited[]) => void;
}) => {
  const { data: envelopes } = useEnvelopes();

  if (!envelopes) return null;

  return (
    <Autocomplete
      size="small"
      sx={{
        "& .MuiInputBase-root": {
          backgroundColor: "white",
        },
      }}
      options={envelopes}
      value={
        envelopes.find((x) => {
          if (allocation && allocation.status === "active") {
            return x.id === allocation.envelopeId;
          }
        }) ?? null
      }
      onChange={(_, newEnvelope) => {
        const newAllocation = produce(allocation, (draft) => {
          if (!draft && newEnvelope?.id) {
            return {
              id: uuid(),
              envelopeId: newEnvelope.id,
              amount: 0n,
              status: "active" as const,
            };
          } else if (draft && newEnvelope?.id) {
            if (draft.status === "active") {
              return {
                ...draft,
                envelopeId: newEnvelope.id,
              };
            }
          } else if (draft?.id && !newEnvelope?.id) {
            return {
              id: draft.id,
              status: "deleted" as const,
            };
          } else {
            draft;
          }
          return draft;
        });
        if (newAllocation) {
          onChange?.([newAllocation]);
        }
      }}
      getOptionLabel={(x) => x.name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => <TextField {...params} label="Envelope" />}
    />
  );
};
