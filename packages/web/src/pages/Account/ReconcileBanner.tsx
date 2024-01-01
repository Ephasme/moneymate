import CancelIcon from "@mui/icons-material/CancelOutlined";
import { Box, Button, IconButton } from "@mui/material";
import { formatCurrency } from "../../helpers/formatCurrency";
import * as maths from "../../helpers/maths";
import { useAccount } from "../../hooks/queries/useAccount";
import { useTransactions } from "../../hooks/queries/useTransactions";
import { useAccountsStore } from "./store";
import { usePatchTransactions } from "../../hooks/queries/usePatchTransactions";

export const ReconcileBanner = ({ accountId }: { accountId: string }) => {
  const expectedReconciledBalance = useAccountsStore(
    (state) => state.expectedReconciledBalance
  );
  const setExpectedReconciledBalance = useAccountsStore(
    (state) => state.setExpectedReconciledBalance
  );
  const { data: account } = useAccount(accountId);
  const { refetch: refetchTransactions } = useTransactions(accountId);
  const { mutate: patchTransactions } = usePatchTransactions({
    onSuccess() {
      setExpectedReconciledBalance(undefined);
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
