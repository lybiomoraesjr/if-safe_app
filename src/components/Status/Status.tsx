import React from "react";
import { Pressable, Text } from "react-native";
import { useTheme } from "styled-components/native";

type StatusProps = {
  name: string;
  variant?: "active" | "inactive";
  onPress?: () => void;
};

const Status: React.FC<StatusProps> = ({ name, variant, ...rest }) => {
  const { COLORS, FONT_SIZE, FONT_FAMILY } = useTheme();

  return (
    <Pressable
      style={{
        backgroundColor: COLORS.WHITE,
        borderWidth: 1,
        borderColor:
          variant === "active" ? COLORS.BRAND_LIGHT : COLORS.GRAY_300,
        borderRadius: 15,
        height: FONT_SIZE.SM * 2,
        paddingHorizontal: FONT_SIZE.SM,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
      }}
      {...rest}
    >
      <Text
        style={{
          color: variant === "active" ? COLORS.BRAND_LIGHT : COLORS.GRAY_300,
          fontSize: FONT_SIZE.SM,
          fontFamily: FONT_FAMILY.BOLD,
        }}
      >
        {name}
      </Text>
    </Pressable>
  );
};

export default Status;
