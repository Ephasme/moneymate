import {
  useFloating,
  flip,
  offset,
  useClick,
  useInteractions,
} from "@floating-ui/react";
import { Box, Button } from "@mui/material";
import EmojiPicker from "emoji-picker-react";
import { Formik } from "formik";
import { useState } from "react";
import { TextField } from "../TextField";

export const ModalContent = () => {
  const {} = useCreateTransaction();
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
      }}
      onSubmit={(values) => {
        console.log("data", { values });
      }}
    >
      {({ setValues, submitForm, values }) => (
        <>
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
                  setValues({ emoji: value.emoji });
                  setEmojiPickerOpened(false);
                }}
              />
            </Box>
          )}
          <TextField placeholder="Nom de l'enveloppe" />
          <TextField placeholder="Description" />
          <Button onClick={submitForm}>Save</Button>
        </>
      )}
    </Formik>
  );
};
