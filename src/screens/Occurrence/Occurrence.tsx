import React, { useEffect, useState } from "react";
import {
  AlertSection,
  CommentSection,
  Container,
  Header,
  OccurrenceImage,
  OccurrenceIcons,
  Title,
  UserIcons,
  UserNameTxt,
  UserNameView,
} from "./Occurrence.styles";
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
import { storageAuthTokenGet } from "@/storage/storageAuthToken";
import { Controller, useForm } from "react-hook-form";
import Button from "@/components/Button";
import { useTheme } from "styled-components";

type RouteParamsProps = {
  occurrenceId: string;
};

type FormDataProps = {
  comment: string;
};

const Occurrence: React.FC = () => {
  const ICON_SIZE = 24;

  const { COLORS } = useTheme();

  const [like, setLike] = useState(false);

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

  const likeOccurrence = async () => {
    try {
      const token = await storageAuthTokenGet();

      const response = await api.post(`/posts/likes/${occurrenceId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      Alert.alert("Sucesso", "Ocorrência curtida com sucesso.");
    } catch (error) {
      console.log(error);
    }
  };

  const MakeAComment = async (data: FormDataProps) => {
    try {
      const token = await storageAuthTokenGet();

      const comment = data.comment;

      await api.post(`/posts/comments/${occurrenceId}`, {
        comment,
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      Alert.alert("Sucesso", "Comentário feito com sucesso.");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (occurrenceId) {
      fetchOccurrence();
    }
  }, [occurrenceId]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({});

  const handleLike = () => {
    setLike(!like);
  };

  return (
    <ScrollView>
      <ScreenHeader title="Ocorrência" showBackButton />

      {isLoading ? (
        <Loading />
      ) : (
        <Container>
          <Header>
            <View>
              <UserPhoto
                size={54}
                source={{
                  uri: occurrence.authorAvatar
                    ? occurrence.authorAvatar
                    : defaultUserPhotoImg,
                }}
              />
            </View>

            <UserIcons>
              <UserNameView>
                <UserNameTxt>{occurrence.authorName}</UserNameTxt>
              </UserNameView>
              <TouchableOpacity>
                <DotsThree size={ICON_SIZE} />
              </TouchableOpacity>
            </UserIcons>
          </Header>
          <OccurrenceImage source={{ uri: occurrence.image }} />
          <Title>{occurrence.title}</Title>
          <Text>{occurrence.status}</Text>
          <Text>{occurrence.description}</Text>
          <OccurrenceIcons>
            <AlertSection>
              <TouchableOpacity onPress={handleLike}>
                <Warning
                  size={ICON_SIZE}
                  color={like ? COLORS.GRAY_800 : COLORS.CANCELED}
                />
              </TouchableOpacity>
              <Text>{occurrence.likes}</Text>
            </AlertSection>
            <CommentSection>
              <ChatCircle size={ICON_SIZE} />
              <Text>{occurrence.comments.length}</Text>
            </CommentSection>
          </OccurrenceIcons>

          <Controller
            control={control}
            name="comment"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Escreva um comentário"
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Button title="Comentar" onPress={handleSubmit(MakeAComment)} />

          {occurrence.comments.map((comment) => (
            <CommentCard
              key={comment.commentId}
              name={comment.userName}
              avatar={comment.userAvatar}
              text={comment.comment}
            />
          ))}
        </Container>
      )}
    </ScrollView>
  );
};
export default Occurrence;
