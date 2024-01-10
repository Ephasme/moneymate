import {
  useFloating,
  flip,
  offset,
  useClick,
  useInteractions,
} from "@floating-ui/react";
import { Box, Button } from "@mui/joy";
import EmojiPicker from "emoji-picker-react";
import { Formik } from "formik";
import { useState } from "react";
import { TextField } from "../../Common/TextField";
import { usePostEnvelopes } from "../../../hooks/queries";
import { useStore } from "../../../store";
import { v4 as uuid } from "uuid";

export const ModalContent = ({ onClose }: { onClose: () => void }) => {
  const budgetId = useStore((state) => state.budgetId);
  const { mutate: postEnvelopes } = usePostEnvelopes({
    onSuccess() {
      onClose();
    },
  });
  const [emojiPickerOpened, setEmojiPickerOpened] = useState(false);
  const { refs, context, floatingStyles } = useFloating({
    placement: "right",
    open: emojiPickerOpened,
    onOpenChange: setEmojiPickerOpened,
    middleware: [flip(), offset(10)],
  });
  const click = useClick(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click]);
  return (
    <Formik
      initialValues={{
        emoji: "😀",
        name: "",
        description: "",
      }}
      onSubmit={(values) => {
        console.log("data", { values });
        postEnvelopes([
          {
            budgetId,
            id: uuid(),
            emoji: values.emoji,
            name: values.name,
            description: values.description,
          },
        ]);
      }}
    >
      {({ setFieldValue, submitForm, resetForm, values }) => (
        <Box className="p-6 flex flex-col gap-6">
          <Box className="font-bold">Nouvelle enveloppe</Box>
          <Box className="flex items-center justify-start">
            <Box
              ref={refs.setReference}
              {...getReferenceProps()}
              className="flex items-center justify-center text-4xl p-3 border-[0.5px] border-[#D7D9DF] rounded-lg"
              sx={{
                boxShadow:
                  "0px 0px 8px 0px rgba(0, 0, 0, 0.08), 0px 0.5px 0px 0px rgba(0, 0, 0, 0.12)",
              }}
            >
              <Box>{values.emoji}</Box>
            </Box>
          </Box>
          {emojiPickerOpened && (
            <Box
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
            >
              <EmojiPicker
                onEmojiClick={(value) => {
                  setFieldValue("emoji", value.emoji);
                  setEmojiPickerOpened(false);
                }}
              />
            </Box>
          )}
          <TextField
            placeholder="Nom de l'enveloppe"
            onChange={(ev) => {
              setFieldValue("name", ev.target.value);
            }}
          />
          <TextField
            placeholder="Description"
            onChange={(ev) => {
              setFieldValue("description", ev.target.value);
            }}
          />
          <Button onClick={submitForm}>Save</Button>
          <Button
            onClick={() => {
              resetForm();
              onClose();
            }}
          >
            Cancel
          </Button>
        </Box>
      )}
    </Formik>
  );
};
