import styled from "styled-components/native";
import { Image } from "expo-image";

export const Container = styled.View`
  flex: 1;
  padding: 15px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const OccurrenceImage = styled(Image)`
  width: 200px;
  height: 200px;
  border-radius: 7px;
  margin-bottom: 20px;
`;
export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_800};
  font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;

export const AlertSection = styled.View`
  flex-direction: row;
  column-gap: 3px;
  align-items: center;
`;
export const CommentSection = styled.View`
  flex-direction: row;
  column-gap: 3px;
  align-items: center;
`;
