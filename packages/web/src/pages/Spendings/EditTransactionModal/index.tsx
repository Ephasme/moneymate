import { Dialog } from "../../Common/Dialog";
import { useTransactionRowContext } from "../TransactionRow/useTransactionContext";
import { ModalContent } from "./ModalContent";

export const EditTransactionModal = ({
  Trigger,
}: {
  Trigger: ({ onOpen }: { onOpen: () => void }) => React.ReactNode;
}) => {
  const { transaction } = useTransactionRowContext();
  return (
    <Dialog Trigger={Trigger}>
      {({ onClose }) => (
        <ModalContent transaction={transaction} onClose={onClose} />
      )}
    </Dialog>
  );
};
