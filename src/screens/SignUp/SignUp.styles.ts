import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 20px 20px;
  /* border-color: black;
  border-style: solid;
  border-width: 3px; */
  background-color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const ImgContainer = styled.View`
  /* flex: 1; */
  margin-top: 60px;
  align-items: center;
  justify-content: center;
`;

export const InputContainer = styled.View`
  flex: 1;
  justify-content: center;
`;
