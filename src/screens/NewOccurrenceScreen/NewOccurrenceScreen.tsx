import React from "react";
import ScreenHeader from "../../components/ScreenHeader";
import { Container } from "./NewOccurrenceScreen.styles.";

const NewOccurrenceScreen: React.FC = () => {
  return (
    <Container>
      <ScreenHeader title="Ocorrência" />
    </Container>
  );
};

export default NewOccurrenceScreen;
