import styled from "styled-components/native";
import { Image } from "expo-image";

export const Container = styled.View`
  flex: 1;
  padding: 15px;
`;

export const Header = styled.View`
  flex-direction: row;
  flex: 1;
  margin-bottom: 10px;
`;
export const UserIcons = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-left: 15px;
`;

export const UserNameTxt = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;

export const UserNameView = styled.View`
  margin-right: 10px;
`;

export const OccurrenceImage = styled(Image)`
  width: "full";
  height: 300px;
  border-radius: 7px;
  margin-bottom: 20px;
`;
export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_800};
  font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;

export const OcurrenceIcons = styled.View`
  flex-direction: row;
  column-gap: 20px;
  margin-bottom: 10px;
`;
export const AlertSection = styled.View`
  flex-direction: row;
  column-gap: 3px;
  align-items: center;
`;
export const CommentSection = styled.View`
  flex-direction: row;
  column-gap: 3px;
  align-items: center;
`;
