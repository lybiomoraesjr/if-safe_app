import React, { useEffect, useState } from "react";
import {
  AlertSection,
  Container,
  OccurrenceImage,
  Title,
} from "./Occurrence.styles";
import ScreenHeader from "@/components/ScreenHeader";
import { Alert, ScrollView, Text, View } from "react-native";
import { ChatCircle, Warning } from "phosphor-react-native";

import { useRoute } from "@react-navigation/native";
import { AppError } from "@/utils/AppError";
import Loading from "@/components/Loading";

import Button from "@/components/Button";
import { useTheme } from "styled-components";
import { useOccurrence } from "@/hooks/useOccurrence";
import { useAuth } from "@/hooks/useAuth";

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
  } = useOccurrence();
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLikeLoading(false);

      console.log(error);
    } finally {
      setIsLikeLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (occurrenceId) {
        try {
          setIsLoading(true);
          await fetchOccurrence(occurrenceId);
        } catch (error) {
          console.log(error);
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
                onPress={handleLikeWithLoading}
                isLoading={isLikeLoading}
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
        </Container>
      )}
    </ScrollView>
  );
};
export default Occurrence;
