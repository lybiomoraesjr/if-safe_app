import React from "react";
import { Container, Title } from "./Home.styles";
import HomeHeader from "../../components/HomeHeader";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../../routes/app.routes";
import { MockOccurrencesList } from "@/utils/mockData";
import { FlatList, View } from "react-native";
import { OccurrenceStatusEnum } from "@/types";
import OccurrenceStatus from "../../components/OccurrenceStatus";
import OccurrenceItem from "@/components/OccurrenceItem";

const Home: React.FC = () => {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  const handleNavigateToOccurrenceDetail = () => {
    navigate("occurrenceDetailScreen");
  };

  const occurrenceData = [
    { status: OccurrenceStatusEnum.CANCELLED },
    { status: OccurrenceStatusEnum.PENDING },
    { status: OccurrenceStatusEnum.SOLVED },
  ];

  return (
    <Container>
      <HomeHeader />

      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <FlatList
          data={occurrenceData}
          keyExtractor={(item) => item.status}
          renderItem={({ item }) => <OccurrenceStatus name={item.status} />}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <Title>Ocorrências:</Title>

        <FlatList
          data={MockOccurrencesList}
          keyExtractor={(item) => item.uuid}
          renderItem={({ item }) => (
            <OccurrenceItem
              imageUri={item.imageUri}
              notifiersNumber={item.notifiersIDs.length}
              status={item.status}
              title={item.title}
              date={item.date}
              onInteract={handleNavigateToOccurrenceDetail}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Container>
  );
};

export default Home;
