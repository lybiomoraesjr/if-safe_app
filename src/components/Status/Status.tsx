import React from "react";
import { Text, View } from "react-native";
import { Title } from "./Status.styles";

type StatusProps = {
  status: string;
};

const Status: React.FC<StatusProps> = ({ status }) => {
  return (
    <View>
      <Title> {status} </Title>
    </View>
  );
};

export default Status;
