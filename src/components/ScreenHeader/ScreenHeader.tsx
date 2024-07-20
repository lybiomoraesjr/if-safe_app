import { useTheme } from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, Center, Heading } from "@gluestack-ui/themed";
import { ButtonIcon } from "@gluestack-ui/themed";

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

  return (
    <LinearGradient
      colors={[COLORS.GREEN_GRADIENT_START, COLORS.GREEN_GRADIENT_END]}
    >
      <Center flexDirection="row" pt={paddingTop} pb={32}>
        {showBackButton && (
          <Button size="lg" onPress={handleGoBack} bg="transparent" alignSelf="flex-start">
            <ButtonIcon as={ArrowLeft} size="xl" color="$white" />
          </Button>
        )}

        <Heading color="$white" fontSize={18}>
          {title}
        </Heading>
      </Center>
    </LinearGradient>
  );
};

export default ScreenHeader;
