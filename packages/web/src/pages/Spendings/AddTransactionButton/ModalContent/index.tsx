import { AccountView } from "@moneymate/shared";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Formik } from "formik";
import { NumericFormat } from "react-number-format";
import * as mil from "../../../../helpers/mil";
import { useAccounts } from "../../../../hooks/queries";
import { usePostTransactions } from "../../../../hooks/queries/usePostTransactions";
import { useStore } from "../../../../store";
import { CreditDebitSwitch } from "../CreditDebitSwitch";
import {
  EnvelopeSelection,
  EnvelopeSelector,
  keepNotNull,
} from "./EnvelopeSelector";

export const ModalContent = ({ onClose }: { onClose: () => void }) => {
  const budgetId = useStore((state) => state.budgetId);
  const { mutate: postTransactions } = usePostTransactions({
    onSuccess: () => {
      onClose();
    },
  });

  const { data: accounts } = useAccounts();

  if (!accounts) return <Box>Loading...</Box>;

  return (
    <Box className="flex flex-col gap-4">
      <Formik
        onReset={() => {}}
        onSubmit={(values) => {
          if (!values.account) return;
          if (!values.envelopes) return;
          console.log({ selection: values.envelopes });
          const toPost = {
            accountId: values.account.id,
            allocations: values.envelopes
              .filter(keepNotNull)
              .map(({ envelope, amount }) => ({
                envelopeId: envelope.id,
                amount: amount.toString(),
              })),
            payee: values.payee,
            date: values.date.toISOString(),
            amount: values.amount.toString(),
            budgetId,
          };
          console.log({ toPost });
          postTransactions([toPost]);
        }}
        initialValues={{
          type: "credit" as "credit" | "debit",
          envelopes: [] as EnvelopeSelection,
          account: null as AccountView | null,
          date: new Date(),
          payee: "",
          amount: 0n,
        }}
      >
        {({ values, setFieldValue, resetForm, submitForm }) => (
          <>
            <Box className="px-4 pt-4 font-bold">Ajouter une dépense</Box>
            <Box
              className="flex flex-col items-center justify-center px-16"
              sx={{
                backgroundImage:
                  "linear-gradient(113deg, #F3E9EA 0%, #F2F4F8 100%)",
              }}
            >
              <Box className="pt-5">
                <CreditDebitSwitch
                  value={values.type}
                  onChanged={(type) => {
                    setFieldValue("type", type);
                  }}
                />
              </Box>
              <Box className="py-5">
                <NumericFormat
                  customInput={TextField}
                  decimalScale={2}
                  fixedDecimalScale
                  suffix=" €"
                  decimalSeparator=","
                  variant="standard"
                  value={mil.divToNumber(values.amount)}
                  onValueChange={({ value }) => {
                    setFieldValue("amount", mil.mult(value));
                  }}
                  sx={{
                    fontSize: "2rem",
                    ".MuiInputBase-root": {
                      fontSize: "2rem",
                    },
                    ".MuiInputBase-input": {
                      textAlign: "center",
                    },
                  }}
                />
              </Box>
            </Box>
            <Box className="flex flex-col px-5 gap-2">
              <EnvelopeSelector
                totalAmount={values.amount}
                onChange={(selection) => {
                  setFieldValue("envelopes", selection);
                }}
              />
              <Autocomplete
                size="small"
                freeSolo
                onChange={(_, value) => {
                  setFieldValue("payee", value);
                }}
                options={["test", "test2"]}
                sx={{
                  ".MuiInputBase-root": {
                    borderRadius: "999rem",
                  },
                }}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Acheté chez..." />
                )}
              />
              <Autocomplete
                size="small"
                options={accounts}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.name}
                getOptionKey={(option) => option.id}
                onChange={(_, value) => {
                  setFieldValue("account", value);
                }}
                sx={{
                  ".MuiInputBase-root": {
                    borderRadius: "999rem",
                  },
                }}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Dans le compte..." />
                )}
              />
              <DatePicker
                sx={{
                  ".MuiInputBase-root": {
                    borderRadius: "999rem",
                  },
                }}
                value={values.date}
                onChange={(date) => {
                  setFieldValue("date", date);
                }}
                slotProps={{
                  textField: {
                    size: "small",
                  },
                }}
              />
            </Box>
            <Box className="p-5 mt-10 flex justify-end gap-2 border-t">
              <Button
                onClick={() => {
                  resetForm();
                  onClose();
                }}
                size="small"
                variant="outlined"
              >
                Annuler
              </Button>
              <Button onClick={submitForm} size="small" variant="outlined">
                Valider
              </Button>
            </Box>
          </>
        )}
      </Formik>
    </Box>
  );
};
