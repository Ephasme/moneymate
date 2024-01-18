import { Box, ButtonBase } from "@mui/material";
import _ from "lodash";
import { useLayoutEffect, useRef, useState } from "react";
import { useMatches, useNavigate } from "react-router-dom";
import { z } from "zod";
import imageEnveloppe from "../../assets/ImageEnveloppe.png";
import { useStore } from "../../store";
import { Logo } from "./Logo";
import { ReadyToAssign } from "./ReadyToAssign";

const IMatchSchema = z.object({
  id: z.string(),
  pathname: z.string(),
  params: z.record(z.string()),
  data: z.unknown(),
  handle: z.object({
    menu: z.enum(["envelopes", "spendings", "accounts"]).optional(),
  }),
});

export const LeftPanel = ({
  mainButton: MainButton,
}: {
  mainButton?: ({ collapsed }: { collapsed?: boolean }) => React.ReactElement;
}) => {
  const leftPanelCollapsed = useStore((state) => state.leftPanelCollapsed);

  const matches = useMatches();
  const menuName = _(matches)
    .map((x) => IMatchSchema.safeParse(x))
    .map((x) => (x.success ? x.data.handle.menu : undefined))
    .filter((x) => x !== undefined)
    .first();

  const mainButton = MainButton ? (
    <MainButton collapsed={leftPanelCollapsed} />
  ) : null;

  return leftPanelCollapsed ? (
    <LeftPanelCollapsed mainButton={mainButton} menuName={menuName} />
  ) : (
    <LeftPanelExpanded mainButton={mainButton} menuName={menuName} />
  );
};

const LeftPanelCollapsed = ({
  menuName,
  mainButton,
}: {
  menuName: string | undefined;
  mainButton?: React.ReactElement | null;
}) => {
  const budgetId = useStore((state) => state.budgetId);
  const navigate = useNavigate();

  return (
    <Box>
      <Box className="w-14 m-5 mb-[36px]">
        <Logo />
      </Box>
      <Box className="flex items-center justify-center flex-col gap-3 mb-10">
        <Box
          className={`flex gap-3 items-center ${
            menuName === "envelopes" ? "font-bold" : ""
          }`}
        >
          <ButtonBase
            onClick={() => {
              navigate(`/${budgetId}/envelopes`);
            }}
            disableRipple
          ></ButtonBase>
        </Box>
        <Box className="flex gap-3 items-center">
          <ButtonBase
            onClick={() => {
              navigate(`/${budgetId}/accounts`);
            }}
            disableRipple
          ></ButtonBase>
        </Box>
        <Box
          className={`flex gap-3 items-center ${
            menuName === "spendings" ? "font-bold" : ""
          }`}
        >
          <ButtonBase
            onClick={() => {
              navigate(`/${budgetId}/spendings`);
            }}
            disableRipple
          ></ButtonBase>
        </Box>
        <Box className="flex gap-3 items-center">
          <ButtonBase disableRipple></ButtonBase>
        </Box>
      </Box>

      {mainButton && (
        <Box className="flex items-center justify-center mb-20">
          {mainButton}
        </Box>
      )}
    </Box>
  );
};

const LeftPanelExpanded = ({
  mainButton,
  menuName,
}: {
  mainButton?: React.ReactElement | null;
  menuName: string | undefined;
}) => {
  const budgetId = useStore((state) => state.budgetId);
  const [subPanelHeight, setSubPanelHeight] = useState(0);
  const [displaySubPanel, setDisplaySubPanel] = useState(true);
  const subPanelRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const updateSize = () => {
      if (subPanelRef.current) {
        setSubPanelHeight(subPanelRef.current.offsetHeight);
        if (subPanelRef.current.offsetHeight < 193) {
          setDisplaySubPanel(false);
        } else {
          setDisplaySubPanel(true);
        }
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  });

  return (
    <Box className="flex flex-col w-[17.75rem]">
      <Box className="flex items-center gap-2 mt-4 mb-10 ml-8">
        <Box className="w-8">
          <Logo />
        </Box>
        <Box className="font-alt text-[22px] leading-6">
          <span className="font-bold">money</span>
          <span className="font-light">mate</span>
        </Box>
      </Box>
      <Box className="flex flex-col gap-3 ml-8 mb-10">
        <Box
          className={`flex gap-3 items-center ${
            menuName === "envelopes" ? "font-bold" : ""
          }`}
        >
          <ButtonBase
            onClick={() => {
              navigate(`/${budgetId}/envelopes`);
            }}
            disableRipple
          >
            Enveloppes
          </ButtonBase>
        </Box>
        <Box
          className={`flex gap-3 items-center ${
            menuName === "accounts" ? "font-bold" : ""
          }`}
        >
          <ButtonBase
            onClick={() => {
              navigate(`/${budgetId}/accounts`);
            }}
            disableRipple
          >
            Comptes
          </ButtonBase>
        </Box>
        <Box
          className={`flex gap-3 items-center ${
            menuName === "spendings" ? "font-bold" : ""
          }`}
        >
          <ButtonBase
            onClick={() => {
              navigate(`/${budgetId}/spendings`);
            }}
            disableRipple
          >
            Dépenses
          </ButtonBase>
        </Box>
        <Box className="flex gap-3 items-center">
          <ButtonBase disableRipple>Réglages</ButtonBase>
        </Box>
      </Box>
      <Box className="ml-8 mb-20">{mainButton ?? null}</Box>

      <ReadyToAssign />
      <Box className="border-[0.5px] border-black w-[4.5rem] ml-8 mt-5 mb-4"></Box>
      <Box className="w-[8.5rem] ml-8 leading-5 text-[0.93rem]">
        Votre budget peut tenir 3 mois.
      </Box>
      <Box
        ref={subPanelRef}
        className="flex-grow flex flex-col items-start justify-end"
      >
        {displaySubPanel && (
          <img
            className=""
            style={{
              borderRadius: "0 2rem 0 0",
              objectFit: "none",
              objectPosition: "100% 100%",
              height: `calc(${subPanelHeight}px - 2.5rem)`,
              width: "14rem",
            }}
            src={imageEnveloppe}
            alt="Enveloppe"
          />
        )}
      </Box>
    </Box>
  );
};
