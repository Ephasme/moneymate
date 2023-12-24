import CancelIcon from "@mui/icons-material/CancelOutlined";
import { Box, Button, IconButton } from "@mui/material";
import { formatCurrency } from "../../helpers/formatCurrency";
import { useAccount } from "../Common/useAccount";
import { useAccountsStore } from "./store";
import * as maths from "../../helpers/maths";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api";
import { useTransactions } from "../Common/useTransactions";

export const ReconcileBanner = ({ accountId }: { accountId: string }) => {
  const queryClient = useQueryClient();
  const expectedReconciledBalance = useAccountsStore(
    (state) => state.expectedReconciledBalance
  );
  const setExpectedReconciledBalance = useAccountsStore(
    (state) => state.setExpectedReconciledBalance
  );
  const { data: account } = useAccount(accountId);
  const { refetch: refetchTransactions } = useTransactions(accountId);
  const { mutate: patchTransactions } = useMutation({
    mutationFn: api.patchTransactions,
    onSuccess: () => {
      setExpectedReconciledBalance(undefined);
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["accounts", { accountId }] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
  if (!expectedReconciledBalance) return null;
  if (!account) return null;

  async function finishReconciliation() {
    const { data: transactions } = await refetchTransactions();
    if (difference === 0n) {
      const toPatch = (transactions ?? [])
        .filter((t) => t.status === "cleared")
        .map((x) => ({ id: x.id, status: "reconciled" as const }));
      console.log({ toPatch, transactions });
      patchTransactions(toPatch);
    } else {
      throw new Error("Not implemented");
    }
  }

  const difference =
    account.reconciledBalance +
    account.clearedBalance -
    expectedReconciledBalance;
  function matchDifference<T>(props: {
    lower: (value: bigint) => T;
    same: () => T;
    bigger: (value: bigint) => T;
  }) {
    if (difference < 0) {
      return props.lower(difference);
    } else if (difference === 0n) {
      return props.same();
    } else {
      return props.bigger(difference);
    }
  }
  const submitButtonText =
    difference !== 0n ? "Create adjustment & Finish" : "Finish";

  return (
    <Box className="flex items-center justify-between w-full py-4 px-4 bg-[#D5DEFC]">
      <Box className="flex items-center">
        <IconButton
          onClick={() => {
            setExpectedReconciledBalance(undefined);
          }}
        >
          <CancelIcon />
        </IconButton>
        <Box>
          {matchDifference({
            lower: (value) => (
              <span>
                This account's cleared balance is{" "}
                <b>{formatCurrency(maths.abs(value))}</b> lower than your actual
                account's balance.
              </span>
            ),
            same: () => (
              <span>
                This account's cleared balance is <b>the same</b> as your actual
                account's balance.
              </span>
            ),
            bigger: (value) => (
              <span>
                This account's cleared balance is{" "}
                <b>{formatCurrency(maths.abs(value))}</b> bigger than your
                actual account's balance.
              </span>
            ),
          })}
        </Box>
      </Box>
      <Box>
        <Button
          variant="contained"
          onClick={() => {
            finishReconciliation();
          }}
        >
          {submitButtonText}
        </Button>
      </Box>
    </Box>
  );
};
