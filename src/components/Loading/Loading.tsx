import React from "react";
import { Center, Spinner } from "@gluestack-ui/themed";

type LoadingProps = {
  bgColor?: string;
};

const Loading: React.FC<LoadingProps> = ({ bgColor = "$white" }) => {
  return (
    <Center flex={1} bg={bgColor}>
      <Spinner color="$green500" />
    </Center>
  );
};

export default Loading;
