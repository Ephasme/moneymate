import { Dialog } from "../../Common/Dialog";
import { MainButton } from "../../Common/MainButton";
import { ModalContent } from "./ModalContent";

// <MainButton collapsed={collapsed} text="Enveloppe" modal={ModalContent} />
export const AddEnvelopeButton = ({ collapsed }: { collapsed?: boolean }) => {
  return (
    <Dialog
      Trigger={({ onOpen }) => (
        <MainButton
          text="Enveloppe"
          setIsOpened={() => onOpen()}
          collapsed={collapsed}
        />
      )}
    >
      {({ onClose }) => <ModalContent onClose={onClose} />}
    </Dialog>
  );
};
