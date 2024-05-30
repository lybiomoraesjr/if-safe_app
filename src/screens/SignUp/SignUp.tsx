import React from "react";
import { Container } from "./SignUp.styles";
import { Text, View } from "react-native";
import { Image } from "react-native";
import { Button, Input } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "../../routes/auth.routes";

const SignUn: React.FC = () => {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const handleGoBack = () => {
    navigation.navigate("signIn");
  };

  const handleSignUp = () => {};

  return (
    <Container>
      <View>
        <Image source={require("./../../assets/ifsafe-logo.png")} />
      </View>

      <Input placeholder="Nome" />

      <Input placeholder="E-mail" />

      <Input placeholder="Senha" />

      <Input placeholder="Confirme a Senha" />

      <Button
        title="Acessar"
        loading={false}
        loadingProps={{ size: "small", color: "white" }}
        buttonStyle={{
          backgroundColor: "rgba(111, 202, 186, 1)",
          borderRadius: 5,
        }}
        titleStyle={{ fontWeight: "bold", fontSize: 23 }}
        containerStyle={{
          marginHorizontal: 50,
          height: 50,
          width: 200,
          marginVertical: 10,
        }}
        onPress={() => console.log("aye")}
      />

      <Button
        title="Voltar para o Login"
        loading={false}
        loadingProps={{ size: "small", color: "white" }}
        buttonStyle={{
          backgroundColor: "rgba(111, 202, 186, 1)",
          borderRadius: 5,
        }}
        titleStyle={{ fontWeight: "bold", fontSize: 23 }}
        containerStyle={{
          marginHorizontal: 50,
          height: 50,
          width: 200,
          marginVertical: 10,
        }}
        onPress={handleGoBack}
      />
    </Container>
  );
};

export default SignUn;
