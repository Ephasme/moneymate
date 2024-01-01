import DeleteIcon from "@mui/icons-material/Delete";
import { Autocomplete, Box, IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useEnvelopes } from "../../hooks/queries/useEnvelopes";

export type AllocationEditorItemDeleted = {
  id: string;
  hasChanged: boolean;
  status: "deleted";
};
export type AllocationEditorItemPartial = {
  id: string;
  hasChanged: boolean;
  status: "partial";
  envelopeId?: string;
  amount?: bigint;
};
export type AllocationEditorItemFull = {
  id: string;
  hasChanged: boolean;
  status: "full";
  envelopeId: string;
  amount: bigint;
};
export type AllocationEditorItem =
  | AllocationEditorItemPartial
  | AllocationEditorItemFull
  | AllocationEditorItemDeleted;
export type AllocationEditorOnChangeEvent = {
  envelopeId?: string;
  amount?: bigint;
};

export const AllocationEditor = ({
  allocation,
  onChange,
  onRemove,
}: {
  allocation: AllocationEditorItemPartial | AllocationEditorItemFull;
  onChange: (value: AllocationEditorItemFull) => void;
  onRemove: () => void;
}) => {
  const [internalAllocation, setInternalAllocation] = useState<
    AllocationEditorItemPartial | AllocationEditorItemFull
  >(allocation);

  const { data: envelopes } = useEnvelopes();

  useEffect(() => {
    if (internalAllocation.amount && internalAllocation.envelopeId) {
      onChange({
        ...internalAllocation,
        status: "full",
        amount: internalAllocation.amount,
        envelopeId: internalAllocation.envelopeId,
      });
    }
  }, [internalAllocation]);

  if (!envelopes) return <Box>Loading...</Box>;

  return (
    <Box className="flex">
      <Autocomplete
        size="small"
        className="flex-grow"
        getOptionLabel={(x) => x.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        options={envelopes.filter((x) => !x.isHidden) ?? []}
        onChange={(_, value) => {
          if (value) {
            setInternalAllocation({
              ...internalAllocation,
              hasChanged: true,
              envelopeId: value.id,
            });
          }
        }}
        value={
          allocation && "envelopeId" in allocation
            ? envelopes.find((x) => x.id === allocation.envelopeId)
            : null
        }
        renderInput={(params) => <TextField {...params} label="Envelope" />}
      />
      <Box className="flex-grow w-0 min-w-[30px]">
        <NumericFormat
          value={"amount" in allocation ? allocation.amount?.toString() : 0}
          onValueChange={({ value }) => {
            if (value) {
              setInternalAllocation({
                ...internalAllocation,
                hasChanged: true,
                amount: BigInt(value),
              });
            }
          }}
        />
      </Box>
      <Box>
        <IconButton size="small" onClick={onRemove}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
