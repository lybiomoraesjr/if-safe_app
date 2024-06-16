import styled from "styled-components/native";

export const Container = styled.ScrollView`
  padding: 0 20px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const ImgContainer = styled.View`
  margin: 40px 0;
  align-items: center;
`;

export const TextQuest = styled.Text`
  text-align: center;
  margin: 80px 0 10px;
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
`;
