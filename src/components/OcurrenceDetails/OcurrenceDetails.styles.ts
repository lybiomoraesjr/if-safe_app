import styled from "styled-components/native";
import { Image } from "expo-image";

export const Container = styled.View`
  flex: 1;
`;

export const Picture = styled(Image)`
  width: 100px;
  height: 100px;
  border-radius: 7px;
`;
