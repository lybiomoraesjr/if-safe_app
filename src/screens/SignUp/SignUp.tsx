import React from "react";
import { Container } from "./SignUp.styles";
import { View } from "react-native";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "../../routes/auth.routes";
import { Controller, useForm } from "react-hook-form";
import ButtonComponent from "../../components/ButtonComponent";
import InputComponent from "../../components/InputComponent";

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
          <InputComponent
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
          <InputComponent
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
          <InputComponent
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
          <InputComponent
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

      <ButtonComponent
        isLoading={false}
        title="Acessar"
        onPress={handleSubmit(handleSignUp)}
      />

      <ButtonComponent
        variant="outline"
        title="Voltar para o Login"
        onPress={handleGoBack}
      />
    </Container>
  );
};

export default SignUn;
