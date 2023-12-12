import { Box, Button } from "@mui/material";
import { produce } from "immer";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { useTransaction } from "../Common/useTransaction";
import {
  AllocationEditor,
  AllocationEditorItem,
  AllocationEditorItemFull,
  AllocationEditorItemPartial,
} from "./AllocationEditor";

export const EnvelopeSelector = ({
  transactionId,
  onChange,
}: {
  transactionId?: string;
  onChange?: (value: Array<AllocationEditorItem>) => void;
}) => {
  const [allocations, setAllocations] = useState<
    Record<string, AllocationEditorItem>
  >({});
  const { data: transaction } = useTransaction(transactionId);

  useEffect(() => {
    if (transaction) {
      setAllocations(
        Object.fromEntries(
          transaction.allocations.map((x): [string, AllocationEditorItem] => [
            x.id,
            {
              id: x.id,
              status: "full",
              hasChanged: false,
              envelopeId: x.envelopeId,
              amount: x.amount,
            },
          ])
        )
      );
    }
  }, [transaction]);

  useEffect(() => {
    onChange?.(Object.values(allocations));
  }, [allocations]);

  return (
    <Box>
      {Object.values(allocations)
        .filter(
          (
            alloc
          ): alloc is AllocationEditorItemFull | AllocationEditorItemPartial =>
            alloc.status !== "deleted"
        )
        .map((allocation) => (
          <AllocationEditor
            key={allocation.id}
            allocation={allocation}
            onRemove={() => {
              setAllocations(
                produce((allocations) => {
                  allocations[allocation.id] = {
                    id: allocation.id,
                    status: "deleted",
                    hasChanged: true,
                  };
                })
              );
            }}
            onChange={(value) => {
              setAllocations(
                produce((allocations) => {
                  allocations[allocation.id] = value;
                })
              );
            }}
          />
        ))}

      <Button
        onClick={() => {
          setAllocations(
            produce((allocations) => {
              const id = uuid();
              allocations[id] = {
                id,
                hasChanged: false,
                status: "partial",
              };
            })
          );
        }}
      >
        Add split
      </Button>
    </Box>
  );
};
