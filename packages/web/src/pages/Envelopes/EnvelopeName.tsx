import { EnvelopeView } from "@moneymate/shared";
import { Box, ClickAwayListener } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { usePatchEnvelopes } from "../../hooks/queries/usePatchEnvelopes";

export const EnvelopeName = ({ envelope }: { envelope: EnvelopeView }) => {
  const { mutate: patchEnvelopes } = usePatchEnvelopes({
    onSuccess: () => {
      console.log("success");
      setEdit(false);
    },
  });
  const [isEdit, setEdit] = useState(false);
  const [name, setName] = useState(envelope.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEdit && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEdit, inputRef]);

  if (isEdit) {
    return (
      <ClickAwayListener
        onClickAway={() => {
          setEdit(false);
        }}
      >
        <input
          value={name}
          ref={inputRef}
          onChange={(ev) => {
            setName(ev.target.value);
          }}
          onKeyDown={(ev) => {
            if (ev.key === "Enter") {
              ev.preventDefault();
              patchEnvelopes([{ id: envelope.id, name }]);
            }
          }}
          className="font-bold flex-grow leading-5 outline-none bg-transparent border-b-2 border-b-black"
        />
      </ClickAwayListener>
    );
  }
  return (
    <Box
      onClick={() => {
        setEdit(true);
      }}
      className="font-bold flex-grow leading-5 overflow-hidden whitespace-nowrap"
    >
      <Box className="text-ellipsis">{name}</Box>
    </Box>
  );
};
