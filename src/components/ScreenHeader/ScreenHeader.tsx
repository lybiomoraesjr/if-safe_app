import { Container, Title } from "./ScreenHeader.styles";
import { useTheme } from "styled-components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

type ScreenHeaderProps = {
  title: string;
};

const ScreenHeader: React.FC<ScreenHeaderProps> = ({ title }) => {
  const { COLORS } = useTheme();

  const insets = useSafeAreaInsets();

  const paddingTop = insets.top + 42;

  return (
    <LinearGradient
      colors={[COLORS.GREEN_GRADIENT_START, COLORS.GREEN_GRADIENT_END]}
    >
      <Container style={{ paddingTop }}>
        <Title>{title}</Title>
      </Container>
    </LinearGradient>
  );
};

export default ScreenHeader;
