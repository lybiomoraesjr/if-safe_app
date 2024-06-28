import React, { useEffect, useState } from "react";
import {
  AlertSection,
  CommentSection,
  Container,
  OccurrenceImage,
  Title,
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
import { storageAuthTokenGet } from "@/storage/storageAuthToken";
import { Controller, useForm } from "react-hook-form";
import Button from "@/components/Button";
import { useTheme } from "styled-components";
import { useOccurrence } from "@/hooks/useOccurrence";
import { useAuth } from "@/hooks/useAuth";

type RouteParamsProps = {
  occurrenceId: string;
};

type FormDataProps = {
  comment: string;
};

const Occurrence: React.FC = () => {
  const ICON_SIZE = 24;
  const { COLORS } = useTheme();

  const { user } = useAuth();

  const { occurrence, fetchOccurrence } = useOccurrence();
  const [isLoading, setIsLoading] = useState(true);

  const route = useRoute();
  const { occurrenceId } = route.params as RouteParamsProps;

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
    const fetchData = async () => {
      if (occurrenceId) {
        setIsLoading(true);
        try {
          await fetchOccurrence(occurrenceId);
        } catch (error) {
          const isAppError = error instanceof AppError;
          const title = isAppError
            ? error.data
            : "Não foi possível carregar os detalhes da ocorrência.";

          Alert.alert("Erro", title);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [occurrenceId]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({});

  return (
    <ScrollView>
      <ScreenHeader title="Ocorrência" showBackButton />

      {isLoading ? (
        <Loading />
      ) : (
        <Container>
          <View style={{ flexDirection: "row" }}>
            <OccurrenceImage source={{ uri: occurrence.image }} />

            <View>
              <AlertSection>
                <Warning size={ICON_SIZE} color={COLORS.GRAY_800} />
                <Text>{occurrence.likes}</Text>

                <ChatCircle size={ICON_SIZE} />
              </AlertSection>

              {/* <Text>{occurrence.date}</Text> */}

              <Text>{occurrence.status}</Text>

              <Text>{occurrence.location}</Text>

              <Text>Por {occurrence.authorName}</Text>
              <Button
                title="Alertar!"
                onPress={likeOccurrence}
                style={{ backgroundColor: COLORS.CANCELED }}
              />
            </View>
          </View>

          <Title>{occurrence.title}</Title>
          <Text>{occurrence.description}</Text>

          {user.admin ? (
            <>
              <View style={{ flexDirection: "row" }}>
                <Button
                  title="Cancelar"
                  style={{ backgroundColor: COLORS.CANCELED }}
                />

                <Button title="Resolver" />
              </View>
            </>
          ) : (
            <Button title="Adicionar Depoimento" />
          )}

          {/* <Controller
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

          <Button title="Comentar" onPress={handleSubmit(MakeAComment)} /> */}
        </Container>
      )}
    </ScrollView>
  );
};
export default Occurrence;
