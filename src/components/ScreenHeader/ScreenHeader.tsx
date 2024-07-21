import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Button,
  Center,
  Heading,
  HStack,
  useToken,
  VStack,
} from "@gluestack-ui/themed";
import { ButtonIcon } from "@gluestack-ui/themed";

type ScreenHeaderProps = {
  title: string;
  showBackButton?: boolean;
};

const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  showBackButton,
}) => {
  const { goBack } = useNavigation();

  const insets = useSafeAreaInsets();

  const greenGradientStart = useToken("colors", "greenGradientStart");
  const greenGradientEnd = useToken("colors", "greenGradientEnd");

  const paddingTop = insets.top + 42;

  const handleGoBack = () => {
    goBack();
  };

  return (
    <LinearGradient colors={[greenGradientStart, greenGradientEnd]}>
      <HStack pt={paddingTop} pb={32} alignItems="center">
        {showBackButton && (
          <VStack>
            <Button size="lg" onPress={handleGoBack} bg="transparent">
              <ButtonIcon as={ArrowLeft} size="xl" color="$white" />
            </Button>
          </VStack>
        )}

        <HStack justifyContent="center">
          <Heading color="$white" fontSize={18}>
            {title}
          </Heading>
        </HStack>
      </HStack>
    </LinearGradient>
  );
};

export default ScreenHeader;
