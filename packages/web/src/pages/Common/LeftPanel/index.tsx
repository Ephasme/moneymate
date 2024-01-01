import { MAIN_ENVELOPE_ID } from "@moneymate/shared";
import { Box, ButtonBase } from "@mui/material";
import { useLayoutEffect, useRef, useState } from "react";
import imageEnveloppe from "../../../assets/ImageEnveloppe.png";
import * as mil from "../../../helpers/mil";
import { AddEnvelopeButton } from "../AddEnvelopeButton";
import { Logo } from "../Logo";
import {
  FolderOpenIcon,
  CreditCardIcon,
  CashIcon,
  CogIcon,
} from "../../../icons";
import { useBudget, useEnvelope } from "../../../hooks/queries";

export const LeftPanel = () => {
  const { data: budget } = useBudget();
  const { data: mainEnvelope } = useEnvelope(MAIN_ENVELOPE_ID);
  const [subPanelHeight, setSubPanelHeight] = useState(0);
  const [displaySubPanel, setDisplaySubPanel] = useState(true);
  const subPanelRef = useRef<HTMLDivElement>(null);

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

  if (!budget) return <Box>Loading budget...</Box>;
  if (!mainEnvelope) return <Box>Loading main envelope...</Box>;

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
        <Box className="flex gap-3 items-center">
          <FolderOpenIcon strokeWidth={0.8} />
          <ButtonBase disableRipple>Enveloppes</ButtonBase>
        </Box>
        <Box className="flex gap-3 items-center">
          <CreditCardIcon strokeWidth={0.8} />
          <ButtonBase disableRipple>Comptes</ButtonBase>
        </Box>
        <Box className="flex gap-3 items-center">
          <CashIcon strokeWidth={0.8} />
          <ButtonBase disableRipple>Dépenses</ButtonBase>
        </Box>
        <Box className="flex gap-3 items-center">
          <CogIcon strokeWidth={0.8} />
          <ButtonBase disableRipple>Réglages</ButtonBase>
        </Box>
      </Box>
      <Box className="ml-8 mb-20">
        <AddEnvelopeButton />
      </Box>
      <Box className="flex flex-col ml-8 text-3xl w-40 leading-8 font-medium">
        {mil.divStr(mainEnvelope.balance)}
        <br />à assigner.
      </Box>
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
