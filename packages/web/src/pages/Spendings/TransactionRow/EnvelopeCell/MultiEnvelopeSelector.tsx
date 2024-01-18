import { autoUpdate, flip, offset, useFloating } from "@floating-ui/react";
import { Box, ClickAwayListener } from "@mui/material";
import { produce } from "immer";
import _ from "lodash";
import React, { useState } from "react";
import { usePatchTransactions } from "../../../../hooks/queries";
import { AllocationEditModalContent } from "../AllocationEditModalContent";
import { useTransactionRowContext } from "../TransactionRowContext";
import { EnvelopeSelectorModalContent } from "./EnvelopeSelectorModalContent";
import { NullableSelectionItem, selectionToAllocations } from "./SelectionItem";

export const MultiEnvelopeSelector = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { transaction, onTransactionChange } = useTransactionRowContext();
  const [edit, setEdit] = useState(false);
  const [step, setStep] = useState(0);
  const [selection, setSelection] = useState<NullableSelectionItem[]>([]);

  const { mutate: patchTransactions } = usePatchTransactions({
    onSuccess() {
      closeSelf();
    },
  });
  const {
    update: updateFloating,
    refs,
    floatingStyles,
  } = useFloating({
    middleware: [offset(4), flip()],
    whileElementsMounted(referenceEl, floatingEl, update) {
      const cleanup = autoUpdate(referenceEl, floatingEl, update, {
        ancestorScroll: true,
      });
      return cleanup;
    },
  });

  function openSelf() {
    setEdit(true);
    setSelection(
      _(transaction.allocations)
        .map((allocation) => ({
          id: allocation.id,
          envelopeId: allocation.envelopeId,
          amount: allocation.amount,
        }))
        .uniq()
        .value()
    );
  }

  function closeSelf() {
    setEdit(false);
    setStep(0);
    setSelection([]);
  }

  function submit() {
    patchTransactions([
      {
        id: transaction.id,
        allocations: selectionToAllocations(selection, transaction.amount),
      },
    ]);
  }

  return (
    <ClickAwayListener
      onClickAway={() => {
        closeSelf();
      }}
    >
      <Box className="contents">
        <Box
          className=""
          onClick={() => {
            openSelf();
          }}
          ref={refs.setReference}
        >
          {children}
        </Box>
        {edit && (
          <Box
            className="bg-white shadow-main rounded-md"
            ref={refs.setFloating}
            style={floatingStyles}
          >
            {step === 0 && (
              <EnvelopeSelectorModalContent
                onCancel={() => closeSelf()}
                onChange={setSelection}
                onSubmit={submit}
                onNext={() => {
                  setStep(1);
                  updateFloating();
                }}
                selection={selection}
              />
            )}
            {step === 1 && (
              <AllocationEditModalContent
                totalAmount={transaction.amount}
                onAmountChange={(amount) => {
                  onTransactionChange(
                    produce(transaction, (draft) => {
                      draft.amount = amount;
                    })
                  );
                }}
                onBack={() => {
                  setStep(0);
                  updateFloating();
                }}
                onCancel={() => closeSelf()}
                onChange={setSelection}
                onSubmit={submit}
                selection={selection}
              />
            )}
          </Box>
        )}
      </Box>
    </ClickAwayListener>
  );
};
