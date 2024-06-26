import React from "react";
import { Container } from "./Input.styles";
import {
  InputProps as InputReactNativeElementsProps,
  Input as InputReactNativeElements,
} from "@rneui/themed";

type InputProps = InputReactNativeElementsProps & {};

const Input: React.FC<InputProps> = ({ ...rest }) => {
  return (
    <Container>
      <InputReactNativeElements {...rest} />
    </Container>
  );
};

export default Input;
