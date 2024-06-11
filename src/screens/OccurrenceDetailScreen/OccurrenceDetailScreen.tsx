import React from "react";
import { ocurrenceDetailsMock } from "../../utils/ocurrenceDetailsMock";
import { Container } from "./OccurrenceDetailScreen.styles";
import ScreenHeader from "../../components/ScreenHeader";
import OcurrenceDetail from "../../components/OccurrenceDetails/OccurrenceDetail";

const OccurrenceDetailScreen: React.FC = () => {
  return (
    <Container>
      <ScreenHeader title="Ocorrência" />

      <OcurrenceDetail ocurrenceDetail={ocurrenceDetailsMock} />
    </Container>
  );
};

export default OccurrenceDetailScreen;
