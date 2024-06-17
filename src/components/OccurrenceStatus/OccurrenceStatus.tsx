import React from "react";
import { Pressable, Text } from "react-native";
import { useTheme } from "styled-components";

type OccurrenceStatusProps = {
  name: string;
};

const OccurrenceStatus: React.FC<OccurrenceStatusProps> = ({ name }) => {
  const { COLORS, FONT_SIZE, FONT_FAMILY } = useTheme();

  return (
    <Pressable
      style={{
        backgroundColor: COLORS.GRAY_500,
        borderRadius: 6,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: COLORS.GRAY_800,
          fontSize: FONT_SIZE.SM,
          fontFamily: FONT_FAMILY.BOLD,
          textTransform: "uppercase",
        }}
      >
        {name}
      </Text>
    </Pressable>
  );
};

export default OccurrenceStatus;
