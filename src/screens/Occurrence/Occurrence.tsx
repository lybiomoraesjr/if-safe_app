import React from "react";
import {
  Container,
  Description,
  Name,
  OccurrenceImage,
  Status,
  Title2,
  UserImage,
} from "./Occurrence.styles";
import ScreenHeader from "@/components/ScreenHeader";
import { formattedDate } from "@/utils/dateUtils";
import { Text, TouchableOpacity, View } from "react-native";
import { ChatCircle, DotsThree, Warning } from "phosphor-react-native";
import Input from "@/components/Input";
import CommentCard from "@/components/CommentCard";
import defaultUserPhotoImg from "@/assets/userPhotoDefault.png";
import { useRoute } from "@react-navigation/native";

type RouteParamsProps = {
  occurrenceId: string;
};

const Occurrence: React.FC = () => {
  // const displayDate = formattedDate(data.date);
  // const comments = data.comments;

  const route = useRoute();

  const { occurrenceId } = route.params as RouteParamsProps;

  console.log(occurrenceId);
  return (
    <Container>
      <ScreenHeader title="Ocorrência" showBackButton />

      {/* <View
        style={{
          flexDirection: "row",
        }}
      >
        <UserImage
          source={{
            uri: data.autor.avatar ? data.autor.avatar : defaultUserPhotoImg,
          }}
          placeholder="L184i9ofbHof00ayjsay~qj[ayj@"
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <View>
            <Name>{data.autor.name}</Name>
            <Date>{displayDate}</Date>
          </View>

          <TouchableOpacity>
            <DotsThree size={16} />
          </TouchableOpacity>
        </View>
      </View>
      <OccurrenceImage
        source={{ uri: data.image }}
        placeholder="L184i9ofbHof00ayjsay~qj[ayj@"
      />
      <Title2>{data.name}</Title2>

      <Status>{data.status}</Status>
      <Description>{data.description}</Description>
      <View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity>
              <Warning size={16} />
            </TouchableOpacity>
            <Text>{data.likes.length}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <ChatCircle size={16} />
            <Text>{comments.length}</Text>
          </View>
        </View>

        <Input placeholder="Escreva um comentário" />
      </View>

      {comments.length > 0 &&
        comments.map((comment) => (
          <CommentCard
            key={comment.uuid}
            name={comment.author.name}
            avatar={comment.author.avatar}
            text={comment.text}
            date={comment.date}
          />
        ))} */}
    </Container>
  );
};

export default Occurrence;
