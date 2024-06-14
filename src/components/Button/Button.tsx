import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { useTheme } from "styled-components";
import { Container, Title } from "./Button.styles";
import Loading from "../Loading";

type ButtonProps = TouchableOpacityProps & {
  title: string;
  isLoading?: boolean;
  variant?: "solid" | "outline";
};

const Button: React.FC<ButtonProps> = ({
  title,
  isLoading,
  variant,
  ...rest
}) => {
  const { COLORS } = useTheme();
  return (
    <Container
      style={{
        backgroundColor:
          variant === "outline" ? "transparent" : COLORS.BRAND_MID,

        borderWidth: variant === "outline" ? 1 : 0,
        borderColor: COLORS.BRAND_MID,
      }}
      {...rest}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <Title
          style={{
            color: variant === "outline" ? COLORS.BRAND_LIGHT : COLORS.WHITE,
          }}
        >
          {title}
        </Title>
      )}
    </Container>
  );
};

export default Button;
