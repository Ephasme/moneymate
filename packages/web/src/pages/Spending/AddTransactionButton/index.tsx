import { MainButton } from "../../Common/MainButton";

export const ModalContent = () => {
  return <div>Content modal</div>;
};

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
