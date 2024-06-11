import styled from "styled-components/native";
import { Image } from "expo-image";

export const Container = styled.View`
  flex-direction: row;
`;

export const UserImage = styled(Image)`
  width: 54px;
  height: 54px;
  border-radius: 27px;
`;
