import { bim } from "@moneymate/shared";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MoreIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import { produce } from "immer";
import _ from "lodash";
import { useEnvelopes } from "../../../hooks/queries";
import { Menu, MenuItem } from "../../Common";
import { NullableSelectionItem, keepValid } from "./EnvelopeCell/SelectionItem";

export const ActionsMenu = ({
  totalAmount,
  selection,
  onChange,
}: {
  totalAmount: bigint;
  selection: NullableSelectionItem[];
  onChange: (selection: NullableSelectionItem[]) => void;
}) => {
  const { data: envelopes = [] } = useEnvelopes();

  const assignRemainderTo = (envelopeId: string) => {
    onChange(
      produce(selection, (selection) => {
        const remainder = totalAmount - bim.sumBy(selection, (x) => x.amount);
        const remainderIndex = selection.findIndex(
          (item) => item.envelopeId === envelopeId
        );
        selection[remainderIndex].envelopeId = envelopeId;
        selection[remainderIndex].amount += remainder;
      })
    );
  };

  const splitAll = () => {
    onChange(
      produce(selection, (selection) => {
        const amountPerEnvelope = totalAmount / BigInt(selection.length);
        selection.forEach((item) => {
          item.amount = amountPerEnvelope;
        });
        const diff = totalAmount - bim.sumBy(selection, (x) => x.amount);
        if (diff !== 0n) {
          selection[0].amount += diff;
        }
      })
    );
  };

  const splitRemainder = () => {
    onChange(
      produce(selection, (selection) => {
        console.log({ totalAmount });
        const remainder = totalAmount - bim.sumBy(selection, (x) => x.amount);
        const amountPerEnvelope = remainder / BigInt(selection.length);
        selection.forEach((item) => {
          item.amount += amountPerEnvelope;
        });
        const diff = totalAmount - bim.sumBy(selection, (x) => x.amount);
        if (diff !== 0n) {
          selection[0].amount += diff;
        }
      })
    );
  };

  return (
    <Menu
      placement="right"
      trigger={({ onOpen }) => (
        <IconButton
          onClick={() => {
            console.log("test");
            onOpen();
          }}
        >
          <MoreIcon />
        </IconButton>
      )}
    >
      {({ onClose }) => (
        <>
          <MenuItem
            onClick={() => {
              splitAll();
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
                splitRemainder();
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
              {_(selection)
                .filter(keepValid)
                .map(({ envelopeId }) => {
                  return envelopes.find((x) => x.id === envelopeId);
                })
                .map((envelope) => {
                  if (!envelope) throw new Error("Envelope not found");
                  return (
                    <MenuItem
                      key={envelope.id}
                      onClick={() => {
                        assignRemainderTo(envelope.id);
                        onClose();
                      }}
                      text={envelope.emoji + " " + envelope.name}
                    />
                  );
                })
                .value()}
            </Menu>
          </Menu>
        </>
      )}
    </Menu>
  );
};
