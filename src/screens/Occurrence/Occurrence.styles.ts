import styled from "styled-components/native";
import { Image } from "expo-image";

export const Container = styled.View``;

export const OccurrenceImage = styled(Image)`
  width: "full";
  height: 300px;
  border-radius: 7px;
`;
export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_800};
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;
