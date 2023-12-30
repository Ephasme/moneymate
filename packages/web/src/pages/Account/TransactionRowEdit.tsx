import {
  AllocationPatched,
  AllocationPostedInput,
  RecurrencePeriod,
  TransactionStatus,
} from "@moneymate/shared";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  ClickAwayListener,
  FormControlLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { api } from "../../api";
import * as mil from "../../helpers/mil";
import { useStore } from "../../store";
import { queries } from "../Common/queries";
import { useAccounts } from "../Common/useAccounts";
import { useTransaction } from "../Common/useTransaction";
import { SingleAllocationEditor } from "./SingleAllocationEditor";
import { TransactionStatusButton } from "./TransactionStatusButton";
import { v4 as uuid } from "uuid";

export const TransactionRowEdit = ({
  accountId,
  transactionId,
  onCancel,
}: {
  accountId: string;
  transactionId?: string;
  onCancel?: () => void;
}) => {
  const queryClient = useQueryClient();
  const budgetId = useStore((state) => state.budgetId);
  const { data: transaction } = useTransaction(transactionId);
  const { data: accounts } = useAccounts();

  const [period, setPeriod] = useState(
    transaction?.recurrence?.period ?? "month"
  );
  const [frequency, setFrequency] = useState(
    transaction?.recurrence?.frequency ?? 1
  );
  const [isRecurring, setRecurring] = useState(!!transaction?.recurrence);

  const getInitialValues = () => {
    return {
      date: transaction ? new Date(transaction.date) : new Date(),
      accountId: transaction?.accountId ?? accountId,
      description: transaction?.description ?? "",
      status: (transaction?.status ?? "pending") as TransactionStatus,
      allocations: (transaction?.allocations ?? []).map(
        (x): AllocationPatched => ({
          id: x.id,
          envelopeId: x.envelopeId,
          amount: x.amount,
          status: "active",
        })
      ),
      positiveAmount:
        transaction && transaction.amount >= 0 ? transaction.amount : null,
      negativeAmount:
        transaction && transaction.amount < 0 ? -1n * transaction.amount : null,
    };
  };
  const formik = useFormik({
    initialValues: getInitialValues(),
    onSubmit: () => save(),
  });

  const onAmountChanged = (value: { negative: bigint; positive: bigint }) => {
    if (formik.values.allocations.length === 1) {
      const allocation = formik.values.allocations[0];
      formik.setFieldValue("negativeAmount", value.negative);
      formik.setFieldValue("positiveAmount", value.positive);
      if (allocation) {
        formik.setFieldValue("allocations", [
          { ...allocation, amount: value.positive - value.negative },
        ]);
      }
    }
  };

  function matchAllocationCount<T>({
    singleOrNone,
    multiple,
  }: {
    singleOrNone?: (x?: AllocationPatched) => T;
    multiple?: (x: AllocationPatched[]) => T;
  }) {
    if (formik.values.allocations.length <= 1) {
      return singleOrNone?.(formik.values.allocations[0]);
    } else {
      return multiple?.(formik.values.allocations);
    }
  }

  const { mutate: save } = useMutation({
    mutationFn: async () => {
      const newTransaction = {
        accountId: formik.values.accountId,
        budgetId,
        recurrence: isRecurring
          ? {
              id: transaction?.recurrence?.id ?? uuid(),
              period,
              frequency,
              startDate: formik.values.date.toISOString(),
              currentDate: formik.values.date.toISOString(),
            }
          : undefined,
        amount: (
          (formik.values.positiveAmount ?? 0n) -
          (formik.values.negativeAmount ?? 0n)
        ).toString(),
        date: formik.values.date.toISOString(),
        description: formik.values.description,
        status: formik.values.status,
      };
      if (transaction) {
        await api.patchTransactions([
          {
            ...newTransaction,
            id: transaction.id,
            allocations: formik.values.allocations.map((allocation) => {
              if (allocation.status === "active") {
                return {
                  ...allocation,
                  date: allocation.date?.toISOString(),
                  amount: allocation.amount?.toString(),
                };
              }
              return allocation;
            }),
          },
        ]);
      } else {
        await api.createTransactions([
          {
            ...newTransaction,
            id: transactionId,
            allocations: formik.values.allocations
              .map((allocation): AllocationPostedInput | undefined => {
                if (allocation.status === "active" && allocation.envelopeId) {
                  return {
                    id: allocation.id as string | undefined,
                    envelopeId: allocation.envelopeId,
                    date: allocation.date?.toISOString(),
                    amount: (allocation.amount ?? 0n).toString(),
                  };
                }
              })
              .filter((x): x is AllocationPostedInput => !!x),
          },
        ]);
      }
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: queries.transactions._def });
      queryClient.invalidateQueries({ queryKey: queries.accounts._def });
      onCancel?.();
    },
    onError(error) {
      console.error("Error saving transaction", error);
    },
  });

  useEffect(() => {
    if (!transaction) return;
    formik.setValues(getInitialValues());
  }, [transaction, formik.setValues]);

  if (!accounts) return null;

  return (
    <ClickAwayListener
      onClickAway={() => {
        console.log("click away");
        // onCancel?.();
      }}
    >
      <Box className="contents">
        <Box className="pb-0 bg-slate-100">
          <Checkbox size="small" />
        </Box>
        <Box className="p-2 pb-0 bg-slate-100">
          <DatePicker
            format="dd/MM/yyyy"
            onChange={(value) => {
              formik.setFieldValue("date", value);
            }}
            sx={{
              "& .MuiInputBase-root": {
                backgroundColor: "white",
              },
            }}
            slotProps={{
              textField: {
                size: "small",
              },
            }}
            value={formik.values.date}
          />
        </Box>

        <Box className="p-2 pb-0 pl-0 bg-slate-100">
          <Autocomplete
            size="small"
            sx={{
              "& .MuiInputBase-root": {
                backgroundColor: "white",
              },
            }}
            value={accounts.find((x) => x.id === formik.values.accountId)}
            getOptionLabel={(x) => x.name}
            options={accounts ?? []}
            onChange={(_, newAccount) => {
              if (newAccount) {
                formik.setFieldValue("accountId", newAccount.id);
              }
            }}
            renderInput={(params) => <TextField {...params} label="Account" />}
          />
        </Box>

        <Box className="p-2 pb-0 pl-0 bg-slate-100">
          {matchAllocationCount({
            singleOrNone: (allocation) => (
              <SingleAllocationEditor
                allocation={allocation}
                onChange={(allocations) => {
                  formik.setFieldValue("allocations", allocations);
                }}
              />
            ),
          })}
        </Box>
        <Box className="p-2 pb-0 pl-0 bg-slate-100">
          <TextField
            label="Description"
            sx={{
              "& .MuiInputBase-root": {
                backgroundColor: "white",
              },
            }}
            variant="outlined"
            size="small"
            {...formik.getFieldProps("description")}
          />
        </Box>

        <Box className="p-2 pb-0 pl-0 bg-slate-100">
          <NumericFormat
            inputProps={{
              style: {
                backgroundColor: "white",
                textAlign: "right",
              },
            }}
            label="Debit"
            className="text-right"
            customInput={TextField}
            size="small"
            value={mil.divStr(formik.values.negativeAmount)}
            decimalScale={2}
            decimalSeparator=","
            thousandSeparator=" "
            onValueChange={({ value: valueStr }) => {
              if (valueStr) {
                onAmountChanged({
                  negative: mil.mult(valueStr),
                  positive: formik.values.positiveAmount ?? 0n,
                });
              }
            }}
          />
        </Box>

        <Box className="p-2 pb-0 pl-0 bg-slate-100">
          <NumericFormat
            inputProps={{
              style: {
                backgroundColor: "white",
                textAlign: "right",
              },
            }}
            label="Credit"
            className="text-right"
            customInput={TextField}
            size="small"
            value={mil.divStr(formik.values.positiveAmount)}
            decimalScale={2}
            decimalSeparator=","
            thousandSeparator=" "
            onValueChange={({ value: valueStr }) => {
              if (valueStr) {
                onAmountChanged({
                  negative: formik.values.negativeAmount ?? 0n,
                  positive: mil.mult(valueStr),
                });
              }
            }}
          />
        </Box>

        <Box className="flex bg-slate-100 items-center justify-center">
          {transaction && (
            <TransactionStatusButton transactionId={transaction.id} />
          )}
        </Box>

        <Box
          className="flex flex-row items-center p-2 pl-[46px] bg-slate-100 border-slate-300 border-solid"
          sx={{ gridColumn: "1 / span 8" }}
        >
          <Box>
            <FormControlLabel
              label="Recurring"
              control={
                <Checkbox
                  checked={isRecurring}
                  onChange={(_, checked) => setRecurring(checked)}
                  size="small"
                />
              }
            />
          </Box>
          {isRecurring && (
            <Box className="flex gap-2 items-center">
              Repeat every
              <NumericFormat
                value={frequency}
                onValueChange={({ floatValue }) => {
                  if (floatValue) {
                    setFrequency(floatValue);
                  }
                }}
                size="small"
                customInput={TextField}
              />
              <Select
                value={period}
                onChange={(ev) => {
                  setPeriod(ev.target.value as RecurrencePeriod);
                }}
                size="small"
              >
                <MenuItem value={"year"}>Year</MenuItem>
                <MenuItem value={"quarter"}>Quarter</MenuItem>
                <MenuItem value={"month"}>Month</MenuItem>
                <MenuItem value={"week"}>Week</MenuItem>
                <MenuItem value={"day"}>Day</MenuItem>
              </Select>
            </Box>
          )}
          <Box className="flex-grow"></Box>
          <Box className="flex flex-row gap-2">
            <Button
              size="small"
              variant="outlined"
              onClick={() => {
                formik.submitForm();
              }}
            >
              Save
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="error"
              onClick={() => {
                onCancel?.();
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </ClickAwayListener>
  );
};
