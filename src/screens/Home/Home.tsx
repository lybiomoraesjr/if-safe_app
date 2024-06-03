import React from "react";
import { Container, Title } from "./Home.styles";
import HomeHeader from "../../components/HomeHeader";
import OccurrenceList from "../../components/OccurrenceList";
import { userMock } from "../../utils/userMock";
import { Divider } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../../routes/app.routes";
import { occurrencesListMock } from "../../utils/occurrencesListMock";

const Home: React.FC = () => {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const handleNavigateToOccurrenceDetails = () => {
    navigation.navigate("ocurrenceDetailsPage");
  };

  return (
    <Container>
      <HomeHeader user={userMock} />
      <Title>Ocorrências:</Title>

      <Divider style={{ margin: 18 }} />

      <OccurrenceList
        occurrences={occurrencesListMock}
        onInteract={handleNavigateToOccurrenceDetails}
      />
    </Container>
  );
};

export default Home;
