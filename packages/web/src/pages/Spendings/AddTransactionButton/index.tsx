import { MainButton } from "../../Common/MainButton";
import { ModalContent } from "./ModalContent";

export const AddTransactionButton = ({
  collapsed,
}: {
  collapsed?: boolean;
}) => {
  return (
    <MainButton
      collapsed={collapsed}
      text={"Transaction"}
      modal={ModalContent}
    />
  );
};
