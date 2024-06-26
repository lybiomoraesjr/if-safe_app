import React from "react";
import { Pressable, Text } from "react-native";
import { useTheme } from "styled-components/native";

type StatusProps = {
  name: string;
};

const Status: React.FC<StatusProps> = ({ name }) => {
  const { COLORS, FONT_SIZE, FONT_FAMILY } = useTheme();

  return (
    <Pressable
      style={{
        // backgroundColor: COLORS.GRAY_200,
        borderWidth: 1,
        borderColor: COLORS.GRAY_300,
        borderRadius: 15,
        height: FONT_SIZE.SM * 2,
        paddingHorizontal: FONT_SIZE.SM,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
      }}
    >
      <Text
        style={{
          color: COLORS.GRAY_600,
          fontSize: FONT_SIZE.SM,
          fontFamily: FONT_FAMILY.BOLD,
          // textTransform: "uppercase",
        }}
      >
        {name}
      </Text>
    </Pressable>
  );
};

export default Status;
