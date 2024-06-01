import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";

import {
  Container,
  Greeting,
  Name,
  Picture,
  Slogan,
} from "./HomeHeader.styles";

import theme from "../../theme";
import { LinearGradient } from "expo-linear-gradient";
import { User } from "../../types";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../../routes/app.routes";

type HomeHeaderProps = {
  user: User;
};

const HomeHeader: React.FC<HomeHeaderProps> = ({ user }) => {
  const insets = useSafeAreaInsets();

  const paddingTop = insets.top + 32;

  const firstName = user.name.split(" ")[0];

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const handleNavigateToProfile = () => {
    navigation.navigate("profile");
  };

  return (
    <LinearGradient
      colors={[
        theme.COLORS.GREEN_GRADIENT_START,
        theme.COLORS.GREEN_GRADIENT_END,
      ]}
    >
      <Container style={{ paddingTop }}>
        <Greeting>
          <Name>Olá, {firstName}</Name>
          <Slogan>Segurança em primeiro lugar!</Slogan>
        </Greeting>
        <TouchableOpacity onPress={handleNavigateToProfile}>
          <Picture
            source={{ uri: user.imageUri }}
            placeholder="L184i9ofbHof00ayjsay~qj[ayj@"
          />
        </TouchableOpacity>
      </Container>
    </LinearGradient>
  );
};

export default HomeHeader;