import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { formattedDate } from "@/utils/dateUtils";
import { Container, UserImage } from "./CommentCard.styles";
import { DotsThree } from "phosphor-react-native";
import defaultUserPhotoImg from "@/assets/userPhotoDefault.png";

type CommentCardProps = {
  avatar?: string;
  name: string;
  date: Date;
  text: string;
};

const CommentCard: React.FC<CommentCardProps> = ({
  avatar,
  name,
  date,
  text,
}) => {
  const displayDate = formattedDate(date);

  return (
    <Container>
      <UserImage
        source={avatar ? { uri: avatar } : defaultUserPhotoImg}
        placeholder="L184i9ofbHof00ayjsay~qj[ayj@"
      />

      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>{name}</Text>

          <TouchableOpacity>
            <DotsThree size={16} />
          </TouchableOpacity>
        </View>
        <Text>{displayDate}</Text>

        <Text>{text}</Text>
      </View>
    </Container>
  );
};

export default CommentCard;
