import React from "react";
import {
  Container,
  Date,
  Description,
  Name,
  OccurrenceImage,
  Status,
  Title,
  UserImage,
} from "./OccurrenceDetail.styles";
import { ChatCircle, DotsThree, Warning } from "phosphor-react-native";
import { formattedDate } from "../../utils/dateUtils";

import { Text, TouchableOpacity, View } from "react-native";

import CommentItem from "../CommentItem";
import defaultUserPhotoImg from "../../assets/userPhotoDefault.png";
import Input from "../Input";
import { OccurrenceDetailType } from "@/types";


type OccurrenceDetailProps = {
  occurrenceDetail: OccurrenceDetailType;
};

const OccurrenceDetail: React.FC<OccurrenceDetailProps> = ({
  occurrenceDetail,
}) => {
  const displayDate = formattedDate(occurrenceDetail.date);
  const comments = occurrenceDetail.comments;

  return (
    <Container>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <UserImage
          source={{
            uri: occurrenceDetail.author.avatar
              ? occurrenceDetail.author.avatar
              : defaultUserPhotoImg,
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
            <Name>{occurrenceDetail.author.name}</Name>
            <Date>{displayDate}</Date>
          </View>

          <TouchableOpacity>
            <DotsThree size={16} />
          </TouchableOpacity>
        </View>
      </View>
      <OccurrenceImage
        source={{ uri: occurrenceDetail.imageUri }}
        placeholder="L184i9ofbHof00ayjsay~qj[ayj@"
      />
      <Title>{occurrenceDetail.title}</Title>

      <Status>{occurrenceDetail.status}</Status>
      <Description>{occurrenceDetail.description}</Description>
      <View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity>
              <Warning size={16} />
            </TouchableOpacity>
            <Text>{occurrenceDetail.notifiersIDs.length}</Text>
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
          <CommentItem
            key={comment.uuid}
            name={comment.author.name}
            avatar={comment.author.avatar}
            text={comment.text}
            date={comment.date}
          />
        ))}
    </Container>
  );
};

export default OccurrenceDetail;
