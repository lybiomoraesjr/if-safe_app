import React from "react";
import { CaretRight, Warning } from "phosphor-react-native";
import { Text } from "react-native";
import {
  Container,
  Date,
  Info,
  InteractButton,
  NotificationView,
  NotifierCount,
  OccurrenceImage,
  Title,
} from "./OccurrenceCard.styles";
import { formattedDate } from "@/utils/dateUtils";

interface OccurrenceCardProps {
  image: string;
  notifiersNumber: number;
  status: string;
  title: string;
  date: Date;
  onInteract: () => void;
}

const OccurrenceCard: React.FC<OccurrenceCardProps> = ({
  image,
  notifiersNumber,
  status,
  title,

  onInteract,
}) => {
  // const displayDate = formattedDate(date);

  return (
    <Container>
      <OccurrenceImage
        source={{ uri: image }}
        placeholder="L184i9ofbHof00ayjsay~qj[ayj@"
      />

      <Info>
        <Title>{title}</Title>
        {/* <Date>Publicado em {displayDate}</Date> */}
        <NotificationView>
          <Warning size={16} color="#8D8D99" />
          <NotifierCount>{notifiersNumber}</NotifierCount>
          <Text>{status}</Text>
        </NotificationView>
      </Info>

      <InteractButton onPress={onInteract}>
        <CaretRight size={32} color="#8D8D99" />
      </InteractButton>
    </Container>
  );
};

export default OccurrenceCard;
