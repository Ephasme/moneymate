import {
  FloatingArrow,
  arrow,
  autoPlacement,
  flip,
  offset,
  shift,
  useClick,
  useFloating,
  useInteractions,
  useTransitionStyles,
} from "@floating-ui/react";
import { EnvelopeView } from "@moneymate/shared";
import {
  Autocomplete,
  Box,
  Button,
  ClickAwayListener,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import React, { useRef, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useStore } from "../../store";
import { useEnvelope } from "../Common/useEnvelope";
import { useEnvelopes } from "../Common/useEnvelopes";
import { useSaveTransfer } from "../Common/useSaveTransfer";
import * as mil from "../../helpers/mil";

const AssignPopupInner = ({ envelope }: { envelope: EnvelopeView }) => {
  const budgetId = useStore((state) => state.budgetId);
  const { data: envelopes } = useEnvelopes();
  const { mutate: saveTransfer } = useSaveTransfer();

  if (!envelope || !envelopes) return <Box>Loading...</Box>;

  return (
    <Box className="p-2 border-solid bg-white shadow-xl rounded-md">
      <Formik
        initialValues={{
          envelopeId: null as string | null,
          amount: 0n,
        }}
        onSubmit={async ({ envelopeId, amount }) => {
          if (envelopeId) {
            saveTransfer({
              budgetId,
              fromEnvelopeId: envelope.id,
              toEnvelopeId: envelopeId,
              amount: amount.toString(),
            });
          }
        }}
      >
        {({ setFieldValue, handleSubmit, values }) => (
          <Box className="flex flex-col gap-2">
            <Box className="flex items-center justify-between">
              <Box>Move:</Box>
            </Box>
            <NumericFormat
              customInput={TextField}
              decimalScale={2}
              decimalSeparator=","
              thousandsGroupStyle="thousand"
              thousandSeparator=" "
              suffix=" €"
              size="small"
              className="border-solid border border-[#e5e7eb] rounded-md p-2 font-number"
              value={mil.div(values.amount)}
              onValueChange={({ value }) => {
                setFieldValue("amount", mil.mult(value));
              }}
            />
            <Box>To:</Box>
            <Autocomplete
              size="small"
              options={envelopes}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(_, value) => {
                if (value) {
                  setFieldValue("envelopeId", value.id);
                }
              }}
              getOptionLabel={(e) => e.name}
              renderInput={(props) => <TextField {...props} label="Envelope" />}
            />
            <Button variant="contained" onClick={() => handleSubmit()}>
              Submit
            </Button>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export const AssignPopup = ({
  envelopeId,
  children: Item,
}: {
  envelopeId: string;
  children: (props: { envelope: EnvelopeView }) => React.ReactNode;
}) => {
  const envelope = useEnvelope(envelopeId);
  const [isOpened, setIsOpened] = useState(false);
  const arrowRef = useRef(null);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpened,
    onOpenChange: setIsOpened,
    middleware: [
      shift(),
      autoPlacement(),
      offset(10),
      arrow({
        element: arrowRef,
      }),
      flip(),
    ],
  });
  const { isMounted, styles } = useTransitionStyles(context);

  const click = useClick(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click]);

  if (!envelope) return <Box>Loading...</Box>;
  return (
    <Box>
      <Box ref={refs.setReference} {...getReferenceProps()}>
        <Item envelope={envelope} />
      </Box>

      {isOpened && isMounted && (
        <ClickAwayListener
          onClickAway={() => {
            setIsOpened(false);
          }}
        >
          <Box
            ref={refs.setFloating}
            style={{ ...floatingStyles, ...styles }}
            {...getFloatingProps()}
          >
            <FloatingArrow
              className="fill-white"
              ref={arrowRef}
              context={context}
            />
            <AssignPopupInner envelope={envelope} />
          </Box>
        </ClickAwayListener>
      )}
    </Box>
  );
};
