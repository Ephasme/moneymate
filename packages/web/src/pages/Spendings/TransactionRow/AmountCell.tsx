import {
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react";
import { Box } from "@mui/material";
import { useState } from "react";
import { usePatchTransactions } from "../../../hooks/queries";
import { AmountSpan } from "../../Common";
import { AmountInput } from "../../Common/AmountInput";
import { AllocationEditModalContent } from "./AllocationEditModalContent";
import {
  NullableSelectionItem,
  selectionToAllocations,
} from "./EnvelopeCell/SelectionItem";
import { useTransactionRowContext } from "./TransactionRowContext";

const useAmountCell = () => {
  const { transaction } = useTransactionRowContext();
  const { mutate: patchTransactions } = usePatchTransactions({
    onSuccess() {
      setIsEditing(false);
    },
  });
  const [amount, setAmount] = useState(transaction.amount ?? 0n);
  const [isEditing, setIsEditing] = useState(false);

  const onClose = () => {
    setIsEditing(false);
    setAmount(transaction.amount ?? 0n);
  };

  const display = (
    <Box
      onClick={() => setIsEditing(true)}
      className="cell flex justify-end items-center text-right font-bold px-2"
    >
      <AmountSpan amount={transaction.amount} creditColor explicitPositive />
    </Box>
  );
  return {
    transaction,
    amount,
    setAmount,
    isEditing,
    patchTransactions,
    onClose,
    display,
  };
};

const MultiAmountCell = () => {
  const {
    transaction,
    amount,
    onClose,
    setAmount,
    isEditing,
    patchTransactions,
    display,
  } = useAmountCell();

  const [selection, setSelection] = useState<NullableSelectionItem[]>(
    transaction.allocations.map((a) => {
      return {
        id: a.id,
        envelopeId: a.envelopeId,
        amount: a.amount,
      };
    })
  );

  const { context, refs, floatingStyles } = useFloating({
    open: isEditing,
    onOpenChange: (open) => {
      if (!open) {
        onClose();
      }
    },
    middleware: [offset(4), flip(), shift()],
    whileElementsMounted(referenceEl, floatingEl, update) {
      const cleanup = autoUpdate(referenceEl, floatingEl, update, {
        ancestorScroll: true,
      });
      return cleanup;
    },
  });
  const dismiss = useDismiss(context);
  const click = useClick(context);
  const { getFloatingProps, getReferenceProps } = useInteractions([
    dismiss,
    click,
  ]);

  const onSubmit = () => {
    patchTransactions([
      {
        id: transaction.id,
        amount: amount.toString(),
        allocations: selectionToAllocations(selection, amount),
      },
    ]);
  };

  return (
    <>
      <Box
        className="flex"
        sx={{
          "& > *": {
            flexGrow: "1",
          },
        }}
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        {display}
      </Box>
      <FloatingPortal>
        {isEditing && (
          <Box
            className="bg-white"
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            <AllocationEditModalContent
              totalAmount={amount}
              onChange={setSelection}
              onAmountChange={(value) => {
                setAmount(value);
              }}
              selection={selection}
              onSubmit={() => {
                onSubmit();
              }}
              onCancel={() => {
                onClose();
              }}
            />
          </Box>
        )}
      </FloatingPortal>
    </>
  );
};

const SingleAmountCell = () => {
  const {
    transaction,
    amount,
    setAmount,
    isEditing,
    onClose,
    display,
    patchTransactions,
  } = useAmountCell();

  const onSubmit = () => {
    patchTransactions([
      {
        id: transaction.id,
        amount: amount.toString(),
      },
    ]);
  };

  if (isEditing) {
    return (
      <AmountInput
        value={amount}
        onChange={(value) => setAmount(value)}
        onBlur={() => onClose()}
        onKeyDown={(ev) => {
          if (ev.key === "Escape") {
            onClose();
          } else if (ev.key === "Enter") {
            onSubmit();
          }
        }}
      />
    );
  }
  return display;
};

export const AmountCell = () => {
  const { transaction } = useTransactionRowContext();
  if (transaction.allocations.length > 1) {
    return <MultiAmountCell />;
  } else {
    return <SingleAmountCell />;
  }
};
