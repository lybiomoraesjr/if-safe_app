import React from "react";
import { Container, Picture } from "./OcurrenceDetails.styles";
import { Text, View } from "react-native";
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
    description
  }
}) => {
  const displayDate = formattedDate(date);
  return (
    <Container>
      <View>
        <Picture
          source={{ uri: imageUri }}
          placeholder="L184i9ofbHof00ayjsay~qj[ayj@"
        />

        <View>
          <View>
            <Warning size={16} color="#8D8D99" />
            <Text>{notifiersIDs}</Text>
          </View>

          <Text>Publicado em {displayDate}</Text>

          <Text>{status}</Text>

          <Text>Por {authorName}</Text>

          <Button>Alertar</Button>
        </View>
      </View>

      <View>
        <Text>{title}</Text>

        <Text>{description}</Text>
      </View>
    </Container>
  );
};

export default OcurrenceDetails;
