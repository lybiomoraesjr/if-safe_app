import React from "react";
import { Container, Title } from "./Home.styles";
import HomeHeader from "../../components/HomeHeader";
import OccurrenceList from "../../components/OccurrenceList";
import { occurencesMock } from "../../utils/occurencesMock";
import { userMock } from "../../utils/userMock";
import { Divider } from "@rneui/base";

const Home: React.FC = () => {
  const ocrDetails = () => {
    console.log("Detalhes da ocorrência");
  };

  return (
    <Container>
      <HomeHeader user={userMock} />
      <Title >
        Ocorrências:
      </Title>

      <Divider style={{ margin: 18 }} />

      <OccurrenceList occurrences={occurencesMock} onInteract={ocrDetails} />
    </Container>
  );
};

export default Home;
