import styled from "styled-components/native";

export const Container = styled.ImageBackground`
  flex: 1;
  padding: 20px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const ImgContainer = styled.View`
  margin-top: 60px;
  align-items: center;
  justify-content: center;
`;

export const InputContainer = styled.View`
  justify-content: center;
  flex: 1;
`;
export const TextQuest = styled.Text`
  text-align: center;
  margin-bottom: 10px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;
