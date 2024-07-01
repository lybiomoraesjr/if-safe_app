import React from "react";
import { CaretRight, ChatCircle, Warning } from "phosphor-react-native";
import { Text, View } from "react-native";
import {
  AlertView,
  Container,
  Date,
  Info,
  InteractButton,
  NotificationView,
  NotifierCount,
  OccurrenceImage,
  TextStatus,
  Title,
} from "./OccurrenceCard.styles";
import { formattedDate } from "@/utils/dateUtils";

interface OccurrenceCardProps {
  image: string | null;
  alert: number;
  status: string;
  title: string;
  date: Date;
  commentsNumber: number;
  onInteract: () => void;
}

const OccurrenceCard: React.FC<OccurrenceCardProps> = ({
  image,
  alert,
  status,
  title,
  commentsNumber,
  onInteract,
}) => {
  // const displayDate = formattedDate(date);

  const ICON_SIZE = 20;
  return (
    <Container>
      <OccurrenceImage
        source={{ uri: image }}
        placeholder="L184i9ofbHof00ayjsay~qj[ayj@"
      />

      <Info>
        <NotificationView>
          <AlertView>
            <Warning size={ICON_SIZE} color="#8D8D99" />
            <NotifierCount>{alert}</NotifierCount>
          </AlertView>
          <View
            style={{ flexDirection: "row", alignItems: "center", columnGap: 3 }}
          >
            <ChatCircle size={ICON_SIZE} color="#8D8D99" />
            <NotifierCount>{commentsNumber}</NotifierCount>
          </View>
        </NotificationView>
        <TextStatus>{status}</TextStatus>
        <Title>{title}</Title>
        {/* <Date>Publicado em {displayDate}</Date> */}
      </Info>

      <InteractButton onPress={onInteract}>
        <CaretRight size={32} color="#8D8D99" />
      </InteractButton>
    </Container>
  );
};

export default OccurrenceCard;
