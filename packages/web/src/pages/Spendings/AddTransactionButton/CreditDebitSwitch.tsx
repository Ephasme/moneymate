import { Box } from "@mui/joy";
import { useEffect, useState } from "react";

export const CreditDebitSwitch = ({
  value,
  onChanged,
}: {
  value: "debit" | "credit";
  onChanged: (value: "debit" | "credit") => void;
}) => {
  const [position, setPosition] = useState("0");

  useEffect(() => {
    if (value === "debit") {
      setPosition("0");
    } else {
      setPosition("full");
    }
  }, [value]);

  return (
    <Box
      onClick={() => {
        if (value === "debit") {
          onChanged("credit");
        } else {
          onChanged("debit");
        }
      }}
      className="flex relative rounded-full bg-[#DEDBE7] mx-auto h-10 w-[12rem]"
    >
      <Box
        className={`absolute bg-white rounded-full top-0 left-0 translate-x-${position} h-10 w-[6rem] transition-all`}
      ></Box>
      <Box
        className={`absolute top-1/2 -translate-y-1/2 left-1/4 -translate-x-1/2 `}
      >
        - dépenses
      </Box>
      <Box
        className={`absolute top-1/2 -translate-y-1/2 right-1/4 translate-x-1/2 `}
      >
        + revenus
      </Box>
    </Box>
  );
};
