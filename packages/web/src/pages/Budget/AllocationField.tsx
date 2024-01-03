import { EnvelopeView, MAIN_ENVELOPE_ID } from "@moneymate/shared";
import { Box, IconButton, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { NumericFormat } from "react-number-format";
import { v4 as uuid } from "uuid";
import { formatCurrency } from "../../helpers/formatCurrency";
import * as mil from "../../helpers/mil";
import { useEnvelope, usePostTransfers } from "../../hooks/queries";
import { useStore } from "../../store";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import {
  useFloating,
  arrow,
  offset,
  shift,
  flip,
  useDismiss,
  useClick,
  useInteractions,
  FloatingPortal,
  FloatingArrow,
} from "@floating-ui/react";
import { EnvelopeSelector } from "./EnvelopeSelector";
import { Formik } from "formik";

export const AllocationField = ({ envelope }: { envelope: EnvelopeView }) => {
  const budgetId = useStore((state) => state.budgetId);
  const { data: defaultEnvelope } = useEnvelope(MAIN_ENVELOPE_ID);
  const [open, setOpen] = useState(false);
  const arrowRef = useRef(null);
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [arrow({ element: arrowRef }), offset(10), shift(), flip()],
  });
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getFloatingProps, getReferenceProps } = useInteractions([
    click,
    dismiss,
  ]);
  const { mutate: postTransfers } = usePostTransfers({
    onSuccess() {
      setEdit(false);
      setOpen(false);
    },
  });
  const [isEdit, setEdit] = useState(false);
  const [value, setValue] = useState(envelope.allocated);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEdit && ref.current) {
      ref.current.focus();
    }
  }, [isEdit, ref]);

  if (isEdit) {
    return (
      <NumericFormat
        decimalScale={2}
        decimalSeparator=","
        customInput={TextField}
        fullWidth
        variant="standard"
        sx={{
          "&.MuiTextField-root": {
            minWidth: "5rem",
            marginLeft: "0.5rem",
            marginRight: "1rem",
            width: "100%",
            "& input": {
              fontWeight: "bold",
              textAlign: "right",
            },
          },
        }}
        thousandSeparator=" "
        value={mil.divToNumber(value)}
        inputRef={ref}
        onBlur={() => {
          setEdit(false);
        }}
        onValueChange={({ value }) => {
          if (value) {
            setValue(mil.mult(value));
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            postTransfers([
              {
                amount: (value - envelope.allocated).toString(),
                fromEnvelopeId: MAIN_ENVELOPE_ID,
                toEnvelopeId: envelope.id,
                budgetId,
                date: new Date().toISOString(),
                id: uuid(),
              },
            ]);
          }
        }}
      />
    );
  }

  if (!defaultEnvelope) return <div>Loading...</div>;

  return (
    <Box className="flex gap-1 items-center justify-end mr-4">
      <Box
        onClick={() => {
          setEdit(true);
        }}
        className="font-black text-right"
      >
        {formatCurrency(envelope.allocated)}
      </Box>
      <IconButton
        onClick={() => {
          setOpen(true);
        }}
        ref={refs.setReference}
        size="small"
        {...getReferenceProps()}
      >
        <SwapHorizIcon />
      </IconButton>
      <FloatingPortal>
        {open && (
          <Box
            ref={refs.setFloating}
            style={floatingStyles}
            className="bg-white rounded-lg shadow-xl py-2 px-5"
            {...getFloatingProps()}
          >
            <FloatingArrow fill="white" ref={arrowRef} context={context} />
            <Formik
              onSubmit={(values) => {
                console.log(values);
                if (values.envelope) {
                  postTransfers([
                    {
                      amount: values.amount.toString(),
                      fromEnvelopeId: values.envelope.id,
                      toEnvelopeId: envelope.id,
                      budgetId,
                      date: new Date().toISOString(),
                      id: uuid(),
                    },
                  ]);
                }
              }}
              initialValues={{
                amount: 0n,
                envelope: defaultEnvelope,
              }}
            >
              {({ values, setFieldValue, resetForm, submitForm }) => {
                const handleKeyDown = (e: React.KeyboardEvent) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    submitForm();
                  }
                  if (e.key === "Escape") {
                    e.preventDefault();
                    resetForm();
                    setOpen(false);
                  }
                };
                return (
                  <Box className="flex gap-2 items-baseline">
                    <NumericFormat
                      fullWidth
                      decimalScale={2}
                      decimalSeparator=","
                      thousandSeparator=" "
                      value={mil.divToNumber(values.amount)}
                      onValueChange={({ value }) => {
                        if (value) {
                          setFieldValue("amount", mil.mult(value));
                        }
                      }}
                      onKeyDown={(ev) => {
                        handleKeyDown(ev);
                      }}
                      inputProps={{
                        style: {
                          textAlign: "right",
                        },
                      }}
                      customInput={TextField}
                      variant="standard"
                    />
                    <Box>depuis</Box>
                    <Box className="flex-grow min-w-[15rem]">
                      <EnvelopeSelector
                        fullWidth
                        value={values.envelope}
                        onChange={(envelope) => {
                          setFieldValue("envelope", envelope);
                        }}
                      />
                    </Box>
                  </Box>
                );
              }}
            </Formik>
          </Box>
        )}
      </FloatingPortal>
    </Box>
  );
};
