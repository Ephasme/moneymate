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
import { useEnvelopeGroup } from "../Common/useEnvelopeGroup";

const useSaveEnvelopeGroup = (props: { onClose: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.saveEnvelopeGroup,
    onError(error) {
      console.error(error);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["envelope-groups"] });
      props.onClose();
    },
  });
};

export const EditEnvelopeGroupDialog = ({
  envelopeGroupId,
  open,
  onClose,
}: {
  envelopeGroupId?: string;
  open: boolean;
  onClose: () => void;
}) => {
  const budgetId = useStore((state) => state.budgetId);
  const envelopeGroup = useEnvelopeGroup(envelopeGroupId);
  const { mutate: saveEnvelopeGroup } = useSaveEnvelopeGroup({ onClose });

  if (envelopeGroupId && !envelopeGroup) return null;

  return (
    <Dialog open={open}>
      <Formik
        initialValues={{ name: envelopeGroup?.name ?? "" }}
        onSubmit={(values) => {
          saveEnvelopeGroup({ budgetId, id: envelopeGroupId, ...values });
        }}
      >
        {({ getFieldProps, handleSubmit, handleReset }) => (
          <>
            <DialogTitle>
              {envelopeGroupId
                ? "Edit Envelope Group"
                : "Create Envelope Group"}
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
