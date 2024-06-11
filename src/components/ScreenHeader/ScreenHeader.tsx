import { TouchableOpacity } from "react-native";
import { Container } from "./ScreenHeader.styles";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "phosphor-react-native";
import { useTheme } from "styled-components";

type ScreenHeaderProps = {
  title: string;
};

const ScreenHeader: React.FC<ScreenHeaderProps> = ({ title }) => {
  const { COLORS } = useTheme();
  const navigation = useNavigation();
  return (
    <Container>
      <TouchableOpacity onPress={goBack}>
        <ArrowLeft size={24} weight="bold" color={COLORS.BRAND_LIGHT} />
      </TouchableOpacity>
    </Container>
  );
};

export default ScreenHeader;
