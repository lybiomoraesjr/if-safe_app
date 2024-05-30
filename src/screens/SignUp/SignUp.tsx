import React from "react";
import { Container } from "./SignUp.styles";
import { Text, View } from "react-native";
import { Image } from "react-native";
import { Button, Input } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "../../routes/auth.routes";
import { Controller, useForm } from "react-hook-form";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

const SignUn: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>();

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSignUp = ({
    name,
    email,
    password,
    password_confirm,
  }: FormDataProps) => {
    console.log({ name, email, password, password_confirm });
  };

  return (
    <Container>
      <View>
        <Image source={require("./../../assets/ifsafe-logo.png")} />
      </View>

      <Controller
        control={control}
        name="name"
        rules={{ required: "Campo obrigatório" }}
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Nome"
            onChangeText={onChange}
            value={value}
            errorMessage={errors.name?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        rules={{
          required: "Campo obrigatório",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "E-mail inválido",
          },
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="E-mail"
            onChangeText={onChange}
            value={value}
            errorMessage={errors.email?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        rules={{ required: "Campo obrigatório" }}
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Senha"
            onChangeText={onChange}
            value={value}
            secureTextEntry
            errorMessage={errors.password?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password_confirm"
        rules={{ required: "Campo obrigatório" }}
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Confirme a Senha"
            onChangeText={onChange}
            value={value}
            secureTextEntry
            onSubmitEditing={handleSubmit(handleSignUp)}
            returnKeyType="send"
            errorMessage={errors.password_confirm?.message}
          />
        )}
      />

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
        onPress={handleSubmit(handleSignUp)}
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
