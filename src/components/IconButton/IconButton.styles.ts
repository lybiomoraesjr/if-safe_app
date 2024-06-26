import styled from "styled-components/native";

export const Container = styled.TouchableOpacity``;

export const Loading = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.COLORS.WHITE,
}))``;
