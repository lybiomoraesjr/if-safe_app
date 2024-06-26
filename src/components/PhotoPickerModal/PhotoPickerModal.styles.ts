import styled from "styled-components/native";

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const ModalContent = styled.View`
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 25px;
  width: 200px;
  height: 100px;
`;
