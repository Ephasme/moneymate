import { Box } from "@mui/material";
import { useState } from "react";
import { useEnvelopeGroup } from "../Common/useEnvelopeGroup";
import { RowEditModal } from "./RowEditModal";
import { useDeleteEnvelopeGroup } from "../Common/useDeleteEnvelopeGroup";
import { useEditEnvelopeGroup } from "../Common/useEditEnvelopeGroup";

export const EnvelopeGroupName = ({
  envelopeGroupId,
}: {
  envelopeGroupId: string;
}) => {
  const envelopeGroup = useEnvelopeGroup(envelopeGroupId);

  const [isOpen, setIsOpen] = useState(false);

  const { mutate: deleteEnvelopeGroup } = useDeleteEnvelopeGroup({
    onSuccess() {
      setIsOpen(false);
    },
  });
  const { mutate: editEnvelopeGroup } = useEditEnvelopeGroup({
    onSuccess() {
      setIsOpen(false);
    },
  });

  if (!envelopeGroup) return <Box className="flex-grow">Loading...</Box>;

  return (
    <RowEditModal
      open={isOpen}
      isHidden={envelopeGroup.isHidden}
      canBeDeleted={envelopeGroup.envelopes.length === 0}
      name={envelopeGroup.name}
      onOpenChange={(open) => {
        setIsOpen(open);
      }}
      onNameChange={(name) => {
        editEnvelopeGroup({ envelopeGroupId, name });
      }}
      onHidden={(status) => {
        editEnvelopeGroup({ envelopeGroupId, hidden: status });
      }}
      onDeleted={() => {
        deleteEnvelopeGroup({ envelopeGroupId });
      }}
    />
  );
};
