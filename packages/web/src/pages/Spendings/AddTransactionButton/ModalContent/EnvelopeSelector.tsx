import { EnvelopeView, bim } from "@moneymate/shared";
import {
  Autocomplete,
  Box,
  ButtonBase,
  IconButton,
  TextField,
} from "@mui/material";
import { produce } from "immer";
import _ from "lodash";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { formatCurrency } from "../../../../helpers/formatCurrency";
import * as mil from "../../../../helpers/mil";
import { useEnvelopes } from "../../../../hooks/queries";
import { PlusCircle } from "../../../../icons/PlusCircle";
import { TrashIcon } from "../../../../icons/TrashIcon";
import { ActionsMenu } from "./ActionsMenu";

type EnvelopeSelectionItem = {
  envelope: EnvelopeView | null;
  amount: bigint;
};

type NotNullEnvelopeSelectionItem = {
  envelope: EnvelopeView;
  amount: bigint;
};

export function keepNotNull(
  x: EnvelopeSelectionItem
): x is NotNullEnvelopeSelectionItem {
  return x.envelope !== null;
}

export type EnvelopeSelection = EnvelopeSelectionItem[];

export const EnvelopeSelector = ({
  totalAmount,
  onChange,
}: {
  totalAmount: bigint;
  onChange: (selection: EnvelopeSelection) => void;
}) => {
  const [selection, setSelection] = useState<EnvelopeSelection>([
    { envelope: null, amount: totalAmount },
  ]);
  const { data: envelopes } = useEnvelopes();

  function sumByAmount(selection: EnvelopeSelection) {
    return selection.reduce((acc, { amount }) => acc + amount, 0n);
  }

  useEffect(() => {
    if (selection.length === 1) {
      setSelection(
        produce((selection) => {
          selection[0].amount = totalAmount;
        })
      );
    }
  }, [totalAmount]);

  useEffect(() => {
    onChange(selection);
  }, [selection]);

  function match<T>({
    single = () => null,
    multiple = () => null,
  }: {
    single?: () => T | null;
    multiple?: () => T | null;
  }): T | null {
    if (selection.length === 1) {
      return single();
    } else {
      return multiple();
    }
  }

  if (!envelopes) return <Box>Loading...</Box>;

  return (
    <Box
      className={`items-center ${
        selection.length > 1
          ? "grid grid-cols-[2fr_1fr_40px]"
          : "grid grid-cols-1"
      } gap-2`}
    >
      {match({
        multiple: () => (
          <>
            <Box className="font-bold mb-1">Diviser en enveloppes</Box>
            <Box className="text-right font-bold mb-1">
              / {formatCurrency(totalAmount - sumByAmount(selection))}
            </Box>
            <Box className="justify-self-center">
              <ActionsMenu
                selection={selection}
                onAssignRemainderTo={(envelope) => {
                  setSelection(
                    produce((selection) => {
                      const remainder =
                        totalAmount - bim.sumBy(selection, (x) => x.amount);
                      const remainderIndex = selection.findIndex(
                        (item) => item.envelope?.id === envelope.id
                      );
                      selection[remainderIndex].envelope = envelope;
                      selection[remainderIndex].amount += remainder;
                    })
                  );
                }}
                onSplitAll={() => {
                  setSelection(
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
                  setSelection(
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

      {_(selection)
        .map(({ envelope, amount }, index) => (
          <Box className="contents" key={index}>
            <Box>
              <Autocomplete
                size="small"
                sx={{
                  ".MuiInputBase-root": {
                    borderRadius: "999rem",
                  },
                }}
                options={envelopes}
                value={envelope}
                onChange={(_, envelope) => {
                  setSelection(
                    produce((selection) => {
                      selection[index].envelope = envelope;
                    })
                  );
                }}
                isOptionEqualToValue={(envelope, value) =>
                  envelope.id === value.id
                }
                getOptionLabel={(envelope) => envelope.name}
                getOptionKey={(envelope) => envelope.id}
                renderInput={(params) => <TextField {...params} />}
              />
            </Box>
            {match({
              multiple: () => (
                <>
                  <Box>
                    <NumericFormat
                      decimalScale={2}
                      decimalSeparator=","
                      customInput={TextField}
                      fixedDecimalScale
                      suffix=" €"
                      fullWidth
                      variant="standard"
                      sx={{
                        input: {
                          textAlign: "right",
                        },
                      }}
                      thousandSeparator=" "
                      size="small"
                      value={mil.divToNumber(amount)}
                      onValueChange={({ value }) => {
                        if (value !== "" && value !== "-") {
                          setSelection(
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
                      size="small"
                      onClick={() => {
                        setSelection(
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

      <Box className="ml-5 mb-6 text-[#0039F2]">
        <ButtonBase
          disableRipple
          onClick={() => {
            setSelection(
              produce((selection) => {
                if (selection.length === 1) {
                  selection[0].amount = 0n;
                }
                selection.push({ envelope: null, amount: 0n });
              })
            );
          }}
        >
          <Box className="flex items-center gap-2">
            <PlusCircle className="fill-[#0039F2]" />
            <Box>
              {selection.length === 1
                ? "Diviser en plusieurs enveloppes"
                : "Ajouter une enveloppe"}
            </Box>
          </Box>
        </ButtonBase>
      </Box>
    </Box>
  );
};
