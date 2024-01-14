import {
  FloatingArrow,
  FloatingPortal,
  arrow,
  flip,
  offset,
  shift,
  useFloating,
} from "@floating-ui/react";
import { MAIN_ENVELOPE_ID } from "@moneymate/shared";
import { Box, ClickAwayListener, TextField } from "@mui/material";
import { Formik } from "formik";
import { useRef, useState } from "react";
import { NumericFormat } from "react-number-format";
import { v4 as uuid } from "uuid";
import { formatCurrency } from "../../helpers/formatCurrency";
import * as mil from "../../helpers/mil";
import { useEnvelope, usePostTransfers } from "../../hooks/queries";
import { useStore } from "../../store";
import { EnvelopeSelector } from "../Common/EnvelopeSelector";

export const AllocationField = ({ envelopeId }: { envelopeId: string }) => {
  const budgetId = useStore((state) => state.budgetId);
  const { data: defaultEnvelope } = useEnvelope(MAIN_ENVELOPE_ID);
  const { data: envelope } = useEnvelope(envelopeId);
  const arrowRef = useRef(null);
  const { refs, floatingStyles, context } = useFloating({
    middleware: [arrow({ element: arrowRef }), offset(10), shift(), flip()],
  });
  const { mutate: postTransfers } = usePostTransfers();
  const [isEdit, setEdit] = useState(false);

  if (!defaultEnvelope) return <div>Loading...</div>;
  if (!envelope) return <div>Loading...</div>;

  if (isEdit) {
    return (
      <ClickAwayListener
        onClickAway={() => {
          setEdit(false);
        }}
      >
        <Box className="contents">
          <Formik
            initialValues={{
              targetAmount: envelope.allocated,
              fromEnvelope: defaultEnvelope,
            }}
            onSubmit={({ targetAmount, fromEnvelope }) => {
              postTransfers([
                {
                  amount: (targetAmount - envelope.allocated).toString(),
                  fromEnvelopeId: fromEnvelope.id,
                  toEnvelopeId: envelope.id,
                  budgetId,
                  date: new Date().toISOString(),
                  id: uuid(),
                },
              ]);
            }}
          >
            {({
              values: { targetAmount, fromEnvelope },
              setFieldValue,
              resetForm,
              submitForm,
            }) => (
              <>
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
                  value={mil.divToNumber(targetAmount)}
                  getInputRef={refs.setReference}
                  onValueChange={({ value }) => {
                    if (value) {
                      setFieldValue("targetAmount", mil.mult(value));
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      submitForm();
                      resetForm();
                      setEdit(false);
                    }
                  }}
                />

                <FloatingPortal>
                  <Box
                    ref={refs.setFloating}
                    style={floatingStyles}
                    className="bg-white rounded-lg shadow-xl py-2 px-5"
                  >
                    <FloatingArrow
                      fill="white"
                      ref={arrowRef}
                      context={context}
                    />
                    <Box className="flex gap-2 items-baseline">
                      <NumericFormat
                        fullWidth
                        decimalScale={2}
                        decimalSeparator=","
                        thousandSeparator=" "
                        InputProps={{
                          sx: {
                            "& input": {
                              color:
                                targetAmount - envelope.allocated >= 0
                                  ? "green"
                                  : "red",
                              fontWeight: "bold",
                              textAlign: "right",
                            },
                          },
                        }}
                        value={mil.divToNumber(
                          targetAmount - envelope.allocated
                        )}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            submitForm();
                            resetForm();
                            setEdit(false);
                          }
                        }}
                        onValueChange={({ value }) => {
                          if (value) {
                            setFieldValue(
                              "targetAmount",
                              envelope.allocated + mil.mult(value)
                            );
                          }
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
                          value={fromEnvelope ?? defaultEnvelope}
                          onChange={(newFromEnvelope) => {
                            setFieldValue("fromEnvelope", newFromEnvelope);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              submitForm();
                              resetForm();
                              setEdit(false);
                            }
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                </FloatingPortal>
              </>
            )}
          </Formik>
        </Box>
      </ClickAwayListener>
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
    </Box>
  );
};
