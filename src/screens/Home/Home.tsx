import React from "react";
import { Container, Title } from "./Home.styles";
import HomeHeader from "../../components/HomeHeader";
import OccurrenceList from "../../components/OccurrenceList";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../../routes/app.routes";

import Status from "../../components/OccurrenceStatus";
import { MockOccurrencesList } from "@/utils/mockData";
import { View } from "react-native";

const Home: React.FC = () => {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const handleNavigateToOccurrenceDetail = () => {
    navigation.navigate("occurrenceDetailScreen");
  };

  return (
    <Container>
      <HomeHeader />

      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <View>
          <Status name="cancelado" />
        </View>

        <Title>Ocorrências:</Title>

        <OccurrenceList
          occurrences={MockOccurrencesList}
          onInteract={handleNavigateToOccurrenceDetail}
        />
      </View>
    </Container>
  );
};

export default Home;
