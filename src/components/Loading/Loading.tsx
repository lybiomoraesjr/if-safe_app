import React from "react";
import { Container, LoadIndicator } from "./Loading.styles";

const Loading: React.FC = () => {
  return (
    <Container>
      <LoadIndicator />
    </Container>
  );
};

export default Loading;
