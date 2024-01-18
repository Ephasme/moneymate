import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Checkbox } from "@mui/material";
import { formatCurrency } from "../../../../helpers/formatCurrency";
import { useEnvelopes } from "../../../../hooks/queries";
import { EnvelopeName } from "../../../Common/EnvelopeName";
import { NullableSelectionItem } from "./SelectionItem";
import { makeSelectionActions } from "../makeSelectionActions";

export const EnvelopeSelectorModalContent = ({
  selection = [],
  onChange = () => {},
  onCancel = () => {},
  onNext = () => {},
  onSubmit = () => {},
}: {
  selection?: NullableSelectionItem[];
  onChange?: (selection: NullableSelectionItem[]) => void;
  onCancel?: () => void;
  onNext?: () => void;
  onSubmit?: () => void;
}) => {
  const { data: envelopes = [] } = useEnvelopes();

  const actions = makeSelectionActions((update) => onChange(update(selection)));

  return (
    <>
      <Box className="flex gap-2 px-2 py-3 border-b border-[#0000001f]">
        <Box>
          <CloseIcon sx={{ width: 14, height: 14 }} />
        </Box>
        <Box>{selection.length} enveloppes sélectionnées</Box>
      </Box>
      <Box className="max-h-[20vh] overflow-auto">
        {envelopes.map((envelope) => (
          <Box className="flex pr-2 hover:bg-slate-50">
            <Checkbox
              checked={
                selection.find((x) => x.envelopeId === envelope.id) !==
                undefined
              }
              onClick={() => {
                actions.toggleEnvelope(envelope.id);
              }}
            />
            <Box
              onClick={() => {
                actions.toggleEnvelope(envelope.id);
              }}
              className="flex flex-grow items-center gap-1 cursor-pointer"
            >
              <Box className="flex-grow">
                <EnvelopeName id={envelope.id} />{" "}
              </Box>
              <Box>{formatCurrency(envelope.balance)}</Box>
            </Box>
          </Box>
        ))}
      </Box>
      <Box className="flex gap-2 items-center justify-between border-t border-[#0000001f] py-3">
        <Box className="italic text-sm text-[#6d6f7b] px-3">
          {selection.length > 1 && (
            <Box>
              Vous allez diviser
              <br />
              cette transaction.
            </Box>
          )}
        </Box>
        <Box className="flex items-center gap-2 px-2 pt-2">
          <Button
            variant="outlined"
            onClick={() => {
              onCancel();
            }}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              if (selection.length > 1) {
                onNext();
              } else {
                onSubmit();
              }
            }}
          >
            {selection.length > 1 ? "Suivant" : "Valider"}
          </Button>
        </Box>
      </Box>
    </>
  );
};
