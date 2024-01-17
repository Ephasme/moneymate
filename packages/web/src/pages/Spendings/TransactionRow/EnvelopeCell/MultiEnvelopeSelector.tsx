import { autoUpdate, flip, offset, useFloating } from "@floating-ui/react";
import { bim } from "@moneymate/shared";
import { Box, ClickAwayListener } from "@mui/material";
import { produce } from "immer";
import _ from "lodash";
import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { useEnvelopes, usePatchTransactions } from "../../../../hooks/queries";
import { useTransactionRowContext } from "../TransactionRowContext";
import { NullableSelectionItem, keepValid } from "./SelectionItem";
import { AllocationEditPage } from "./AllocationEditPage";
import { EnvelopeSelectorPage } from "./EnvelopeSelectorPage";
import { MultiEnvelopeSelectorContext } from "./MultiEnvelopeSelectorContext";

export const MultiEnvelopeSelector = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { transaction } = useTransactionRowContext();
  const { data: envelopes = [] } = useEnvelopes();
  const [edit, setEdit] = useState(false);
  const [step, setStep] = useState(0);
  const [selection, setSelection] = useState<NullableSelectionItem[]>([]);

  const assignRemainderTo = (envelopeId: string) => {
    setSelection(
      produce((selection) => {
        const remainder =
          transaction.amount - bim.sumBy(selection, (x) => x.amount);
        const remainderIndex = selection.findIndex(
          (item) => item.envelopeId === envelopeId
        );
        selection[remainderIndex].envelopeId = envelopeId;
        selection[remainderIndex].amount += remainder;
      })
    );
  };

  const splitAll = () => {
    setSelection(
      produce((selection) => {
        const amountPerEnvelope = transaction.amount / BigInt(selection.length);
        selection.forEach((item) => {
          item.amount = amountPerEnvelope;
        });
        const diff = transaction.amount - bim.sumBy(selection, (x) => x.amount);
        if (diff !== 0n) {
          selection[0].amount += diff;
        }
      })
    );
  };

  const splitRemainder = () => {
    setSelection(
      produce((selection) => {
        const remainder =
          transaction.amount - bim.sumBy(selection, (x) => x.amount);
        const amountPerEnvelope = remainder / BigInt(selection.length);
        selection.forEach((item) => {
          item.amount += amountPerEnvelope;
        });
        const diff = transaction.amount - bim.sumBy(selection, (x) => x.amount);
        if (diff !== 0n) {
          selection[0].amount += diff;
        }
      })
    );
  };

  const setAmount = (id: string, amount: bigint) => {
    setSelection(
      produce((list) => {
        const index = _(list).findIndex((x) => x.id === id);
        if (index !== -1) {
          list[index].amount = amount;
        }
      })
    );
  };

  const setEnvelope = (id: string, envelopeId: string | null) => {
    setSelection(
      produce((list) => {
        const index = _(list).findIndex((x) => x.id === id);
        if (index !== -1 && envelopeId) {
          list[index].envelopeId = envelopeId;
        }
      })
    );
  };

  const addEnvelope = () => {
    setSelection(
      produce((list) => {
        list.push({ id: uuid(), amount: 0n });
      })
    );
  };

  const removeEnvelope = (id: string) => {
    setSelection(
      produce((list) => {
        _.remove(list, (x) => x.id === id);
      })
    );
  };

  const toggleEnvelope = (envelopeId: string) => {
    setSelection(
      produce((list) => {
        const index = _(list).findIndex((x) => x.envelopeId === envelopeId);
        if (index !== -1) {
          list.splice(index, 1);
        } else {
          list.push({ id: uuid(), envelopeId, amount: 0n });
        }
      })
    );
  };

  const { mutate: patchTransactions } = usePatchTransactions({
    onSuccess() {
      closeSelf();
    },
  });
  const { update, refs, floatingStyles } = useFloating({
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
        allocations: selection.filter(keepValid).map((x) => ({
          envelopeId: x.envelopeId,
          amount:
            selection.length === 1
              ? transaction.amount.toString()
              : x.amount?.toString() ?? "0",
        })),
      },
    ]);
  }

  return (
    <MultiEnvelopeSelectorContext.Provider
      value={{
        addEnvelope,
        actions: {
          assignRemainderTo,
          splitAll,
          splitRemainder,
        },
        closeSelf,
        envelopes,
        removeEnvelope,
        selection,
        setAmount,
        setEnvelope,
        setSelection,
        setStep,
        submit,
        toggleEnvelope,
        updateFloating: update,
      }}
    >
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
              {step === 0 && <EnvelopeSelectorPage />}
              {step === 1 && <AllocationEditPage />}
            </Box>
          )}
        </Box>
      </ClickAwayListener>
    </MultiEnvelopeSelectorContext.Provider>
  );
};
