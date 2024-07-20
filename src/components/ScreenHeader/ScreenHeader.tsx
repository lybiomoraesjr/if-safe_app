import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, Center, Heading, useToken } from "@gluestack-ui/themed";
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
      <Center flexDirection="row" pt={paddingTop} pb={32}>
        {showBackButton && (
          <Button
            size="lg"
            onPress={handleGoBack}
            bg="transparent"
            alignSelf="flex-start"
          >
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
