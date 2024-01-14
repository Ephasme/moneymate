import { Dialog } from "../../Common/Dialog";
import { MainButton } from "../../Common/MainButton";
import { ModalContent } from "../EditTransactionModal/ModalContent";

export const AddTransactionButton = ({
  collapsed,
}: {
  collapsed?: boolean;
}) => {
  return (
    <Dialog
      Trigger={({ onOpen }) => (
        <MainButton
          text="Transaction"
          setIsOpened={onOpen}
          collapsed={collapsed}
        />
      )}
    >
      {({ onClose }) => <ModalContent onClose={onClose} />}
    </Dialog>
  );
};
