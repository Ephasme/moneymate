import * as Spaces from "react-spaces";
import { LeftPanel } from "../Common";

export const MainLayout = ({
  leftPanel = <LeftPanel />,
  children,
}: {
  leftPanel?: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <Spaces.ViewPort className="flex">
      <Spaces.Fill className="flex">
        <Spaces.LeftResizable
          className="flex flex-col bg-[#2C396A] text-white"
          size={"22%"}
        >
          {leftPanel}
        </Spaces.LeftResizable>
        <Spaces.Fill className="flex bg-white">{children}</Spaces.Fill>
      </Spaces.Fill>
    </Spaces.ViewPort>
  );
};
