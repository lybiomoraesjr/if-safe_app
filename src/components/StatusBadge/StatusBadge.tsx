import { OccurrenceStatusEnum } from "@/types";
import { Badge, BadgeText } from "@gluestack-ui/themed";

type StatusBadge = {
  status: OccurrenceStatusEnum;
};

const StatusBadge: React.FC<StatusBadge> = ({ status }) => {
  return (
    <Badge
      borderRadius="$2xl"
      variant="outline"
      action={
        status === OccurrenceStatusEnum.SOLVED
          ? "success"
          : status === OccurrenceStatusEnum.CANCELLED
          ? "error"
          : "warning"
      }
      w={100}
    >
      <BadgeText>{status}</BadgeText>
    </Badge>
  );
};

export default StatusBadge;
