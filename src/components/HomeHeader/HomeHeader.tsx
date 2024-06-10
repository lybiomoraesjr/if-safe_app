import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";

import {
  Container,
  Greeting,
  Message,
  Name,
  Picture,
} from "./HomeHeader.styles";

import theme from "../../theme";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../../hooks/useAuth";

import defaulUserPhotoImg from "../../assets/userPhotoDefault.png";
import { SignOut } from "phosphor-react-native";

const HomeHeader: React.FC = () => {
  const { user, signOut } = useAuth();

  const insets = useSafeAreaInsets();

  const paddingTop = insets.top + 32;

  return (
    <LinearGradient
      colors={[
        theme.COLORS.GREEN_GRADIENT_START,
        theme.COLORS.GREEN_GRADIENT_END,
      ]}
    >
      <Container style={{ paddingTop }}>
        <Picture
          source={user.avatar ? { uri: user.avatar } : defaulUserPhotoImg}
          placeholder="L184i9ofbHof00ayjsay~qj[ayj@"
        />
        <Greeting>
          <Message>Olá</Message>
          <Name>{user.name}</Name>
        </Greeting>
        <TouchableOpacity onPress={signOut}>
          <SignOut size={32} color={theme.COLORS.WHITE} />
        </TouchableOpacity>
      </Container>
    </LinearGradient>
  );
};

export default HomeHeader;
