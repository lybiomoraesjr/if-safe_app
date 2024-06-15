import React from "react";
import { TextInputProps } from "react-native";
import { Container, InputReactNative, Message } from "./Input.styles";

type InputProps = TextInputProps & {
  errorMessage?: string;
};

const Input: React.FC<InputProps> = ({ errorMessage, ...rest }) => {
  return (
    <Container>
      <InputReactNative {...rest} />
      {errorMessage && <Message>{errorMessage}</Message>}
    </Container>
  );
};

export default Input;
