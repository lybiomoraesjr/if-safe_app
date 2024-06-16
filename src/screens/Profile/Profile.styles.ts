import styled from "styled-components/native";
import { Image } from "expo-image";

export const Container = styled.View`
  flex: 1;
`;

export const Picture = styled(Image)`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  border-width: 2px;
  border-color: ${({ theme }) => theme.COLORS.GRAY_400};
`;
