import styled from "styled-components/native";

export const Container = styled.ScrollView`
  padding: 0 20px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const ImageContainer = styled.View`
  margin: 40px 0;
  align-items: center;
  justify-content: center;
`;

export const Register = styled.Text`
  text-align: center;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  margin-bottom: 15px;
`;
