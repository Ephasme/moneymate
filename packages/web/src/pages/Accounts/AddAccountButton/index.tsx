import { MainButton } from "../../Common/MainButton";
import { ModalContent } from "./ModalContent";

export const AddAccountButton = ({ collapsed }: { collapsed?: boolean }) => {
  return (
    <MainButton collapsed={collapsed} text={"Account"} modal={ModalContent} />
  );
};
