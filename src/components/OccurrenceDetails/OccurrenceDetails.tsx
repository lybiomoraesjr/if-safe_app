import React from "react";
import {
  AuthorName,
  Container,
  Date,
  Description,
  DetailsSection,
  Info,
  NotificationView,
  NotifierCount,
  Picture,
  Status,
  Title,
} from "./OccurrenceDetails.styles";
import { View } from "react-native";
import { Warning } from "phosphor-react-native";
import { formattedDate } from "../../utils/dateUtils";
import { Button } from "@rneui/base";
import { OccurrenceDetails } from "../../types";

type OcurrenceDetailsProps = {
  ocurrenceDetails: OccurrenceDetails;
};

const OcurrenceDetails: React.FC<OcurrenceDetailsProps> = ({
  ocurrenceDetails: {
    date,
    imageUri,
    notifiersIDs,
    status,
    author: { name: authorName },
    title,
    description,
  },
}) => {
  const displayDate = formattedDate(date);
  return (
    <Container>
      <View style={{ flexDirection: "row" }}>
        <Picture
          source={{ uri: imageUri }}
          placeholder="L184i9ofbHof00ayjsay~qj[ayj@"
        />

        <Info>
          <NotificationView>
            <Warning size={16} color="#8D8D99" />
            <NotifierCount>
              {notifiersIDs.length}
              {notifiersIDs.length === 1 ? " alerta" : " alertas"}
            </NotifierCount>
          </NotificationView>

          <Date>Publicado em {displayDate}</Date>

          <Status>{status}</Status>

          <AuthorName>Por {authorName}</AuthorName>

          <Button
            title="Alertar !"
            containerStyle={{
              height: 40,
              width: 100,
            }}
            buttonStyle={{ backgroundColor: "#AB4D55", borderRadius: 5 }}
            titleStyle={{
              color: "white",
            }}
          />
        </Info>
      </View>

      <DetailsSection>
        <Title>{title}</Title>

        <Description>{description}</Description>
      </DetailsSection>
    </Container>
  );
};

export default OcurrenceDetails;
