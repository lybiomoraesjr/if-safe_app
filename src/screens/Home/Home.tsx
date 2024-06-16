import React from "react";
import {
  Container,
  ContentContainer,
  HomeContainer,
  Title,
} from "./Home.styles";
import HomeHeader from "../../components/HomeHeader";
import OccurrenceList from "../../components/OccurrenceList";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../../routes/app.routes";

import Status from "../../components/OccurrenceStatus";
import { MockOccurrencesList } from "@/utils/mockData";

const Home: React.FC = () => {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const handleNavigateToOccurrenceDetail = () => {
    navigation.navigate("occurrenceDetailScreen");
  };

  return (
    <Container>
      <HomeHeader />

      <ContentContainer>
        <Status status="cancelado" />
        <Title>Ocorrências:</Title>
      </ContentContainer>

      <OccurrenceList
        occurrences={MockOccurrencesList}
        onInteract={handleNavigateToOccurrenceDetail}
      />
    </Container>
  );
};

export default Home;
