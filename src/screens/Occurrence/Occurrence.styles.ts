import styled from "styled-components/native";
import { Image } from "expo-image";

export const Container = styled.View`
  flex: 1;
  padding: 15px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const OccurrenceImage = styled(Image)`
  width: 200px;
  height: 200px;
  border-radius: 7px;
  margin-bottom: 20px;
`;
export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_800};
  font-size: ${({ theme }) => theme.FONT_SIZE.XXL}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;

export const IconsSection = styled.View`
  flex-direction: row;
  column-gap: 15px;
  align-items: center;
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
export const HeaderTitle = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_400};
  font-size: ${({ theme }) => theme.FONT_SIZE.XXXL}px;
  text-align: center;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`;
export const HeaderTitleContainer = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.COLORS.GRAY_100};
  margin-bottom: 12px;
  padding-bottom: 15px;
`;

export const OccurrenceInfosContainer = styled.View`
  flex-direction: row;
  column-gap: 10px;
  justify-content: space-around;
`;
export const OccurrenceInfos = styled.View`
  width: 150px;
  row-gap: 25px;
`;

export const Infos = styled.View`
  justify-content: center;
  row-gap: 10px;
`;
export const OccurrenceMainInfos = styled.View`
  margin-bottom: 20px;
  padding-bottom: 30px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.COLORS.GRAY_100};
`;
