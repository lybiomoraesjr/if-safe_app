import { IconProps } from "phosphor-react-native";
import React, { ComponentProps } from "react";
import Loading from "../Loading";
import { Button, ButtonIcon } from "@gluestack-ui/themed";

type IconButtonProps = ComponentProps<typeof ButtonIcon> & {
  icon: React.FC<IconProps>;
  isLoading?: boolean;
  onPress?: () => Promise<void> | void;
};

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  isLoading,
  onPress,
  ...rest
}) => {
  return (
    <Button onPress={onPress} bgColor="$green700">
      {isLoading ? <Loading /> : <ButtonIcon as={icon} size="2xs" {...rest} />}
    </Button>
  );
};

export default IconButton;
