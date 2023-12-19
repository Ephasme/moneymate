import {
  EnvelopeView,
  MAIN_ENVELOPE_GROUP_ID,
  SYSTEM_ENVELOPE_GROUP_ID,
} from "@moneymate/shared";
import AddIcon from "@mui/icons-material/Add";
import ArrowDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Box, Checkbox, IconButton } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { formatCurrency } from "../../helpers/formatCurrency";
import { useBudget } from "../Common/useBudget";
import { useEnvelopeGroups } from "../Common/useEnvelopeGroups";
import { useEnvelopes } from "../Common/useEnvelopes";
import { AllocatedField } from "./AllocatedField";
import { AssignPopup } from "./AssignPopup";
import { AvailableFunds } from "./AvailableFunds";
import { CreateEnvelopeDialog } from "./CreateEnvelopeDialog";
import { CreateEnvelopeGroupDialog } from "./CreateEnvelopeGroupDialog";
import { CurrentMonthSelector } from "./CurrentMonthSelector";
import _ from "lodash";
import { useBudgetViewStore } from "./store";
import { EnvelopeName } from "./EnvelopeName";
import { EnvelopeGroupName } from "./EnvelopeGroupName";

type EnvelopeGroupInfo = {
  allocated: bigint;
  activity: bigint;
  balance: bigint;
};

export const EnvelopeList = () => {
  const [currentGroupId, setCurrentGroupId] = useState<string>();
  const [showHidden, setShowHidden] = useState(false);
  const [createEnvelopeModalOpen, setCreateEnvelopeModalOpen] = useState(false);
  const [createEnvelopeGroupModalOpen, setCreateEnvelopeGroupModalOpen] =
    useState(false);
  const [envelopeById, setEnvelopeById] = useState<Map<string, EnvelopeView>>(
    new Map()
  );
  const [envelopeGroupInfo, setEnvelopeGroupInfo] = useState<
    Map<string, EnvelopeGroupInfo>
  >(new Map());

  const selectedEnvelopes = useBudgetViewStore(
    (state) => state.selectedEnvelopes
  );
  const selectEnvelopes = useBudgetViewStore((state) => state.selectEnvelopes);
  const removeEnvelopes = useBudgetViewStore((state) => state.removeEnvelopes);
  const setSelectedEnvelopes = useBudgetViewStore(
    (state) => state.setSelectedEnvelopes
  );

  const groupStates = useBudgetViewStore((state) => state.groupStates);
  const setGroupStates = useBudgetViewStore((state) => state.setGroupStates);
  const toggleGroupState = useBudgetViewStore(
    (state) => state.toggleGroupState
  );

  const { data: budget } = useBudget();
  const { data: envelopes } = useEnvelopes();
  const { data: envelopeGroups } = useEnvelopeGroups();

  useEffect(() => {
    if (envelopes) {
      setEnvelopeById(
        envelopes.reduce((acc, envelope) => {
          acc.set(envelope.id, envelope);
          return acc;
        }, new Map<string, EnvelopeView>())
      );

      setEnvelopeGroupInfo(
        _(envelopes)
          .groupBy((x) => x.parentId)
          .mapValues((group) => {
            return {
              allocated: group.reduce(
                (acc, x) => acc + (x.allocated ?? 0n),
                0n
              ),
              activity: group.reduce((acc, x) => acc + (x.activity ?? 0n), 0n),
              balance: group.reduce((acc, x) => acc + (x.balance ?? 0n), 0n),
            };
          })
          .reduce((acc, value, key) => {
            acc.set(key, value);
            return acc;
          }, new Map<string, EnvelopeGroupInfo>())
      );

      setDefaultEnvelope(envelopes.find((x) => x.isDefault));
    }
  }, [envelopes]);

  const [defaultEnvelope, setDefaultEnvelope] = useState<EnvelopeView>();

  const getGlobalStatus = useCallback(() => {
    if (envelopes) {
      const checked = _(envelopes).every((x) =>
        selectedEnvelopes.includes(x.id)
      );
      const indeterminate =
        !checked && _(envelopes).some((x) => selectedEnvelopes.includes(x.id));
      return { checked, indeterminate };
    }
    return { checked: false, indeterminate: false };
  }, [envelopes, selectedEnvelopes]);

  const getGroupStatus = useCallback(
    (groupId: string) => {
      if (envelopeGroups) {
        const envelopes =
          envelopeGroups.find((x) => x.id === groupId)?.envelopes ?? [];
        const checked = _(envelopes).every((x) =>
          selectedEnvelopes.includes(x)
        );
        const indeterminate =
          !checked && _(envelopes).some((x) => selectedEnvelopes.includes(x));
        return { checked, indeterminate };
      }
      return { checked: false, indeterminate: false };
    },
    [envelopes, envelopeGroups, selectedEnvelopes]
  );

  if (!envelopes || !defaultEnvelope || !envelopeGroups)
    return <Box>Loading envelopes...</Box>;

  const filteredGroups = envelopeGroups?.filter(
    (group) =>
      group.id !== SYSTEM_ENVELOPE_GROUP_ID &&
      group.id !== MAIN_ENVELOPE_GROUP_ID
  );

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
      <Box className="flex items-center">
        <Checkbox
          size="small"
          checked={showHidden}
          onChange={(_, value) => {
            setShowHidden(value);
          }}
        />
        <Box>Show hidden envelopes</Box>
      </Box>
      <Box
        className="grid"
        sx={{ gridTemplateColumns: "38px 24px auto 20% 20% 20%" }}
      >
        <Box className="flex border-y border-slate-300 items-center">
          <Checkbox
            sx={{ "&.MuiCheckbox-root": { p: 0, pl: "0.5rem" } }}
            disableRipple
            size="small"
            checked={getGlobalStatus().checked}
            indeterminate={getGlobalStatus().indeterminate}
            onChange={(_, checked) => {
              if (checked) {
                setSelectedEnvelopes(envelopes.map((x) => x.id));
              } else {
                setSelectedEnvelopes([]);
              }
            }}
          />
        </Box>
        <Box className="flex border-y border-slate-300 items-center">
          <IconButton
            onClick={() => {
              const newState = _.some(
                filteredGroups,
                (group) => groupStates[group.id] === "open"
              )
                ? ("closed" as const)
                : ("open" as const);
              setGroupStates(
                Object.fromEntries(
                  filteredGroups.map((group) => {
                    return [group.id, newState];
                  })
                )
              );
            }}
            sx={{ "&.MuiButtonBase-root": { p: 0 } }}
            size="small"
          >
            {_.some(
              filteredGroups,
              (group) => groupStates[group.id] === "open"
            ) ? (
              <ArrowDownIcon />
            ) : (
              <ArrowRightIcon />
            )}
          </IconButton>
        </Box>
        <Box className="flex items-center border-y border-slate-300 gap-2 uppercase text-sm pl-2 text-left">
          <Box>Envelope</Box>
          <IconButton
            size="small"
            onClick={() => {
              setCreateEnvelopeGroupModalOpen(true);
            }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>
        <Box className="flex items-center border-y border-slate-300 justify-end uppercase pr-2 py-3 text-sm text-right">
          <Box>Allocated</Box>
        </Box>
        <Box className="flex items-center border-y border-slate-300 justify-end uppercase pr-2 py-3 text-sm text-right">
          <Box>Activity</Box>
        </Box>
        <Box className="flex items-center border-y border-slate-300 justify-end uppercase pr-4 py-3 text-sm text-right">
          <Box>Balance</Box>
        </Box>
        {filteredGroups.map((group) => {
          if (!showHidden && group.isHidden) return null;
          return (
            <Box key={group.id} className="contents">
              <Box className="flex items-center border-b border-slate-300 bg-[#EDF1F5]">
                <Checkbox
                  checked={getGroupStatus(group.id).checked}
                  indeterminate={getGroupStatus(group.id).indeterminate}
                  onChange={(_, checked) => {
                    if (checked) {
                      selectEnvelopes(
                        envelopeGroups?.find((x) => x.id === group.id)
                          ?.envelopes ?? []
                      );
                    } else {
                      removeEnvelopes(
                        selectedEnvelopes.filter((x) =>
                          envelopeGroups
                            ?.find((x) => x.id === group.id)
                            ?.envelopes.includes(x)
                        )
                      );
                    }
                  }}
                  sx={{ "&.MuiCheckbox-root": { p: 0, pl: "0.5rem" } }}
                  disableRipple
                  size="small"
                />
              </Box>
              <Box className="flex border-b border-slate-300 bg-[#EDF1F5] items-center">
                <IconButton
                  sx={{ "&.MuiButtonBase-root": { p: 0 } }}
                  size="small"
                  onClick={() => toggleGroupState(group.id)}
                >
                  {groupStates[group.id] === "open" ? (
                    <ArrowDownIcon />
                  ) : (
                    <ArrowRightIcon />
                  )}
                </IconButton>
              </Box>
              <Box
                className="flex items-center border-b border-slate-300 gap-2 pl-2 bg-[#EDF1F5]"
                key={group.id}
              >
                <EnvelopeGroupName envelopeGroupId={group.id} />
                <IconButton
                  size="small"
                  onClick={() => {
                    setCurrentGroupId(group.id);
                    setCreateEnvelopeModalOpen(true);
                  }}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Box>
              <Box className="flex bg-[#EDF1F5] pr-2 py-2 border-b border-slate-300 flex-grow items-center justify-end font-number">
                {formatCurrency(
                  envelopeGroupInfo.get(group.id)?.allocated ?? 0n
                )}
              </Box>
              <Box className="flex bg-[#EDF1F5] pr-2 py-2 border-b border-slate-300 flex-grow items-center justify-end font-number">
                {formatCurrency(
                  envelopeGroupInfo.get(group.id)?.activity ?? 0n
                )}
              </Box>
              <Box className="flex bg-[#EDF1F5] pr-4 py-2 border-b border-slate-300 flex-grow items-center justify-end font-number">
                {formatCurrency(envelopeGroupInfo.get(group.id)?.balance ?? 0n)}
              </Box>

              {groupStates[group.id] === "open" &&
                group.envelopes.map((id) => {
                  const { activity, isHidden } = envelopeById.get(id) ?? {};
                  if (!showHidden && isHidden) return null;
                  return (
                    <Box className="contents" key={id}>
                      <Box className="flex items-center border-b border-slate-300 justify-start">
                        <Checkbox
                          checked={selectedEnvelopes.includes(id)}
                          onChange={(_, checked) => {
                            if (checked) {
                              selectEnvelopes([id]);
                            } else {
                              removeEnvelopes([id]);
                            }
                          }}
                          sx={{
                            "&.MuiCheckbox-root": { p: 0, pl: "0.5rem" },
                          }}
                          disableRipple
                          size="small"
                        />
                      </Box>
                      <Box className="border-b border-slate-300"></Box>
                      <Box className="flex items-center py-2 pl-2 border-b border-slate-300 justify-start">
                        <EnvelopeName envelopeId={id} />
                      </Box>
                      <Box className="flex items-center py-2 border-b border-slate-300 justify-end">
                        <AllocatedField envelopeId={id} />
                      </Box>
                      <Box className="flex items-center py-2 border-b border-slate-300 justify-end pr-2 font-number">
                        {formatCurrency(activity ?? 0n)}
                      </Box>
                      <Box className="flex items-center py-2 border-b border-slate-300 justify-end pr-2">
                        <AssignPopup envelopeId={id}>
                          {({ envelope }) => (
                            <Box
                              sx={{ fontFamily: "Figtree" }}
                              className={`inline-block rounded-full cursor-pointer px-2 ${
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
            </Box>
          );
        })}
      </Box>
      <CreateEnvelopeDialog
        groupId={currentGroupId}
        open={createEnvelopeModalOpen}
        onClose={() => {
          setCreateEnvelopeModalOpen(false);
        }}
      />
      <CreateEnvelopeGroupDialog
        open={createEnvelopeGroupModalOpen}
        onClose={() => {
          setCreateEnvelopeGroupModalOpen(false);
        }}
      />
    </Box>
  );
};
