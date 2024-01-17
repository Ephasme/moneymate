import { usePostTransactions } from "../../../hooks/queries/usePostTransactions";
import { useStore } from "../../../store";
import { MainButton } from "../../Common/MainButton";

export const AddTransactionButton = ({
  collapsed,
}: {
  collapsed?: boolean;
}) => {
  const budgetId = useStore((state) => state.budgetId);
  const { mutate: postTransaction } = usePostTransactions();

  return (
    <MainButton
      text="Transaction"
      collapsed={collapsed}
      onClick={() => {
        postTransaction([
          {
            amount: "0",
            budgetId,
            date: new Date().toISOString(),
            allocations: [],
            description: "",
          },
        ]);
      }}
    />
  );
};
