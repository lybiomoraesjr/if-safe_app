import styled from "styled-components/native";

export const Container = styled.View`
  padding: 0 32px 24px;
  flex-direction: row;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;
