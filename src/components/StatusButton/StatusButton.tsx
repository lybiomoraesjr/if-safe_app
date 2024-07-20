import React from "react";
import { Button, Text } from "@gluestack-ui/themed";

type StatusProps = {
  name: string;
  isActive?: boolean;
  onPress?: () => void;
};

const StatusButton: React.FC<StatusProps> = ({
  name,
  isActive,
  onPress,
  ...rest
}) => {
  return (
    <Button
      mr="$3"
      minWidth="$24"
      h="$10"
      bg="$white"
      rounded="$md"
      justifyContent="center"
      alignItems="center"
      borderColor={isActive ? "$green600" : "$secondary600"}
      borderWidth="$2"
      onPress={onPress}
      {...rest}
    >
      <Text
        color={isActive ? "$green600" : "$secondary600"}
        textTransform="uppercase"
        fontSize="$xs"
        fontFamily="$heading"
      >
        {name}
      </Text>
    </Button>
  );
};

export default StatusButton;
