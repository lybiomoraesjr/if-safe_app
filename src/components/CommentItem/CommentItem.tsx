import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { formattedDate } from "../../utils/dateUtils";
import { Container, Picture } from "./CommentItem.styles";
import { DotsThree } from "phosphor-react-native";

type CommentItemProps = {
  imageUri?: string;
  name: string;
  date: Date;
  content: string;
};

const CommentItem: React.FC<CommentItemProps> = ({
  imageUri,
  name,
  date,
  content,
}) => {
  const displayDate = formattedDate(date);
  return (
    <Container>
      <Picture
        source={{
          uri: imageUri,
        }}
        placeholder="L184i9ofbHof00ayjsay~qj[ayj@"
      />

      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row" }}>
          <Text>{name}</Text>

          <Text>{displayDate}</Text>

          <TouchableOpacity>
            <DotsThree size={16} />
          </TouchableOpacity>
        </View>

        <Text>{content}</Text>
      </View>
    </Container>
  );
};

export default CommentItem;
