import { EnvelopeView, bim } from "@moneymate/shared";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Autocomplete, Box, Button, Input, IconButton } from "@mui/joy";
import { produce } from "immer";
import _ from "lodash";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { formatCurrency } from "../../helpers/formatCurrency";
import * as mil from "../../helpers/mil";
import { useEnvelopes } from "../../hooks/queries";
import { DotsVerticalIcon } from "../../icons";
import { PlusCircle } from "../../icons/PlusCircle";
import { TrashIcon } from "../../icons/TrashIcon";
import { Menu, MenuItem } from "../Common";

type PartialAllocationItem = {
  envelopeId: string | null;
  amount: bigint;
};

type AllocationItem = {
  envelopeId: string;
  amount: bigint;
};

export function keepValid(x: PartialAllocationItem): x is AllocationItem {
  return x.envelopeId !== null;
}

export type PartialAllocationItems = PartialAllocationItem[];
export type AllocationItems = AllocationItem[];

const ActionsMenu = ({
  allocationItems,
  envelopesById,
  onSplitAll,
  onSplitRemainder,
  onAssignRemainderTo,
}: {
  allocationItems: PartialAllocationItems;
  envelopesById: Record<string, EnvelopeView>;
  onSplitAll: () => void;
  onSplitRemainder: () => void;
  onAssignRemainderTo: (envelopeId: string) => void;
}) => {
  return (
    <Menu
      placement="right"
      trigger={({ onOpen }) => (
        <IconButton onClick={onOpen} size="sm">
          <DotsVerticalIcon />
        </IconButton>
      )}
    >
      {({ onClose }) => (
        <>
          <MenuItem
            onClick={() => {
              onSplitAll();
              onClose();
            }}
            text="Répartir en sommes égales"
          />
          <Menu
            placement="right"
            trigger={({ onOpen }) => (
              <MenuItem
                onClick={onOpen}
                text="Attribuer la somme restante"
                endIcon={<ArrowRightIcon />}
              />
            )}
          >
            <MenuItem
              onClick={() => {
                onSplitRemainder();
                onClose();
              }}
              text="En parts égales entre toutes les enveloppes"
            />
            <Menu
              placement="right"
              trigger={({ onOpen }) => (
                <MenuItem
                  onClick={onOpen}
                  text="Attribuer à"
                  endIcon={<ArrowRightIcon />}
                />
              )}
            >
              {_(allocationItems)
                .filter(keepValid)
                .map(({ envelopeId }) => (
                  <MenuItem
                    key={envelopeId}
                    onClick={() => {
                      onAssignRemainderTo(envelopeId);
                      onClose();
                    }}
                    text={envelopesById[envelopeId].name}
                  />
                ))
                .value()}
            </Menu>
          </Menu>
        </>
      )}
    </Menu>
  );
};

export const TransactionAllocator = ({
  totalAmount,
  allocationItems: _allocationItems,
  onChange,
  onErrors = () => {},
}: {
  totalAmount: bigint;
  allocationItems?: AllocationItems;
  onChange: (selection: AllocationItems) => void;
  onErrors?: (errors: string[]) => void;
}) => {
  const [errors, setErrors] = useState<string[]>([]);
  const [allocationItems, setAllocationItems] =
    useState<PartialAllocationItems>(
      _allocationItems && _allocationItems.length > 0
        ? _allocationItems
        : [{ envelopeId: null, amount: 0n }]
    );
  const [envelopesById, setEnvelopesById] = useState<
    Record<string, EnvelopeView>
  >({});
  const { data: envelopes } = useEnvelopes();

  useEffect(() => {
    setEnvelopesById(
      _(envelopes).reduce(
        (acc, envelope) => ({ ...acc, [envelope.id]: envelope }),
        {} as Record<string, EnvelopeView>
      )
    );
  }, [envelopes]);

  function sumByAmount(selection: PartialAllocationItems) {
    return selection.reduce((acc, { amount }) => acc + amount, 0n);
  }

  function getEnvelopeById(id: string | null) {
    if (id === null) return null;
    return envelopesById[id] ?? null;
  }

  useEffect(() => {
    if (allocationItems.length === 1) {
      setAllocationItems(
        produce((selection) => {
          selection[0].amount = totalAmount;
        })
      );
    }
  }, [totalAmount, allocationItems]);

  useEffect(() => {
    const errors = [];
    if (allocationItems.length === 0) {
      errors.push("Vous devez choisir au moins une enveloppe");
    }
    if (_.some(allocationItems, (item) => item.envelopeId === null)) {
      errors.push("Vous devez remplir toutes les enveloppe manquantes");
    }
    if (bim.sumBy(allocationItems, (x) => x.amount) !== totalAmount) {
      errors.push("Le total des montants doit être égal au montant total");
    }
    setErrors(errors);
    if (errors.length === 0) {
      onChange(allocationItems.filter(keepValid));
    } else {
      onErrors(errors);
    }
  }, [allocationItems]);

  useEffect(() => {
    onErrors(errors);
  }, [errors]);

  function match<T>({
    single = () => null,
    multiple = () => null,
  }: {
    single?: () => T | null;
    multiple?: () => T | null;
  }): T | null {
    if (allocationItems.length === 1) {
      return single();
    } else {
      return multiple();
    }
  }

  if (!envelopes) return <Box>Loading...</Box>;

  return (
    <Box>
      <Box
        className={`items-center ${
          allocationItems.length > 1
            ? "grid grid-cols-[2fr_1fr_40px]"
            : "grid grid-cols-1"
        } gap-2`}
      >
        {match({
          multiple: () => (
            <>
              <Box className="font-bold mb-1">Diviser en enveloppes</Box>
              <Box className="text-right font-bold mb-1">
                / {formatCurrency(totalAmount - sumByAmount(allocationItems))}
              </Box>
              <Box className="justify-self-center">
                <ActionsMenu
                  allocationItems={allocationItems}
                  envelopesById={envelopesById}
                  onAssignRemainderTo={(envelopeId) => {
                    setAllocationItems(
                      produce((selection) => {
                        const remainder =
                          totalAmount - bim.sumBy(selection, (x) => x.amount);
                        const remainderIndex = selection.findIndex(
                          (item) => item.envelopeId === envelopeId
                        );
                        selection[remainderIndex].envelopeId = envelopeId;
                        selection[remainderIndex].amount += remainder;
                      })
                    );
                  }}
                  onSplitAll={() => {
                    setAllocationItems(
                      produce((selection) => {
                        const amountPerEnvelope =
                          totalAmount / BigInt(selection.length);
                        selection.forEach((item) => {
                          item.amount = amountPerEnvelope;
                        });
                        const diff = totalAmount - sumByAmount(selection);
                        if (diff !== 0n) {
                          selection[0].amount += diff;
                        }
                      })
                    );
                  }}
                  onSplitRemainder={() => {
                    setAllocationItems(
                      produce((selection) => {
                        const remainder = totalAmount - sumByAmount(selection);
                        const amountPerEnvelope =
                          remainder / BigInt(selection.length);
                        selection.forEach((item) => {
                          item.amount += amountPerEnvelope;
                        });
                        const diff = totalAmount - sumByAmount(selection);
                        if (diff !== 0n) {
                          selection[0].amount += diff;
                        }
                      })
                    );
                  }}
                />
              </Box>
            </>
          ),
        })}

        {_(allocationItems)
          .map(({ envelopeId, amount }, index) => (
            <Box className="contents" key={index}>
              <Box>
                <Autocomplete
                  size="sm"
                  sx={{
                    ".MuiInputBase-root": {
                      borderRadius: "999rem",
                    },
                  }}
                  options={envelopes}
                  value={getEnvelopeById(envelopeId)}
                  onChange={(_, envelope) => {
                    setAllocationItems(
                      produce((selection) => {
                        selection[index].envelopeId = envelope?.id ?? null;
                      })
                    );
                  }}
                  isOptionEqualToValue={(envelope, value) =>
                    envelope.id === value.id
                  }
                  getOptionLabel={(envelope) => envelope.name}
                  getOptionKey={(envelope) => envelope.id}
                />
              </Box>
              {match({
                multiple: () => (
                  <>
                    <Box>
                      <NumericFormat
                        decimalScale={2}
                        decimalSeparator=","
                        customInput={Input}
                        fixedDecimalScale
                        suffix=" €"
                        fullWidth
                        sx={{
                          input: {
                            textAlign: "right",
                          },
                        }}
                        thousandSeparator=" "
                        size="sm"
                        value={mil.divToNumber(amount)}
                        onValueChange={({ value }) => {
                          if (value !== "" && value !== "-") {
                            setAllocationItems(
                              produce((selection) => {
                                selection[index].amount = mil.mult(value);
                              })
                            );
                          }
                        }}
                      />
                    </Box>
                    <Box className="justify-self-center">
                      <IconButton
                        size="sm"
                        onClick={() => {
                          setAllocationItems(
                            produce((selection) => {
                              selection.splice(index, 1);
                            })
                          );
                        }}
                      >
                        <TrashIcon />
                      </IconButton>
                    </Box>
                  </>
                ),
              })}
            </Box>
          ))
          .value()}

        <Box className="ml-5 mb-3 text-[#0039F2]">
          <Button
            onClick={() => {
              setAllocationItems(
                produce((selection) => {
                  if (selection.length === 1) {
                    selection[0].amount = 0n;
                  }
                  selection.push({ envelopeId: null, amount: 0n });
                })
              );
            }}
          >
            <Box className="flex items-center gap-2">
              <PlusCircle className="fill-[#0039F2]" />
              <Box>
                {allocationItems.length === 1
                  ? "Diviser en plusieurs enveloppes"
                  : "Ajouter une enveloppe"}
              </Box>
            </Box>
          </Button>
        </Box>
      </Box>
      <Box className="flex flex-col pb-4">
        <ul>
          {_.map(errors, (error, index) => (
            <li key={index}>- {error}</li>
          ))}
        </ul>
      </Box>
    </Box>
  );
};
