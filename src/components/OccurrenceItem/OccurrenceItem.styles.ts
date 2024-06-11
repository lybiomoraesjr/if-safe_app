import styled from "styled-components/native";
import { Image } from "expo-image";

export const Container = styled.View`
  flex-direction: row;
  align-items: center;

  margin-bottom: 15px;
`;

export const Picture = styled(Image)`
  width: 100px;
  height: 100px;
  border-radius: 7px;
`;

export const Info = styled.View`
  flex: 1;
  padding: 0px 15px;
`;

export const NotificationView = styled.View`
  flex-direction: row;
  align-items: center;

  column-gap: 4px;
`;

export const NotifierCount = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_300};
  font-size: ${({ theme }) => theme.FONT_SIZE.XS}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`;
export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_800};
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;

export const Date = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_400};
  font-size: ${({ theme }) => theme.FONT_SIZE.XS}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`;

export const InteractButton = styled.TouchableOpacity``;
