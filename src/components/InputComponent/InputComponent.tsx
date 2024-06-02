import React from "react";
import { Input, InputProps } from "@rneui/themed";

type InputComponentProps = InputProps & {};

const InputComponent: React.FC<InputComponentProps> = ({ ...rest }) => {
  return <Input {...rest} />;
};

export default InputComponent;
