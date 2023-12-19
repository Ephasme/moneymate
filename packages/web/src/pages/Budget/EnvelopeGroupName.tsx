import { Box } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "../../api";
import { useEnvelopeGroup } from "../Common/useEnvelopeGroup";
import { RowEditModal } from "./RowEditModal";

export const EnvelopeGroupName = ({
  envelopeGroupId,
}: {
  envelopeGroupId: string;
}) => {
  const queryClient = useQueryClient();
  const envelopeGroup = useEnvelopeGroup(envelopeGroupId);

  const [isOpen, setIsOpen] = useState(false);

  const { mutate: deleteEnvelopeGroup } = useMutation({
    mutationFn: api.deleteEnvelopeGroup,
    onSuccess: () => {
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["envelopes"] });
      queryClient.invalidateQueries({ queryKey: ["envelope-groups"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
  const { mutate: editEnvelopeGroup } = useMutation({
    mutationFn: api.editEnvelopeGroup,
    onSuccess: () => {
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["envelopes"] });
      queryClient.invalidateQueries({ queryKey: ["envelope-groups"] });
    },
    onError: (error) => {
      console.error(error);
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
