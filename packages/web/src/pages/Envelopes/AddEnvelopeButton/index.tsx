import { MainButton } from "../../Common/MainButton";
import { ModalContent } from "./ModalContent";

export const AddEnvelopeButton = ({ collapsed }: { collapsed?: boolean }) => {
  return (
    <MainButton collapsed={collapsed} text="Enveloppe" modal={ModalContent} />
  );
};
