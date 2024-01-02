import { PriorityIcon } from "./PriorityIcon";
import { Tag } from "./Tag";

export const PriorityTag = ({ level }: { level: 1 | 2 | 3 }) => {
  return <Tag startIcon={<PriorityIcon level={level} />} />;
};
