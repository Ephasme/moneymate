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
import { useSaveEnvelopeGroup } from "../Common/useSaveEnvelopeGroup";

export const CreateEnvelopeGroupDialog = ({
  open,
  onClose,
}: {
  envelopeGroupId?: string;
  open: boolean;
  onClose: () => void;
}) => {
  const budgetId = useStore((state) => state.budgetId);
  const { mutate: saveEnvelopeGroup } = useSaveEnvelopeGroup({ onClose });

  return (
    <Dialog open={open}>
      <Formik
        initialValues={{ name: "" }}
        onSubmit={(values) => {
          saveEnvelopeGroup({ budgetId, ...values });
        }}
      >
        {({ getFieldProps, handleSubmit, handleReset }) => (
          <>
            <DialogTitle>Create Envelope Group</DialogTitle>
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
