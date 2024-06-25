import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Container } from "./CommentCard.styles";
import { DotsThree } from "phosphor-react-native";
import defaultUserPhotoImg from "@/assets/userPhotoDefault.png";
import UserPhoto from "../UserPhoto";

type CommentCardProps = {
  avatar?: string;
  name: string;
  text: string;
};

const CommentCard: React.FC<CommentCardProps> = ({ avatar, name, text }) => {
  return (
    <Container>
      <UserPhoto
        size={54}
        source={avatar ? { uri: avatar } : defaultUserPhotoImg}
      />
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>{name}</Text>

          <TouchableOpacity>
            <DotsThree size={16} />
          </TouchableOpacity>
        </View>

        <Text>{text}</Text>
      </View>
    </Container>
  );
};

export default CommentCard;
