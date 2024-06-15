import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";

import {
  Container,
  Greeting,
  Message,
  Name,
  UserImage,
} from "./HomeHeader.styles";

import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../../hooks/useAuth";

import defaultUserPhotoImg from "../../assets/userPhotoDefault.png";
import { SignOut } from "phosphor-react-native";
import { useTheme } from "styled-components";

const HomeHeader: React.FC = () => {
  const { user, signOut } = useAuth();
  const { COLORS } = useTheme();

  const insets = useSafeAreaInsets();

  const paddingTop = insets.top + 32;

  return (
    <LinearGradient
      colors={[COLORS.GREEN_GRADIENT_START, COLORS.GREEN_GRADIENT_END]}
    >
      <Container style={{ paddingTop }}>
        <UserImage
          source={user.avatar ? { uri: user.avatar } : defaultUserPhotoImg}
          placeholder="L184i9ofbHof00ayjsay~qj[ayj@"
        />
        <Greeting>
          <Message>Olá</Message>
          <Name>{user.name}</Name>
        </Greeting>
        <TouchableOpacity onPress={signOut}>
          <SignOut size={32} color={COLORS.WHITE} />
        </TouchableOpacity>
      </Container>
    </LinearGradient>
  );
};

export default HomeHeader;
