import React from "react";
import { Container } from "./OccurrenceDetailScreen.styles";
import ScreenHeader from "../../components/ScreenHeader";
import OccurrenceDetail from "../../components/OccurrenceDetail/OccurrenceDetail";
import { MockOccurrenceDetail } from "@/utils/mockData";

const OccurrenceDetailScreen: React.FC = () => {
  return (
    <Container>
      <ScreenHeader title="Ocorrência" showBackButton />

      <OccurrenceDetail occurrenceDetail={MockOccurrenceDetail} />
    </Container>
  );
};

export default OccurrenceDetailScreen;
