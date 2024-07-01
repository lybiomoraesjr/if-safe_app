import React, { useEffect, useState } from "react";
import {
  AlertSection,
  Container,
  HeaderTitle,
  HeaderTitleContainer,
  IconsSection,
  Infos,
  OccurrenceImage,
  OccurrenceInfos,
  OccurrenceInfosContainer,
  OccurrenceMainInfos,
  Title,
} from "./Occurrence.styles";
import { Alert, ScrollView, Text, View } from "react-native";
import { ChatCircle, Warning } from "phosphor-react-native";

import { useRoute } from "@react-navigation/native";
import { AppError } from "@/utils/AppError";
import Loading from "@/components/Loading";

import Button from "@/components/Button";
import { useTheme } from "styled-components";
import { useOccurrence } from "@/hooks/useOccurrence";
import { useAuth } from "@/hooks/useAuth";
import HomeHeader from "@/components/HomeHeader";
import { OccurrenceStatusEnum } from "@/types";
import CreateACommentDialog from "@/components/CreateACommentDialog";

type RouteParamsProps = {
  occurrenceId: string;
};

const Occurrence: React.FC = () => {
  const ICON_SIZE = 24;
  const { COLORS } = useTheme();

  const { user } = useAuth();

  const {
    occurrence,
    setOccurrence,
    fetchOccurrence,
    handleLikeOccurrence,
    positionOfTheOccurrenceInTheArray,
    occurrenceCards,
    setOccurrenceCards,
    handleStatusChange,
    commentsNumber,
  } = useOccurrence();
  const [isLoading, setIsLoading] = useState(true);

  const [isCreateACommentDialogVisible, setIsCreateACommentDialogVisible] =
    useState(false);

  const [isCancelLoading, setIsCancelLoading] = useState(false);
  const [isSolveLoading, setIsSolveLoading] = useState(false);

  const [isLikeLoading, setIsLikeLoading] = useState(false);

  const route = useRoute();
  const { occurrenceId } = route.params as RouteParamsProps;

  const handleLikeWithLoading = async () => {
    try {
      setIsLikeLoading(true);
      await handleLikeOccurrence(occurrenceId);

      setOccurrenceCards(
        occurrenceCards.map((occurrenceCard, index) => {
          if (index === positionOfTheOccurrenceInTheArray) {
            return {
              ...occurrenceCard,
              likes: occurrenceCard.likes + 1,
            };
          }

          return occurrenceCard;
        })
      );
      setOccurrence({
        ...occurrence,
        likes: occurrence.likes + 1,
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.data
        : "Não foi possível alertar a ocorrência.";

      Alert.alert("Erro", title);
      setIsLikeLoading(false);
    } finally {
      setIsLikeLoading(false);
    }
  };

  const handleResolveOccurrence = async (status: OccurrenceStatusEnum) => {
    try {
      setIsSolveLoading(true);
      await handleStatusChange(user.id, status);

      setOccurrenceCards(
        occurrenceCards.map((occurrenceCard, index) => {
          if (index === positionOfTheOccurrenceInTheArray) {
            return {
              ...occurrenceCard,
              status,
            };
          }

          return occurrenceCard;
        })
      );
      setOccurrence({
        ...occurrence,
        status,
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.data
        : "Não foi possível resolver a ocorrência.";

      Alert.alert("Erro", title);
      setIsSolveLoading(false);
    } finally {
      setIsSolveLoading(false);
    }
  };

  const handleCancelOccurrence = async (status: OccurrenceStatusEnum) => {
    try {
      setIsCancelLoading(true);
      await handleStatusChange(user.id, status);

      setOccurrenceCards(
        occurrenceCards.map((occurrenceCard, index) => {
          if (index === positionOfTheOccurrenceInTheArray) {
            return {
              ...occurrenceCard,
              status,
            };
          }

          return occurrenceCard;
        })
      );
      setOccurrence({
        ...occurrence,
        status,
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.data
        : "Não foi possível resolver a ocorrência.";

      Alert.alert("Erro", title);
      setIsCancelLoading(false);
    } finally {
      setIsCancelLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (occurrenceId) {
        try {
          setIsLoading(true);
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

  return (
    <ScrollView>
      <HomeHeader />

      {isLoading ? (
        <Loading />
      ) : (
        <Container>
          <HeaderTitleContainer>
            <HeaderTitle>Detalhes da Ocorrência:</HeaderTitle>
          </HeaderTitleContainer>

          <OccurrenceInfosContainer>
            <OccurrenceImage source={{ uri: occurrence.image }} />
            <OccurrenceInfos>
              <Infos>
                <IconsSection>
                  <AlertSection>
                    <Warning size={ICON_SIZE} color={COLORS.GRAY_800} />
                    <Text>{occurrence.likes}</Text>
                  </AlertSection>

                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <ChatCircle size={ICON_SIZE} />
                    <Text>{commentsNumber}</Text>
                  </View>
                </IconsSection>

                {/* <Text>{occurrence.date}</Text> */}
                <View>
                  <Text>{occurrence.status}</Text>
                </View>

                <View>
                  <Text>{occurrence.location}</Text>
                </View>
                <View>
                  <Text>Por {occurrence.authorName}</Text>
                </View>
              </Infos>
              <Button
                title="Alertar!"
                onPress={handleLikeWithLoading}
                isLoading={isLikeLoading}
                style={{ backgroundColor: COLORS.CANCELED }}
              />
            </OccurrenceInfos>
          </OccurrenceInfosContainer>

          <OccurrenceMainInfos>
            <Title>{occurrence.title}</Title>
            <Text>{occurrence.description}</Text>
          </OccurrenceMainInfos>

          {user.admin ? (
            <>
              <View style={{ flexDirection: "row" }}>
                <Button
                  title="Cancelar"
                  onPress={() =>
                    handleCancelOccurrence(OccurrenceStatusEnum.CANCELLED)
                  }
                  style={{ backgroundColor: COLORS.CANCELED }}
                  isLoading={isCancelLoading}
                  disabled={isSolveLoading}
                />

                <Button
                  title="Resolver"
                  onPress={() =>
                    handleResolveOccurrence(OccurrenceStatusEnum.SOLVED)
                  }
                  isLoading={isSolveLoading}
                  disabled={isCancelLoading}
                />
              </View>
            </>
          ) : (
            <Button
              title="Adicionar Depoimento"
              onPress={() => setIsCreateACommentDialogVisible(true)}
            />
          )}

          <CreateACommentDialog
            occurrenceId={occurrenceId}
            isVisible={isCreateACommentDialogVisible}
            onClose={() => setIsCreateACommentDialogVisible(false)}
          />
        </Container>
      )}
    </ScrollView>
  );
};
export default Occurrence;
