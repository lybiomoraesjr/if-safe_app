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
import { OccurrenceStatusEnum } from "@/types";
import CommentDialog from "@/components/CommentDialog";
import { formattedDate } from "@/utils/dateUtils";
import ScreenHeader from "@/components/ScreenHeader";
import CommentsListDialog from "@/components/CommentListDialog";
import CommentListDialog from "@/components/CommentListDialog";

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
    handleMakeAComment,
    setOccurrenceUpdated,
  } = useOccurrence();
  const [isLoading, setIsLoading] = useState(true);

  const [chosenFunction, setChosenFunction] = useState<ChooseFunctionEnum>(
    {} as ChooseFunctionEnum
  );

  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);

  const [isCommentListModalVisible, setIsCommentListModalVisible] =
    useState(false);

  const [isStatusLoading, setIsStatusLoading] = useState<OccurrenceStatusEnum>(
    {} as OccurrenceStatusEnum
  );

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

  const handleStatusChangeWithLoading = async (
    status: OccurrenceStatusEnum,
    comment: string
  ) => {
    try {
      await handleStatusChange(occurrenceId, status, comment);

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

      Alert.alert("Sucesso", "Status alterado com sucesso.");
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.data
        : "Não foi possível alterar o status da ocorrência.";

      Alert.alert("Erro", title);
      setIsStatusLoading({} as OccurrenceStatusEnum);
    } finally {
      setIsStatusLoading({} as OccurrenceStatusEnum);
    }
  };

  const handleMakeACommentWithLoading = async (comment: string) => {
    try {
      await handleMakeAComment(occurrenceId, comment);
      Alert.alert("Sucesso", "Comentário feito com sucesso.");

      setOccurrenceUpdated(true);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.data
        : "Não foi possível comentar a ocorrência.";

      Alert.alert("Erro", title);
      setIsStatusLoading({} as OccurrenceStatusEnum);
    } finally {
      setIsStatusLoading({} as OccurrenceStatusEnum);
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
    setOccurrenceUpdated(true);
  }, [occurrenceId]);

  const displayDate = formattedDate(occurrence.date);

  enum ChooseFunctionEnum {
    HANDLE_COMMENT = "handleComment",
    HANDLE_CANCEL = "handleCancel",
    HANDLE_RESOLVE = "handleResolve",
  }

  const ChooseFunction = {
    [ChooseFunctionEnum.HANDLE_COMMENT]: (params: { comment: string }) =>
      handleMakeACommentWithLoading(params.comment),
    [ChooseFunctionEnum.HANDLE_CANCEL]: (params: { comment: string }) =>
      handleStatusChangeWithLoading(
        OccurrenceStatusEnum.CANCELLED,
        params.comment
      ),
    [ChooseFunctionEnum.HANDLE_RESOLVE]: (params: { comment: string }) =>
      handleStatusChangeWithLoading(
        OccurrenceStatusEnum.SOLVED,
        params.comment
      ),
  };

  return (
    <ScrollView>
      <ScreenHeader title="Detalhes da Ocorrência" showBackButton />

      {isLoading ? (
        <Loading />
      ) : (
        <Container>
          <OccurrenceInfosContainer>
            <OccurrenceImage source={{ uri: occurrence.image }} />
            <OccurrenceInfos>
              <Infos>
                <IconsSection>
                  <AlertSection>
                    <Warning size={ICON_SIZE} color={COLORS.GRAY_800} />
                    <Text>{occurrence.likes}</Text>
                  </AlertSection>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 3,
                    }}
                  >
                    <ChatCircle size={ICON_SIZE} />
                    <Text>{commentsNumber}</Text>
                  </View>
                </IconsSection>

                <Text>{displayDate}</Text>
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
                disabled={isLikeLoading}
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
                  onPress={() => {
                    setIsStatusLoading(OccurrenceStatusEnum.CANCELLED);
                    setChosenFunction(ChooseFunctionEnum.HANDLE_CANCEL);
                    setIsCommentModalVisible(true);
                  }}
                  style={{ backgroundColor: COLORS.CANCELED }}
                  isLoading={
                    isStatusLoading === OccurrenceStatusEnum.CANCELLED &&
                    isCommentModalVisible
                  }
                  disabled={
                    (isStatusLoading === OccurrenceStatusEnum.CANCELLED ||
                      isStatusLoading === OccurrenceStatusEnum.SOLVED) &&
                    isCommentModalVisible
                  }
                />

                <Button
                  title="Resolver"
                  onPress={() => {
                    setIsStatusLoading(OccurrenceStatusEnum.SOLVED);
                    setChosenFunction(ChooseFunctionEnum.HANDLE_RESOLVE);
                    setIsCommentModalVisible(true);
                  }}
                  isLoading={
                    isStatusLoading === OccurrenceStatusEnum.SOLVED &&
                    isCommentModalVisible
                  }
                  disabled={
                    (isStatusLoading === OccurrenceStatusEnum.SOLVED ||
                      isStatusLoading === OccurrenceStatusEnum.CANCELLED) &&
                    isCommentModalVisible
                  }
                />
              </View>
            </>
          ) : (
            <>
              <Button
                title="Comentar"
                onPress={() => {
                  setChosenFunction(ChooseFunctionEnum.HANDLE_COMMENT);
                  setIsCommentModalVisible(true);
                }}
                isLoading={isCommentModalVisible}
                disabled={isCommentModalVisible || isCommentListModalVisible}
              />

              <Button
                title="Ver Comentários"
                onPress={() => {
                  setIsCommentListModalVisible(true);
                }}
                isLoading={isCommentListModalVisible}
                disabled={isCommentModalVisible || isCommentListModalVisible}
              />
            </>
          )}

          <CommentListDialog
            comments={occurrence.comments}
            isVisible={isCommentListModalVisible}
            onClose={() => setIsCommentListModalVisible(false)}
          />
          <CommentDialog
            occurrenceId={occurrenceId}
            isVisible={isCommentModalVisible}
            onClose={() => setIsCommentModalVisible(false)}
            onInteraction={async (comment) => {
              await ChooseFunction[chosenFunction]({ comment });
            }}
          />
        </Container>
      )}
    </ScrollView>
  );
};
export default Occurrence;
