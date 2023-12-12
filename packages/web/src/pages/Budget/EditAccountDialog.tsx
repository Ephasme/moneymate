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
import { useAccount } from "../Common/useAccount";
import { useSaveAccount } from "../Common/useSaveAccount";

export const EditAccountDialog = ({
  accountId,
  open,
  onClose,
}: {
  accountId?: string;
  open: boolean;
  onClose: () => void;
}) => {
  const budgetId = useStore((state) => state.budgetId);

  const { data: account } = useAccount(accountId);

  const { mutate: saveAccount } = useSaveAccount({ onClose });

  if (accountId && !account) return null;

  return (
    <Dialog open={open}>
      <Formik
        initialValues={{ name: account?.name ?? "" }}
        onSubmit={(values) => {
          saveAccount({ budgetId, id: accountId, ...values });
        }}
      >
        {({ getFieldProps, handleSubmit, handleReset }) => (
          <>
            <DialogTitle>
              {accountId ? "Edit account" : "Create account"}
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
