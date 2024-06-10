import HomeHeader from "../../components/HomeHeader";
import { userMock } from "../../utils/userMock";
import { Container, Title } from "./MyOccurrencesPage.styles";
import { Divider } from "@rneui/base";
import OccurrenceList from "../../components/OccurrenceList";
import { AppNavigatorRoutesProps } from "../../routes/app.routes";
import { useNavigation } from "@react-navigation/native";
import { myOccurrencesListMock } from "../../utils/myOccurrencesListMock";

const MyOccurrencesPage = () => {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const handleNavigateToOccurrenceDetails = () => {
    navigation.navigate("ocurrenceDetailsPage");
  };
  return (
    <Container>
      <HomeHeader />
      <Title>Minhas ocorrências:</Title>

      <Divider style={{ margin: 18 }} />

      <OccurrenceList
        occurrences={myOccurrencesListMock}
        onInteract={handleNavigateToOccurrenceDetails}
      />
    </Container>
  );
};

export default MyOccurrencesPage;
