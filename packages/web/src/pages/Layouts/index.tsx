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
      <Spaces.Fill>
        <Spaces.LeftResizable
          className="flex flex-col bg-blue-300"
          size={"25%"}
        >
          {leftPanel}
        </Spaces.LeftResizable>
        <Spaces.Fill className="flex bg-white">{children}</Spaces.Fill>
      </Spaces.Fill>
    </Spaces.ViewPort>
  );
};
