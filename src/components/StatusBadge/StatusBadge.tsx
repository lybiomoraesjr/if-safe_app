import { OccurrenceStatusEnum } from "@/types";
import { Badge, BadgeText } from "@gluestack-ui/themed";

type StatusBadge = {
  status: OccurrenceStatusEnum;
};

const StatusBadge: React.FC<StatusBadge> = ({ status }) => {
  return (
    <Badge
      action={
        status === OccurrenceStatusEnum.SOLVED
          ? "success"
          : status === OccurrenceStatusEnum.CANCELLED
          ? "error"
          : "warning"
      }
    >
      <BadgeText>{status}</BadgeText>
    </Badge>
  );
};

export default StatusBadge;
