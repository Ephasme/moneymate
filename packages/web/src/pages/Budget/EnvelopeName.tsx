import { Box } from "@mui/material";
import { useState } from "react";
import { useEnvelope } from "../Common/useEnvelope";
import { RowEditModal } from "./RowEditModal";
import { useDeleteEnvelope } from "../Common/useDeleteEnvelope";
import { useEditEnvelope } from "../Common/useEditEnvelope";

export const EnvelopeName = ({ envelopeId }: { envelopeId: string }) => {
  const envelope = useEnvelope(envelopeId);

  const [isOpen, setIsOpen] = useState(false);

  const { mutate: deleteEnvelope } = useDeleteEnvelope();
  const { mutate: editEnvelope } = useEditEnvelope();

  if (!envelope) return <Box className="flex-grow">Loading...</Box>;

  return (
    <RowEditModal
      open={isOpen}
      isHidden={envelope.isHidden}
      canBeDeleted={
        envelope.allocations.length === 0 &&
        envelope.toTransfers.length === 0 &&
        envelope.fromTransfers.length === 0
      }
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
