import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik } from "formik";
import { api } from "../../api";
import { useStore } from "../../store";
import { useEnvelope } from "../Common/useEnvelope";

const useSaveEnvelope = (props: { onClose: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.saveEnvelope,
    onError(error) {
      console.error(error);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["envelopes"] });
      props.onClose();
    },
  });
};

export const EditEnvelopeDialog = ({
  envelopeId,
  open,
  onClose,
}: {
  envelopeId?: string;
  open: boolean;
  onClose: () => void;
}) => {
  const budgetId = useStore((state) => state.budgetId);
  const envelope = useEnvelope(envelopeId);
  const { mutate: saveEnvelope } = useSaveEnvelope({ onClose });

  if (envelopeId && !envelope) return null;

  return (
    <Dialog open={open}>
      <Formik
        initialValues={{ name: envelope?.name ?? "" }}
        onSubmit={(values) => {
          saveEnvelope({ budgetId, id: envelopeId, ...values });
        }}
      >
        {({ getFieldProps, handleSubmit, handleReset }) => (
          <>
            <DialogTitle>
              {envelopeId ? "Edit envelope" : "Create envelope"}
            </DialogTitle>
            <DialogContent>
              <TextField label="Name" {...getFieldProps("name")} />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  onClose();
                  handleReset();
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  handleSubmit();
                }}
              >
                Save
              </Button>
            </DialogActions>
          </>
        )}
      </Formik>
    </Dialog>
  );
};
