import { IconProps } from "phosphor-react-native";
import React from "react";
import { TouchableOpacityProps } from "react-native";
import { Container } from "./IconButton.styles";
import Loading from "../Loading";

interface IconButtonProps extends TouchableOpacityProps {
  icon: React.FC<IconProps>;
  isLoading?: boolean;
  iconColor?: string;
  iconSize?: number;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  isLoading,
  iconColor,
  iconSize,
  ...rest
}) => {
  return (
    <Container {...rest}>
      {isLoading ? (
        <Loading />
      ) : (
        <Icon size={iconSize} weight="fill" color={iconColor} />
      )}
    </Container>
  );
};

export default IconButton;
