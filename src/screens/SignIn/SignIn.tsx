import React from "react";
import { Container } from "./SignIn.styles";
import { Input } from "@rneui/base";

const SignIn: React.FC = () => {
  return (
    <Container>
      <Input placeholder="BASIC INPUT" />
    </Container>
  );
};

export default SignIn;
