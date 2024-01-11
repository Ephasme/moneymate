import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react";
import { TransactionView } from "@moneymate/shared";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { usePatchTransactions } from "../../../hooks/queries";
import { TransactionAllocator } from "../TransactionAllocator";

export const AssignEnvelope = ({
  trigger: Trigger,
  onOpenChange: _onOpenChange = () => {},
  transaction,
}: {
  trigger: (props: { onClick: () => void }) => React.ReactNode;
  onOpenChange: (value: boolean) => void;
  transaction: TransactionView;
}) => {
  const { mutate: patchTransactions } = usePatchTransactions();
  const [allocationItems, setAllocationItems] = useState(
    transaction.allocations.map((a) => {
      return {
        envelopeId: a.envelopeId,
        amount: a.amount,
      };
    })
  );

  const onOpenChange = (value: boolean) => {
    _onOpenChange(value);
    setIsDialogOpen(value);
  };

  const onSubmit = () => {
    console.log({ allocationItems });
    patchTransactions(
      [
        {
          id: transaction.id,
          allocations: allocationItems.map((a) => {
            return {
              envelopeId: a.envelopeId,
              amount: a.amount.toString(),
            };
          }),
        },
      ],
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      }
    );
  };

  const [errors, setErrors] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { refs, context } = useFloating({
    open: isDialogOpen,
    onOpenChange,
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
        ref={refs.setReference}
        onClick={() => {
          onOpenChange(true);
        }}
        {...getReferenceProps()}
      >
        <Trigger
          onClick={() => {
            onOpenChange(true);
          }}
        />
      </Box>
      <FloatingPortal>
        {isDialogOpen && (
          <FloatingOverlay
            className="grid place-items-center"
            style={{
              background: "rgba(0, 0, 0, 0.24)",
            }}
          >
            <FloatingFocusManager context={context}>
              <Box
                className="bg-white p-6 rounded-xl"
                ref={refs.setFloating}
                {...getFloatingProps()}
              >
                <TransactionAllocator
                  onErrors={(errors) => {
                    setErrors(errors);
                  }}
                  allocationItems={allocationItems}
                  totalAmount={transaction.amount}
                  onChange={(newAllocations) => {
                    console.log({ newAllocations });
                    setAllocationItems(newAllocations);
                  }}
                />
                <Box className="flex justify-end gap-2">
                  <Button
                    onClick={() => {
                      onOpenChange(false);
                    }}
                    variant="outlined"
                  >
                    Annuler
                  </Button>
                  <Button
                    onClick={onSubmit}
                    disabled={errors.length > 0}
                    variant="contained"
                  >
                    Valider
                  </Button>
                </Box>
              </Box>
            </FloatingFocusManager>
          </FloatingOverlay>
        )}
      </FloatingPortal>
    </>
  );
};
