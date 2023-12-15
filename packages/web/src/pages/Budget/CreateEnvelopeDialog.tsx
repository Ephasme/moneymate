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

const useSaveEnvelope = (props: { onClose: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.saveEnvelope,
    onError(error) {
      console.error(error);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["envelopes"] });
      queryClient.invalidateQueries({ queryKey: ["envelope-groups"] });
      props.onClose();
    },
  });
};

export const CreateEnvelopeDialog = ({
  groupId,
  open,
  onClose,
}: {
  groupId?: string;
  open: boolean;
  onClose: () => void;
}) => {
  const budgetId = useStore((state) => state.budgetId);
  const { mutate: saveEnvelope } = useSaveEnvelope({ onClose });

  return (
    <Dialog open={open} hideBackdrop>
      <Formik
        initialValues={{ name: "" }}
        onSubmit={(values) => {
          saveEnvelope({
            budgetId,
            parentId: groupId,
            ...values,
          });
        }}
      >
        {({ getFieldProps, handleSubmit, handleReset }) => (
          <>
            <DialogTitle>Create envelope</DialogTitle>
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
