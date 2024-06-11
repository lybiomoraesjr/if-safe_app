import React from "react";
import {
  Container,
  Date,
  Description,
  Name,
  NotificationView,
  NotifierCount,
  OccurrenceImage,
  Status,
  Title,
  UserImage,
} from "./OccurrenceDetail.styles";
import { ChatCircle, DotsThree, Warning } from "phosphor-react-native";
import { formattedDate } from "../../utils/dateUtils";
import { OccurrenceDetail, User } from "../../types";
import { TouchableOpacity, View } from "react-native";
import { Divider, Text } from "@rneui/base";
import InputComponent from "../InputComponent";
import CommentList from "../CommentList";
import OcurrenceItem from "../OccurrenceItem/OccurrenceItem";
import CommentItem from "../CommentItem";

type OcurrenceDetailProps = {
  ocurrenceDetail: OccurrenceDetail;
};

const OcurrenceDetail: React.FC<OcurrenceDetailProps> = ({
  ocurrenceDetail,
}) => {
  const displayDate = formattedDate(ocurrenceDetail.date);

  const comments = ocurrenceDetail.comments;
  return (
    <Container>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <UserImage
            source={{ uri: "https://github.com/lybiomoraesjr.png" }}
            placeholder="L184i9ofbHof00ayjsay~qj[ayj@"
          />
          <View style={{}}>
            <Name>{ocurrenceDetail.author.name}</Name>
          </View>
        </View>
        <TouchableOpacity>
          <DotsThree size={16} />
        </TouchableOpacity>
      </View>
      <OccurrenceImage
        source={{ uri: ocurrenceDetail.imageUri }}
        placeholder="L184i9ofbHof00ayjsay~qj[ayj@"
      />
      <Title>{ocurrenceDetail.title}</Title>
      <Date>{displayDate}</Date>
      <Status>{ocurrenceDetail.status}</Status>
      <Description>{ocurrenceDetail.description}</Description>
      <View>
        <Divider style={{ margin: 18 }} />

        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "row" }}>
            <Warning size={16} />
            <Text>13</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <ChatCircle size={16} />
            <Text>13</Text>
          </View>
        </View>

        <Divider style={{ margin: 18 }} />

        <InputComponent
          placeholder="Escreva um comentário"
          leftIcon={{ type: "font-awesome", name: "comment" }}
        />

        <Divider style={{ margin: 18 }} />
      </View>

      {comments.map((comment) => (
        <CommentItem
          key={comment.uuid}
          name={comment.author.name}
          avatar={comment.author.imageUri}
          text={comment.content}
          date={comment.date}
        />
      ))}
    </Container>
  );
};

export default OcurrenceDetail;
