import * as Spaces from "react-spaces";
import { LeftPanel } from "../Common";
import { create } from "zustand";
import { useEffect } from "react";

export type MainLayoutStore = {
  leftPanelCollapsed: boolean;
  setLeftPanelCollapsed: (collapsed: boolean) => void;
  rightPanelSize: number | string;
  setRightPanelSize: (size: number | string) => void;
};

export const useMainLayoutStore = create<MainLayoutStore>()((set) => ({
  leftPanelCollapsed: false,
  setLeftPanelCollapsed: (collapsed) => {
    set({ leftPanelCollapsed: collapsed });
  },
  rightPanelSize: 0,
  setRightPanelSize: (size) => {
    set({ rightPanelSize: size });
  },
}));

export const MainLayout = ({
  leftPanel = <LeftPanel />,
  rightPanel,
  children,
}: {
  leftPanel?: React.ReactNode;
  rightPanel: React.ReactNode;
  children: React.ReactNode;
}) => {
  const rightPanelSize = useMainLayoutStore((state) => state.rightPanelSize);
  const leftPanelCollapsed = useMainLayoutStore(
    (state) => state.leftPanelCollapsed
  );
  const setLeftPanelCollapsed = useMainLayoutStore(
    (state) => state.setLeftPanelCollapsed
  );
  useEffect(() => {
    console.log(rightPanelSize);
    if (rightPanelSize !== 0) {
      setLeftPanelCollapsed(true);
    } else {
      setLeftPanelCollapsed(false);
    }
  }, [rightPanelSize]);
  return (
    <Spaces.ViewPort className="flex">
      <Spaces.Fill className="flex">
        <Spaces.LeftResizable
          className="flex flex-col bg-[#2C396A] text-white"
          size={leftPanelCollapsed ? "40px" : "22%"}
        >
          {leftPanel}
        </Spaces.LeftResizable>
        <Spaces.Fill className="flex bg-white">{children}</Spaces.Fill>
        <Spaces.RightResizable size={rightPanelSize}>
          {rightPanel}
        </Spaces.RightResizable>
      </Spaces.Fill>
    </Spaces.ViewPort>
  );
};
