import React, { useEffect, useState } from "react";
import {
  Container,
  OccurrenceContainer,
  Title,
  TitleContainer,
} from "./Home.styles";
import HomeHeader from "../../components/HomeHeader";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../../routes/app.routes";
import { Alert, FlatList, RefreshControl, Text, View } from "react-native";
import { OccurrenceStatusEnum } from "@/types";
import Status from "../../components/StatusButton";
import OccurrenceCard from "@/components/OccurrenceCard";
import Loading from "@/components/Loading";
import { useAuth } from "@/hooks/useAuth";
import { useOccurrence } from "@/hooks/useOccurrence";
import { AppError } from "@/utils/AppError";
import { useTheme } from "styled-components";
import { Heading, HStack, VStack } from "@gluestack-ui/themed";
import StatusButton from "../../components/StatusButton";

const Home: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  const { COLORS } = useTheme();
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
      const title = isAppError
        ? error.data
        : "Não foi possível carregar as ocorrências";
      Alert.alert("Erro", title);
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
      const title = isAppError
        ? error.data
        : "Não foi possível carregar as ocorrências";
      Alert.alert("Erro", title);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <VStack flex={1} backgroundColor="$white">
      <HomeHeader />

      <FlatList
        data={occurrenceKeys.filter(
          (item) => user.admin || item !== "cancelled"
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
        contentContainerStyle={{ paddingHorizontal: 32 }}
        style={{ marginVertical: 40, maxHeight: 44, minHeight: 44 }}
      />

      <HStack justifyContent="space-between" mb="$5" alignItems="center">
        <Heading color="$secondary200" fontSize="$md" fontFamily="$heading">
          Ocorrências:
        </Heading>
      </HStack>

      <VStack px="$8" flex={1}>
        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={occurrenceCards}
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
              <View>
                <Text>Não há ocorrências disponíveis no momento.</Text>
              </View>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={[COLORS.BRAND_LIGHT]}
              />
            }
          />
        )}
      </VStack>
    </VStack>
  );
};

export default Home;
