import React, { useEffect, useState } from "react";
import { Container, Title } from "./Home.styles";
import HomeHeader from "../../components/HomeHeader";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../../routes/app.routes";
import { Alert, FlatList } from "react-native";
import { OccurrenceStatusEnum } from "@/types";
import Status from "../../components/Status";
import OccurrenceCard from "@/components/OccurrenceCard";
import { api } from "@/services/api";
import { storageAuthTokenGet } from "@/storage/storageAuthToken";
import { AppError } from "@/utils/AppError";
import Loading from "@/components/Loading";
import { OccurrenceCardDTO } from "@/dtos/OccurrenceCardDTO";

const Home: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>("all");
  const [isLoading, setIsLoading] = useState(true);
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();
  const [posts, setPosts] = useState<OccurrenceCardDTO[]>([]);

  const handleNavigateToOccurrence = (id: string) => {
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

  const fetchOccurrences = async () => {
    try {
      const token = await storageAuthTokenGet();

      const response = await api.get(`posts/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPosts(response.data);
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
    fetchOccurrences();
  }, []);

  return (
    <Container>
      <HomeHeader />

      <FlatList
        data={occurrenceKeys}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Status
            name={OccurrenceFilter[item]}
            variant={activeFilter === item ? "active" : "inactive"}
            onPress={() => setActiveFilter(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      <Title>Ocorrências:</Title>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <OccurrenceCard
              image={item.image}
              notifiersNumber={item.likes.length}
              status={item.status}
              title={item.title}
              date={item.date}
              onInteract={() => handleNavigateToOccurrence(item._id)}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </Container>
  );
};

export default Home;
