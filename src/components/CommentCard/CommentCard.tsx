import React from "react";
import { Text, View } from "react-native";
import { Container } from "./CommentCard.styles";
import { formattedDate } from "@/utils/dateUtils";
import { Divider } from "@rneui/themed";

type CommentCardProps = {
  name: string;
  text: string;
  date: Date;
};

const CommentCard: React.FC<CommentCardProps> = ({ date, name, text }) => {
  const displayDate = formattedDate(date);
  return (
    <Container>
      <Divider />

      <View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>Por {name}</Text>
          <Text>{displayDate}</Text>
        </View>

        <Text>{text}</Text>
      </View>
      <Divider />
    </Container>
  );
};

export default CommentCard;
