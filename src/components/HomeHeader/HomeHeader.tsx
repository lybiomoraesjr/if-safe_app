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
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../../routes/app.routes";
import { useAuth } from "../../hooks/useAuth";

import defaulUserPhotoImg from "../../assets/userPhotoDefault.png";

const HomeHeader: React.FC = () => {
  const { user, signOut } = useAuth();

  const insets = useSafeAreaInsets();

  const paddingTop = insets.top + 32;

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
          <Name>Olá, {user.name}</Name>
          <Slogan>Segurança em primeiro lugar!</Slogan>
        </Greeting>
        <TouchableOpacity onPress={handleNavigateToProfile}>
          <Picture
            source={user.avatar ? { uri: user.avatar } : defaulUserPhotoImg}
            placeholder="L184i9ofbHof00ayjsay~qj[ayj@"
          />
        </TouchableOpacity>
      </Container>
    </LinearGradient>
  );
};

export default HomeHeader;
