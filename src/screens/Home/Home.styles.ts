import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_800};
  font-size: ${({ theme }) => theme.FONT_SIZE.XXL}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;
export const OccurrenceContainer = styled.View`
  flex: 1;
  padding: 20px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
`;
export const TitleContainer = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.COLORS.GRAY_100};
  margin-bottom: 30px;
  margin-top: 30px;
  padding-bottom: 25px;
`;
