import styled from "styled-components/native";

export const Container = styled.Pressable`
  padding: 10px;
  background-color: gray;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_800};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  text-transform: uppercase;
`;
