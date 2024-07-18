import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";

import { Container, Greeting, Message, Name } from "./HomeHeader.styles";

import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "@/hooks/useAuth";

import defaultUserPhotoImg from "@/assets/userPhotoDefault.png";
import { SignOut } from "phosphor-react-native";
import { useTheme } from "styled-components";
import UserPhoto from "../UserPhoto";
import ConfirmationDialog from "../ConfirmationDialog";

const HomeHeader: React.FC = () => {
  const { user, signOut } = useAuth();
  const { COLORS } = useTheme();

  const insets = useSafeAreaInsets();

  const paddingTop = insets.top + 32;

  const firstName = user.name.split(" ")[0];

  const [isVisible, setIsVisible] = useState(false);

  return (
    <LinearGradient
      colors={[COLORS.GREEN_GRADIENT_START, COLORS.GREEN_GRADIENT_END]}
    >
      <Container style={{ paddingTop }}>
        <UserPhoto
          source={user.avatar ? { uri: user.avatar } : defaultUserPhotoImg}
          size={54}
        />
        <Greeting>
          <Message>Olá,</Message>
          <Name>{firstName}</Name>
        </Greeting>
        <TouchableOpacity onPress={() => setIsVisible(true)}>
          <SignOut size={32} color={COLORS.WHITE} />
        </TouchableOpacity>
      </Container>

      <ConfirmationDialog
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        onConfirm={signOut}
      />
    </LinearGradient>
  );
};

export default HomeHeader;
