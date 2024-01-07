import { EnvelopeView } from "@moneymate/shared";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { IconButton } from "@mui/material";
import _ from "lodash";
import { DotsVerticalIcon } from "../../../../icons";
import { Menu, MenuItem } from "../../../Common";
import { EnvelopeSelection, keepNotNull } from "./EnvelopeSelector";

export const ActionsMenu = ({
  selection,
  onSplitAll,
  onSplitRemainder,
  onAssignRemainderTo,
}: {
  selection: EnvelopeSelection;
  onSplitAll: () => void;
  onSplitRemainder: () => void;
  onAssignRemainderTo: (envelope: EnvelopeView) => void;
}) => {
  return (
    <Menu
      placement="right"
      trigger={({ onOpen }) => (
        <IconButton onClick={onOpen} size="small">
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
              {_(selection)
                .filter(keepNotNull)
                .map(({ envelope }) => (
                  <MenuItem
                    key={envelope.id}
                    onClick={() => {
                      onAssignRemainderTo(envelope);
                      onClose();
                    }}
                    text={envelope.name}
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
