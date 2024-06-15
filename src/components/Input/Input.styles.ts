import styled from "styled-components/native";

export const Container = styled.View`
  margin-bottom: 16px;
`;

export const InputReactNative = styled.TextInput`
  min-height: 56px;
  max-height: 56px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_200};
  border-radius: 8px;
  padding: 16px;
`;

export const Message = styled.Text`
  color: red;
  margin-top: 4px;
`;
