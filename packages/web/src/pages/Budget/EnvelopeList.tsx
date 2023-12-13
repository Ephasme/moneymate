import { EnvelopeView } from "@moneymate/shared";
import AddIcon from "@mui/icons-material/Add";
import { Box, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../helpers/formatCurrency";
import { useBudget } from "../Common/useBudget";
import { useEnvelopeGroups } from "../Common/useEnvelopeGroups";
import { useEnvelopes } from "../Common/useEnvelopes";
import { AllocatedField } from "./AllocatedField";
import { AssignPopup } from "./AssignPopup";
import { AvailableFunds } from "./AvailableFunds";
import { CurrentMonthSelector } from "./CurrentMonthSelector";
import { EditEnvelopeDialog } from "./EditEnvelopeDialog";
import { EditEnvelopeGroupDialog } from "./EditEnvelopeGroupDialog";

export const EnvelopeList = () => {
  const [envelopeEditionModalOpen, setEnvelopeEditionModalOpen] =
    useState(false);
  const [envelopeGroupEditionModalOpen, setEnvelopeGroupEditionModalOpen] =
    useState(false);
  const [envelopeId, setEnvelopeId] = useState<string | undefined>(undefined);
  const [currentGroupId, setCurrentGroupId] = useState<string | undefined>(
    undefined
  );
  const [envelopeGroupId, setEnvelopeGroupId] = useState<string | undefined>(
    undefined
  );
  const { data: budget } = useBudget();
  const { data: envelopes } = useEnvelopes();
  const { data: envelopeGroups } = useEnvelopeGroups();

  const [defaultEnvelope, setDefaultEnvelope] = useState<EnvelopeView>();
  useEffect(() => {
    if (!envelopes) return;
    setDefaultEnvelope(envelopes.find((x) => x.isDefault));
  }, [envelopes]);

  if (!envelopes || !defaultEnvelope || !envelopeGroups)
    return <Box>Loading envelopes...</Box>;

  const envelopesById = envelopes.reduce((acc, envelope) => {
    acc[envelope.id] = envelope;
    return acc;
  }, {} as Record<string, EnvelopeView>);

  return (
    <Box className="flex-grow">
      {budget?.unallocatedAmount === 0n ? null : (
        <Box className="p-2 bg-orange-100">
          Unallocated money: {budget?.unallocatedAmount.toString()}
        </Box>
      )}
      <Box className="flex flex-row p-2">
        <CurrentMonthSelector />
        <AvailableFunds />
      </Box>
      <Box
        className="grid p-2"
        sx={{ gridTemplateColumns: "auto 20% 20% 20%" }}
      >
        <Box className="flex items-center gap-2 uppercase bg-slate-200 text-sm text-left p-2 mb-2">
          <Box>Name</Box>
          <IconButton
            size="small"
            onClick={() => {
              setEnvelopeGroupId(undefined);
              setEnvelopeGroupEditionModalOpen(true);
            }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>
        <Box className="flex items-center justify-end uppercase bg-slate-200 text-sm text-right p-2 mb-2 pr-5">
          <Box>Allocated</Box>
        </Box>
        <Box className="flex items-center justify-end uppercase bg-slate-200 text-sm text-right p-2 mb-2">
          <Box>Activity</Box>
        </Box>
        <Box className="flex items-center justify-end uppercase bg-slate-200 text-sm text-right p-2 mb-2">
          <Box>Balance</Box>
        </Box>
        {envelopeGroups?.map((group) => {
          return (
            <>
              <Box
                className="flex items-center"
                key={group.id}
                sx={{ gridColumn: "1 / span 4" }}
              >
                <Box>{group.name}</Box>
                <IconButton
                  size="small"
                  onClick={() => {
                    setCurrentGroupId(group.id);
                    setEnvelopeId(undefined);
                    setEnvelopeEditionModalOpen(true);
                  }}
                >
                  <AddIcon />
                </IconButton>
              </Box>
              {group.envelopes.map((id) => {
                const { name, activity } = envelopesById[id];
                return (
                  <Box className="contents" key={id}>
                    <Box className="pl-3 pr-3 pb-2">{name}</Box>
                    <Box className="flex justify-end pl-3 pr-3 pb-2">
                      <AllocatedField envelopeId={id} />
                    </Box>
                    <Box className="flex justify-end pl-3 pr-3 pb-2 font-number">
                      {formatCurrency(activity)}
                    </Box>
                    <Box className="flex justify-end pl-3 pr-3 pb-2">
                      <AssignPopup envelopeId={id}>
                        {({ envelope }) => (
                          <Box
                            sx={{ fontFamily: "Figtree" }}
                            className={`inline-block rounded-full pl-3 pr-3 cursor-pointer ${
                              envelope.balance < 0
                                ? "bg-[#FAACA5]"
                                : "bg-[#C1EE9F]"
                            }`}
                          >
                            {formatCurrency(envelope.balance)}
                          </Box>
                        )}
                      </AssignPopup>
                    </Box>
                  </Box>
                );
              })}
            </>
          );
        })}
      </Box>

      <EditEnvelopeDialog
        envelopeId={envelopeId}
        groupId={currentGroupId}
        open={envelopeEditionModalOpen}
        onClose={() => {
          setEnvelopeEditionModalOpen(false);
        }}
      />
      <EditEnvelopeGroupDialog
        envelopeGroupId={envelopeGroupId}
        open={envelopeGroupEditionModalOpen}
        onClose={() => {
          setEnvelopeGroupEditionModalOpen(false);
        }}
      />
    </Box>
  );
};
