import React, { useEffect, useState } from "react";
import { OccurrenceImage, Title } from "./Occurrence.styles";
import ScreenHeader from "@/components/ScreenHeader";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ChatCircle, DotsThree, Warning } from "phosphor-react-native";
import Input from "@/components/Input";
import CommentCard from "@/components/CommentCard";
import defaultUserPhotoImg from "@/assets/userPhotoDefault.png";
import { useRoute } from "@react-navigation/native";
import { api } from "@/services/api";
import { AppError } from "@/utils/AppError";
import Loading from "@/components/Loading";
import UserPhoto from "@/components/UserPhoto";
import { OccurrenceDTO } from "@/dtos/OccurrenceDTO";

type RouteParamsProps = {
  occurrenceId: string;
};

const Occurrence: React.FC = () => {
  const ICON_SIZE = 16;

  const [occurrence, setOccurrence] = useState<OccurrenceDTO>(
    {} as OccurrenceDTO
  );
  const [isLoading, setIsLoading] = useState(true);

  const route = useRoute();
  const { occurrenceId } = route.params as RouteParamsProps;

  const fetchOccurrence = async () => {
    try {
      setIsLoading(true);

      const response = await api.get(`posts/${occurrenceId}`);

      setOccurrence(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.data
        : "Não foi possível carregar os detalhes da ocorrência.";

      Alert.alert("Erro", title);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (occurrenceId) {
      fetchOccurrence();
    }
  }, [occurrenceId]);

  return (
    <ScrollView>
      <ScreenHeader title="Ocorrência" showBackButton />

      {isLoading ? (
        <Loading />
      ) : (
        <View>
          <View style={{ flexDirection: "row" }}>
            <UserPhoto
              size={54}
              source={{
                uri: occurrence.authorAvatar
                  ? occurrence.authorAvatar
                  : defaultUserPhotoImg,
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
                <Text>{occurrence.authorName}</Text>
              </View>

              <TouchableOpacity>
                <DotsThree size={ICON_SIZE} />
              </TouchableOpacity>
            </View>
          </View>
          <OccurrenceImage source={{ uri: occurrence.image }} />
          <Title>{occurrence.title}</Title>
          <Text>{occurrence.status}</Text>
          <Text>{occurrence.description}</Text>
          <View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity>
                  <Warning size={ICON_SIZE} />
                </TouchableOpacity>
                <Text>{occurrence.likes.length}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <ChatCircle size={ICON_SIZE} />
                <Text>{occurrence.comments.length}</Text>
              </View>
            </View>

            <Input placeholder="Escreva um comentário" />
          </View>

          {occurrence.comments.map((comment) => (
            <CommentCard
              key={comment.commentId}
              name={comment.userName}
              avatar={comment.userAvatar}
              text={comment.comment}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
};
export default Occurrence;
