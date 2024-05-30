import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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

type HomeHeaderProps = {
  user: User;
};

const HomeHeader: React.FC<HomeHeaderProps> = ({ user }) => {
  const insets = useSafeAreaInsets();

  const paddingTop = insets.top + 32;

  const firstName = user.name.split(" ")[0];

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
        <Picture
          source={{ uri: user.imageUri }}
          placeholder="L184i9ofbHof00ayjsay~qj[ayj@"
        />
      </Container>
    </LinearGradient>
  );
};

export default HomeHeader;
