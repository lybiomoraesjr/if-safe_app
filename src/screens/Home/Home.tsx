import React from "react";
import { Container, Title } from "./Home.styles";
import HomeHeader from "../../components/HomeHeader";
import OccurrenceList from "../../components/OccurrenceList";
import { occurencesMock } from "../../utils/occurrencesListMock";
import { userMock } from "../../utils/userMock";
import { Divider } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../../routes/app.routes";

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
        occurrences={occurencesMock}
        onInteract={handleNavigateToOccurrenceDetails}
      />
    </Container>
  );
};

export default Home;
