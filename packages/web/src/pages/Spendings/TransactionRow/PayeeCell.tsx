import { makePatch } from "@moneymate/shared";
import { usePatchTransactions } from "../../../hooks/queries";
import { usePayees } from "../../../hooks/queries/usePayees";
import { AutoCompleteCell } from "./AutoCompleteCell";
import { useTransactionRowContext } from "./TransactionRowContext";

export const PayeeCell = () => {
  const { transaction } = useTransactionRowContext();
  const { mutate: patchTransaction } = usePatchTransactions();
  const { data: payees = [] } = usePayees();

  return (
    <AutoCompleteCell
      options={payees}
      value={payees.find((x) => x.id === transaction.payeeId) ?? null}
      getItemLabel={(payee) => payee.name}
      inputProps={{ className: "cell-border flex items-center h-full px-2" }}
      viewProps={{ className: "cell flex items-center px-2" }}
      onChange={(payee) => {
        console.log({ payee });
        patchTransaction([
          {
            id: transaction.id,
            payee: makePatch(
              payee ? (typeof payee === "string" ? payee : payee.name) : null
            ),
          },
        ]);
      }}
    />
  );
};
