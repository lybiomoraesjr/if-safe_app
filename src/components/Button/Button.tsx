import React, { ComponentProps } from "react";

import {
  Button as GluestackButton,
  Text,
  ButtonSpinner,
} from "@gluestack-ui/themed";

type ButtonProps = ComponentProps<typeof GluestackButton> & {
  title: string;
  isLoading?: boolean;
  variant?: "solid" | "outline" | "cancel";
};

const Button: React.FC<ButtonProps> = ({
  title,
  isLoading = false,
  variant,
  style,
  ...rest
}) => {
  return (
    <GluestackButton
      w="$full"
      h="$16"
      bg={variant === "outline" ? "transparent" : "$green700"}
      borderWidth={variant === "outline" ? "$1" : "$0"}
      borderColor="$green500"
      rounded="$sm"
      $active-backgroundColor={variant === "outline" ? "$gray500" : "$green500"}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <ButtonSpinner color="$white" />
      ) : (
        <Text
          color={variant === "outline" ? "$green500" : "$white"}
          fontFamily="$heading"
          fontSize="$sm"
        >
          {title}
        </Text>
      )}
    </GluestackButton>
  );
};

export default Button;
