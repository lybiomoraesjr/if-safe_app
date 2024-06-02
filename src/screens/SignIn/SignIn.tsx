import React from "react";
import { Container } from "./SignIn.styles";
import { Input } from "@rneui/base";
import { Image, Text, View } from "react-native";
import { Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "../../routes/auth.routes";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputComponent from "../../components/InputComponent";

const SignIn: React.FC = () => {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const handleNewAccount = () => {
    navigation.navigate("signUp");
  };

  return (
    <Container>
      <View>
        <Image source={require("./../../assets/ifsafe-logo.png")} />
      </View>
      <InputComponent placeholder="E-mail" />

      <InputComponent placeholder="Senha" />

      <ButtonComponent
        title="Acessar"
        loading={false}
        onPress={() => console.log("aye")}
      />

      <Text>Ainda não tem acesso?</Text>

      <ButtonComponent
        variant="outline"
        title="Criar Conta"
        onPress={handleNewAccount}
      />
    </Container>
  );
};

export default SignIn;
