import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  padding-top: 100px;
`;

export const TitleContainer = styled.View`
  padding-left: 20px;
`;

export const TitleText = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_400};
  font-size: ${({ theme }) => theme.FONT_SIZE.XXXL}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`;

export const InputContainer = styled.ScrollView`
  flex: 1;
  padding: 0 10px;
  margin: 10px 0;
`;

export const PhotoContainer = styled.View`
  align-items: center;
  margin: 10px;
`;
export const ButtonsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  column-gap: 20px;
`;

export const PhotoView = styled.View`
  background-color: ${({ theme }) => theme.COLORS.GRAY_200};
  height: 200px;
  width: 200px;
  border-radius: 10px;
`;
