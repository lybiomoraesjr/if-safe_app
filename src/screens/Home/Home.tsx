import React, { useEffect, useState } from "react";
import { Container, Title } from "./Home.styles";
import HomeHeader from "../../components/HomeHeader";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../../routes/app.routes";
import { Alert, FlatList, View } from "react-native";
import { OccurrenceStatusEnum } from "@/types";
import OccurrenceStatus from "../../components/OccurrenceStatus";
import OccurrenceItem from "@/components/OccurrenceItem";
import { api } from "@/services/api";
import { storageAuthTokenGet } from "@/storage/storageAuthToken";
import { OccurrenceItemDTO } from "@/dtos/OccurrenceItemDTO";
import { AppError } from "@/utils/AppError";
import Loading from "@/components/Loading";

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();
  const [posts, setPosts] = useState<OccurrenceItemDTO[]>([]);

  const handleNavigateToOccurrenceDetail = () => {
    navigate("occurrenceDetailScreen");
  };

  const occurrenceData = [
    "Todas",
    "Minhas",
    OccurrenceStatusEnum.PENDING,
    OccurrenceStatusEnum.SOLVED,
    OccurrenceStatusEnum.CANCELLED,
  ];

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
        data={occurrenceData}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <OccurrenceStatus name={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      <Title>Ocorrências:</Title>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <OccurrenceItem
              imageUri={item.image}
              notifiersNumber={item.likes.length}
              status={item.status}
              title={item.name}
              date={item.date}
              onInteract={handleNavigateToOccurrenceDetail}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </Container>
  );
};

export default Home;
