import React from "react";
import { Container, Title } from "./OccurrenceStatus.styles";

type OccurrenceStatusProps = {
  status: string;
};

const OccurrenceStatus: React.FC<OccurrenceStatusProps> = ({ status }) => {
  return (
    <Container>
      <Title>{status}</Title>
    </Container>
  );
};

export default OccurrenceStatus;
