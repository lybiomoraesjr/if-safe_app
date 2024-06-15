import styled from "styled-components/native";
import { Image } from "expo-image";

export const Container = styled.View`
  flex: 1;
`;

export const Picture = styled(Image)`
  width: 90px;
  height: 90px;
  border-radius: 45px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.GRAY_400};
`;
