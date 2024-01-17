import { useAccounts, usePatchTransactions } from "../../../hooks/queries";
import { AutoCompleteCell } from "./AutoCompleteCell";
import { useTransactionRowContext } from "./TransactionRowContext";

export const AccountCell = () => {
  const { transaction } = useTransactionRowContext();
  const { mutate: patchTransactions } = usePatchTransactions();
  const { data: accounts = [] } = useAccounts();

  return (
    <AutoCompleteCell
      options={accounts}
      value={accounts.find((x) => x.id === transaction.accountId) ?? null}
      getItemLabel={(account) => account.name}
      inputProps={{ className: "cell-border flex items-center h-full px-2" }}
      viewProps={{ className: "cell flex items-center px-2" }}
      onChange={(account) => {
        if (!account) return;
        if (typeof account === "string") return;
        patchTransactions([
          {
            id: transaction.id,
            accountId: account.id,
          },
        ]);
      }}
    />
  );
};
