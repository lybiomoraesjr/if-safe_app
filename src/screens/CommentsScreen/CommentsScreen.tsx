import React from "react";
import { Container } from "./CommentsScreen.styles";
import ScreenHeader from "../../components/ScreenHeader";

const CommentsScreen: React.FC = () => {
  return (
    <Container>
      <ScreenHeader title="Comentários" />
    </Container>
  );
};

export default CommentsScreen;
