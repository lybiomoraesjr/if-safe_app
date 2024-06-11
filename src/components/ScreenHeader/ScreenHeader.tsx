import { Container, Title } from "./ScreenHeader.styles";
import { useTheme } from "styled-components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity, ViewStyle } from "react-native";
import { ArrowLeft } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "../../routes/auth.routes";

type ScreenHeaderProps = {
  title: string;
  showBackButton?: boolean;
};

const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  showBackButton,
}) => {
  const { COLORS } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const paddingTop = insets.top + 42;

  const handleGoBack = () => {
    navigation.goBack();
  };

  const containerStyle: ViewStyle = {
    paddingTop,

    alignItems: showBackButton ? "flex-start" : "center",
  };

  return (
    <LinearGradient
      colors={[COLORS.GREEN_GRADIENT_START, COLORS.GREEN_GRADIENT_END]}
    >
      <Container style={containerStyle}>
        {showBackButton && (
          <TouchableOpacity activeOpacity={0.7} onPress={handleGoBack}>
            <ArrowLeft size={24} weight="bold" color={COLORS.WHITE} />
          </TouchableOpacity>
        )}

        <Title>{title}</Title>
      </Container>
    </LinearGradient>
  );
};

export default ScreenHeader;
