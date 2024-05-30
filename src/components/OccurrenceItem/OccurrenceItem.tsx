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
  Picture,
  Title,
} from "./OccurrenceItem.styles";
import { formattedDate } from "../../utils/dateUtils";

interface OcurrenceItemProps {
  imageUri: string;
  notifiersNumber: number;
  status: string;
  title: string;
  date: Date;
  onInteract: () => void;
}

const OcurrenceItem: React.FC<OcurrenceItemProps> = ({
  imageUri,
  notifiersNumber,
  status,
  title,
  date,
  onInteract,
}) => {
  const displayDate = formattedDate(date);

  return (
    <Container>
      <Picture
        source={{ uri: imageUri }}
        placeholder="L184i9ofbHof00ayjsay~qj[ayj@"
      />

      <Info>
        <NotificationView>
          <Warning size={16} color="#8D8D99" />
          <NotifierCount>{notifiersNumber}</NotifierCount>
          <Text>{status}</Text>
        </NotificationView>

        <Title>{title}</Title>
        <Date>Publicado em {displayDate}</Date>
      </Info>

      <InteractButton onPress={onInteract}>
        <CaretRight size={32} color="#8D8D99" />
      </InteractButton>
    </Container>
  );
};

export default OcurrenceItem;
