import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import { usePostAccounts } from "../../../hooks/queries";
import { useStore } from "../../../store";
import { v4 as uuid } from "uuid";

export const ModalContent = ({ onClose }: { onClose: () => void }) => {
  const budgetId = useStore((state) => state.budgetId);
  const { mutate: postAccounts } = usePostAccounts({
    onSuccess: () => {
      onClose();
    },
  });
  return (
    <Box>
      <Formik
        initialValues={{
          name: "",
        }}
        onSubmit={(values) => {
          postAccounts([
            {
              name: values.name,
              budgetId,
              id: uuid(),
            },
          ]);
        }}
      >
        {({ getFieldProps, resetForm, submitForm }) => (
          <>
            <Box>Create account</Box>
            <TextField {...getFieldProps("name")} />
            <Button onClick={submitForm}>Save</Button>
            <Button
              onClick={() => {
                resetForm();
                onClose();
              }}
            >
              Cancel
            </Button>
          </>
        )}
      </Formik>
    </Box>
  );
};
