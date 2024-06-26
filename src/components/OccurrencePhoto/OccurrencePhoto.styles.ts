import styled from "styled-components/native";

export const StyledImage = styled.Image`
  border-width: 2px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_200};
`;
