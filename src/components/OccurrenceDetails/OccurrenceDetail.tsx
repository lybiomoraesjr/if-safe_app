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
import { OccurrenceDetail } from "../../types";
import { TouchableOpacity, View } from "react-native";
import { Divider, Text } from "@rneui/base";
import InputComponent from "../Input";
import CommentItem from "../CommentItem";
import defaulUserPhotoImg from "../../assets/userPhotoDefault.png";

type OcurrenceDetailProps = {
  ocurrenceDetail: OccurrenceDetail;
};

const OcurrenceDetail: React.FC<OcurrenceDetailProps> = ({
  ocurrenceDetail,
}) => {
  const displayDate = formattedDate(ocurrenceDetail.date);
  const comments = ocurrenceDetail.comments || [];

  return (
    <Container>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <UserImage
          source={{
            uri: ocurrenceDetail.author.avatar
              ? ocurrenceDetail.author.avatar
              : defaulUserPhotoImg,
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
            <Name>{ocurrenceDetail.author.name}</Name>
            <Date>{displayDate}</Date>
          </View>

          <TouchableOpacity>
            <DotsThree size={16} />
          </TouchableOpacity>
        </View>
      </View>
      <OccurrenceImage
        source={{ uri: ocurrenceDetail.imageUri }}
        placeholder="L184i9ofbHof00ayjsay~qj[ayj@"
      />
      <Title>{ocurrenceDetail.title}</Title>

      <Status>{ocurrenceDetail.status}</Status>
      <Description>{ocurrenceDetail.description}</Description>
      <View>
        <Divider style={{ margin: 18 }} />

        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity>
              <Warning size={16} />
            </TouchableOpacity>
            <Text>{ocurrenceDetail.notifiersIDs.length}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <ChatCircle size={16} />
            <Text>{comments.length}</Text>
          </View>
        </View>

        <Divider style={{ margin: 18 }} />

        <InputComponent
          placeholder="Escreva um comentário"
          leftIcon={{ type: "font-awesome", name: "comment" }}
        />
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

export default OcurrenceDetail;
