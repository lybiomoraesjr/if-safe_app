import React from "react";
import { TouchableOpacityProps } from "react-native";
import { useTheme } from "styled-components/native";
import { Container, Loading, Title } from "./Button.styles";

type ButtonProps = TouchableOpacityProps & {
  title: string;
  isLoading?: boolean;
  variant?: "solid" | "outline";
};

const Button: React.FC<ButtonProps> = ({
  title,
  isLoading,
  variant,
  style,
  ...rest
}) => {
  const { COLORS } = useTheme();
  return (
    <Container
      style={[
        {
          backgroundColor:
            variant === "outline" ? "transparent" : COLORS.BRAND_MID,

          borderWidth: variant === "outline" ? 1 : 0,
        },
        style,
      ]}
      disabled={isLoading}
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
