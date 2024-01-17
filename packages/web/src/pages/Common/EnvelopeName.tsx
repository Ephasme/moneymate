import { Skeleton } from "@mui/material";
import { useEnvelope } from "../../hooks/queries";

export const EnvelopeName = ({ id }: { id: string }) => {
  const { data: envelope } = useEnvelope(id);
  if (!envelope) return <Skeleton />;

  return (
    <span>
      {envelope.emoji} {envelope.name}
    </span>
  );
};
