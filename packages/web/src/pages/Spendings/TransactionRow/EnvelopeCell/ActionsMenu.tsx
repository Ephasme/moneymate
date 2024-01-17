import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MoreIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import _ from "lodash";
import { Menu, MenuItem } from "../../../Common";
import { keepValid } from "./SelectionItem";
import { useMultiEnvelopeSelectorContext } from "./MultiEnvelopeSelectorContext";

export const ActionsMenu = () => {
  const {
    selection,
    envelopes,
    actions: { assignRemainderTo, splitAll, splitRemainder },
  } = useMultiEnvelopeSelectorContext();
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
