import React from "react";
import { Text } from "react-native";
import { Container } from "./Button.styles";
import { Button } from "@rneui/base";

type ButtonComponentProps = {
  isLoading?: boolean;
};

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  isLoading = false,
}) => {
  return (
    <Button
      loading={isLoading}
      loadingProps={{ size: "small", color: "white" }}
      buttonStyle={{
        backgroundColor: "rgba(111, 202, 186, 1)",
        borderRadius: 5,
      }}
      titleStyle={{ fontWeight: "bold", fontSize: 23 }}
      containerStyle={{
        marginHorizontal: 50,
        height: 50,
        width: 200,
        marginVertical: 10,
      }}
    />
  );
};

export default ButtonComponent;
