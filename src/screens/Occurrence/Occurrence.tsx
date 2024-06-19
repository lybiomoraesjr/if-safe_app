import React, { useEffect, useState } from "react";
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
import { api } from "@/services/api";
import { OccurrenceDTO } from "@/dtos/OccurrenceDTO";

type commentType = {
  commentId: string;
  userId: string;
  userName: string;
  comment: string;
  commentDate: Date;
  userAvatar: string;
};

type OccurrenceProps = {
  authorId: string;
  date: string;
  authorName: string;
  likes: string[];
  description: string;
  image: string;
  comments: commentType[];
  authorAvatar: string;
  title: string;
  status: string;
};

type RouteParamsProps = {
  occurrenceId: string;
};

const Occurrence: React.FC<OccurrenceProps> = () => {
  const [post, setPost] = useState<OccurrenceProps>();

  const route = useRoute();
  const { occurrenceId } = route.params as RouteParamsProps;

  const fetchOccurrence = async () => {
    try {
      const response = await api.get(`posts/${occurrenceId}`);
      console.log(response.data);
      setPost(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (occurrenceId) {
      fetchOccurrence();
    }
  }, [occurrenceId]);

  if (!post) {
    return (
      <Container>
        <Text>Loading...</Text>
      </Container>
    );
  }

  // const displayDate = formattedDate(post.date);

  return (
    <Container>
      <ScreenHeader title="Ocorrência" showBackButton />

      <View style={{ flexDirection: "row" }}>
        <UserImage
          source={{
            uri: post.authorAvatar ? post.authorAvatar : defaultUserPhotoImg,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <View>
            <Name>{post.authorName}</Name>
            {/* <Text>{displayDate}</Text> */}
          </View>

          <TouchableOpacity>
            <DotsThree size={16} />
          </TouchableOpacity>
        </View>
      </View>
      <OccurrenceImage source={{ uri: post.image }} />
      <Title2>{post.title}</Title2>
      <Status>{post.status}</Status>
      <Description>{post.description}</Description>
      <View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity>
              <Warning size={16} />
            </TouchableOpacity>
            <Text>{post.likes.length}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <ChatCircle size={16} />
            <Text>{post.comments.length}</Text>
          </View>
        </View>

        <Input placeholder="Escreva um comentário" />
      </View>

      {post.comments.map((comment) => (
        <CommentCard
          key={comment.commentId}
          name={comment.userName}
          avatar={comment.userAvatar}
          text={comment.comment}
        
        />
      ))}
    </Container>
  );
};

export default Occurrence;
