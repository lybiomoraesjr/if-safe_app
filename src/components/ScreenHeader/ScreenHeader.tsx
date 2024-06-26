import { Container, Title } from "./ScreenHeader.styles";
import { useTheme } from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity, View, ViewStyle } from "react-native";
import { ArrowLeft } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";

type ScreenHeaderProps = {
  title: string;
  showBackButton?: boolean;
};

const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  showBackButton,
}) => {
  const { COLORS } = useTheme();
  const { goBack } = useNavigation();
  
  const insets = useSafeAreaInsets();

  const paddingTop = insets.top + 42;

  const handleGoBack = () => {
    goBack();
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
          <View>
            <TouchableOpacity activeOpacity={0.7} onPress={handleGoBack}>
              <ArrowLeft size={24} weight="bold" color={COLORS.WHITE} />
            </TouchableOpacity>
          </View>
        )}

        <View style={{ flex: 1, alignItems: "center" }}>
          <Title>{title}</Title>
        </View>
      </Container>
    </LinearGradient>
  );
};

export default ScreenHeader;
