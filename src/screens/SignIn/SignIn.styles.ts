import styled from "styled-components/native";

export const Container = styled.ScrollView`
  padding: 20px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const ImgContainer = styled.View`
  margin: 60px 0;
  align-items: center;
`;

export const TextQuest = styled.Text`
  text-align: center;
  margin: 80px 0 10px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;
