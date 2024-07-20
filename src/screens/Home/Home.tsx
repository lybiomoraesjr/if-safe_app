import React, { useEffect, useState } from "react";

import HomeHeader from "../../components/HomeHeader";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../../routes/app.routes";
import { FlatList, RefreshControl } from "react-native";
import { OccurrenceStatusEnum } from "@/types";
import OccurrenceCard from "@/components/OccurrenceCard";
import Loading from "@/components/Loading";
import { useAuth } from "@/hooks/useAuth";
import { useOccurrence } from "@/hooks/useOccurrence";
import { AppError } from "@/utils/AppError";
import {
  Box,
  Heading,
  HStack,
  Text,
  useToast,
  useToken,
  VStack,
} from "@gluestack-ui/themed";
import StatusButton from "../../components/StatusButton";
import ToastMessage from "@/components/ToastMessage";

const Home: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  const toast = useToast();

  const resolvedBrandLight = useToken("colors", "brandLight");

  const { user } = useAuth();

  const {
    fetchOccurrenceCards,
    occurrenceCards,
    setPositionOfTheOccurrenceInTheArray,
    occurrenceUpdated,
    setOccurrenceUpdated,
  } = useOccurrence();

  const handleNavigateToOccurrence = (id: string, index: number) => {
    setPositionOfTheOccurrenceInTheArray(index);

    navigate("occurrence", { occurrenceId: id });
  };

  const OccurrenceFilter: Record<string, string> = {
    all: "Todas",
    mine: "Minhas",
    pending: OccurrenceStatusEnum.PENDING,
    solved: OccurrenceStatusEnum.SOLVED,
    cancelled: OccurrenceStatusEnum.CANCELLED,
  };

  const occurrenceKeys = Object.keys(OccurrenceFilter);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      await fetchOccurrenceCards();
    } catch (error) {
      const isAppError = error instanceof AppError;
      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="error"
            title="Erro!"
            description={
              isAppError
                ? error.data
                : "Não foi possível carregar as ocorrências. Tente novamente mais tarde."
            }
            onClose={() => toast.close(id)}
          />
        ),
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
    setOccurrenceUpdated(false);
  }, [occurrenceUpdated]);

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchOccurrenceCards();
    } catch (error) {
      const isAppError = error instanceof AppError;

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="error"
            title="Erro!"
            description={
              isAppError
                ? error.data
                : "Não foi possível carregar as ocorrências. Tente novamente mais tarde."
            }
            onClose={() => toast.close(id)}
          />
        ),
      });
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <VStack flex={1} backgroundColor="$white">
      <HomeHeader />

      <Heading color="$black" fontSize="$md" fontFamily="$heading">
        Filtros:
      </Heading>
      <FlatList
        data={occurrenceKeys.filter(
          (item) => user.admin || item !== OccurrenceStatusEnum.CANCELLED
        )}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <StatusButton
            name={OccurrenceFilter[item]}
            isActive={activeFilter === item}
            onPress={() => setActiveFilter(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        style={{ marginVertical: 10, maxHeight: 44, minHeight: 44 }}
      />

      <Heading color="$black" fontSize="$md" fontFamily="$heading">
        Ocorrências:
      </Heading>

      <VStack flex={1}>
        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={occurrenceCards.filter(
              (item) =>
                user.admin || item.status !== OccurrenceStatusEnum.CANCELLED
            )}
            renderItem={({ item, index }) => (
              <OccurrenceCard
                image={item.image}
                alert={item.likes}
                status={item.status}
                title={item.title}
                date={item.date}
                commentsNumber={item.comments.length}
                onInteract={() => handleNavigateToOccurrence(item._id, index)}
              />
            )}
            ListEmptyComponent={() => (
              <Box>
                <Text>Não há ocorrências disponíveis no momento.</Text>
              </Box>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={[resolvedBrandLight]}
              />
            }
          />
        )}
      </VStack>
    </VStack>
  );
};

export default Home;
