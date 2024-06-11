import { TouchableOpacity } from "react-native";
import { Container, Title } from "./ScreenHeader.styles";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "phosphor-react-native";
import { useTheme } from "styled-components";
import { AuthNavigatorRoutesProps } from "../../routes/auth.routes";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

type ScreenHeaderProps = {
  title: string;
};

const ScreenHeader: React.FC<ScreenHeaderProps> = ({ title }) => {
  const { COLORS } = useTheme();

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const insets = useSafeAreaInsets();

  const paddingTop = insets.top + 42;

  return (
    <LinearGradient
      colors={[COLORS.GREEN_GRADIENT_START, COLORS.GREEN_GRADIENT_END]}
    >
      <Container style={{ paddingTop }}>
        <TouchableOpacity onPress={handleGoBack}>
          <ArrowLeft size={24} weight="bold" color={COLORS.WHITE} />
        </TouchableOpacity>
        <Title>{title}</Title>
      </Container>
    </LinearGradient>
  );
};

export default ScreenHeader;
