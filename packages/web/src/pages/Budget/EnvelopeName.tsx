import { Box } from "@mui/material";
import { useState } from "react";
import { useEnvelope } from "../Common/useEnvelope";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api";
import { RowEditModal } from "./RowEditModal";

export const EnvelopeName = ({ envelopeId }: { envelopeId: string }) => {
  const queryClient = useQueryClient();
  const envelope = useEnvelope(envelopeId);

  const [isOpen, setIsOpen] = useState(false);

  const { mutate: deleteEnvelope } = useMutation({
    mutationFn: api.deleteEnvelope,
    onSuccess: () => {
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["envelopes"] });
      queryClient.invalidateQueries({ queryKey: ["envelope-groups"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
  const { mutate: editEnvelope } = useMutation({
    mutationFn: api.editEnvelope,
    onSuccess: () => {
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["envelopes"] });
      queryClient.invalidateQueries({ queryKey: ["envelope-groups"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  if (!envelope) return <Box className="flex-grow">Loading...</Box>;

  return (
    <RowEditModal
      open={isOpen}
      isHidden={envelope.isHidden}
      canBeDeleted={true}
      name={envelope.name}
      onOpenChange={(open) => {
        setIsOpen(open);
      }}
      onNameChange={(name) => {
        editEnvelope({ envelopeId, name });
      }}
      onHidden={(status) => {
        editEnvelope({ envelopeId, hidden: status });
      }}
      onDeleted={() => {
        deleteEnvelope({ envelopeId });
      }}
    />
  );
};
