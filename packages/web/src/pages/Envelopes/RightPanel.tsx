import { Box } from "@mui/material";
import { useEffect, useLayoutEffect, useState } from "react";
import { formatCurrency } from "../../helpers/formatCurrency";
import { useEnvelope } from "../../hooks/queries";
import { useStore } from "../../store";

export const AmountSpan = ({ amount }: { amount: bigint }) => {
  const [fontSize, setFontSize] = useState(16);

  useLayoutEffect(() => {
    const length = amount.toString().length;
    if (length > 5) {
      setFontSize(16 - (length - 5));
    }
  }, []);

  return (
    <div
      className="flex items-center justify-center"
      style={{ fontSize: `${fontSize}px` }}
    >
      {formatCurrency(amount)}
    </div>
  );
};

const SingleEnvelopeDetails = ({ envelopeId }: { envelopeId: string }) => {
  const { data: envelope } = useEnvelope(envelopeId);
  if (!envelope) return <Box>Loading envelope...</Box>;

  // console.log({ allocations: envelope.allocations });
  return (
    <Box
      className={`flex flex-col relative w-[25vw] min-w-[16rem] bg-[#F2F4F8] rounded-3xl mr-4 mb-4 overflow-hidden`}
    >
      <Box className="absolute top-0 right-0 text-[230px] h-[10rem] -translate-y-8 translate-x-14 overflow-hidden">
        {envelope.emoji}
      </Box>
      <Box className="absolute top-0 right-0 w-full text-[230px] h-[8rem] backdrop-blur-md bg-[#f2f4f8ac] mix-blend-multiply"></Box>
      <Box className="absolute flex top-[8rem] right-1/2 translate-x-1/2 -translate-y-1/2">
        <Box
          className="flex items-center justify-center text-[45px] bg-white w-16 h-16 rounded-lg"
          sx={{
            boxShadow: "0px 0px 16px 0px rgba(0, 0, 0, 0.16)",
          }}
        >
          <Box className="flex items-center justify-center h-12 w-12">
            {envelope.emoji}
          </Box>
        </Box>
      </Box>
      <Box className="flex justify-center px-8 pb-2 mt-[12rem] text-2xl font-bold">
        {envelope.name}
      </Box>
      <Box className="flex justify-center px-8 pb-5 text-sm">
        {envelope.description}
      </Box>
      <Box className="flex justify-between px-8">
        <Box className="flex flex-col">
          <Box className="font-medium">attribués</Box>
          <Box className="flex flex-grow items-center font-bold">
            <AmountSpan amount={envelope.allocated} />
          </Box>
        </Box>

        <Box className="border-l-[0.7px] border-l-[#999EAD]"></Box>

        <Box className="flex flex-col">
          <Box className="font-medium">dépensés</Box>
          <Box className="flex flex-grow items-center font-bold">
            <AmountSpan amount={-550078348n} />
          </Box>
        </Box>

        <Box className="border-l-[0.7px] border-l-[#999EAD]"></Box>

        <Box className="flex flex-col pl-2">
          <Box className="font-medium">restant</Box>
          <Box className="flex flex-grow items-center font-bold">
            <AmountSpan amount={envelope.balance} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const MultiEnvelopesDetails = () => {
  return (
    <Box
      className={`flex w-[25vw] min-w-[16rem] bg-[#F2F4F8] rounded-3xl p-5 mr-4 mb-4`}
    >
      <Box>Multi envelope details</Box>
    </Box>
  );
};

export const RightPanel = () => {
  const selectedEnvelopes = useStore((state) => state.selectedEnvelopes);
  const setLeftPanelCollapsed = useStore(
    (state) => state.setLeftPanelCollapsed
  );
  const setRightPanelCollapsed = useStore(
    (state) => state.setRightPanelCollapsed
  );

  useEffect(() => {
    if (selectedEnvelopes.length >= 1) {
      setLeftPanelCollapsed(true);
      setRightPanelCollapsed(false);
    } else {
      setLeftPanelCollapsed(false);
      setRightPanelCollapsed(true);
    }
  }, [selectedEnvelopes]);

  if (selectedEnvelopes.length === 1) {
    return <SingleEnvelopeDetails envelopeId={selectedEnvelopes[0]} />;
  } else if (selectedEnvelopes.length > 1) {
    return <MultiEnvelopesDetails />;
  }

  return null;
};
