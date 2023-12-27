import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import { useStore } from "../../store";
import { useSaveEnvelope } from "../Common/useSaveEnvelope";

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
