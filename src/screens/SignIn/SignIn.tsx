import React from "react";
import { Container } from "./SignIn.styles";
import { Image, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "../../routes/auth.routes";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputComponent from "../../components/InputComponent";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type FormDataProps = {
  email: string;
  password: string;
};

const signInSchema = yup.object({
  email: yup.string().required("Informe o e-mail").email("E-mail inválido."),
  password: yup
    .string()
    .required("Informe a senha")
    .min(6, "A senha deve ter pelo menos 6 dígitos."),
});

const SignIn: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema),
  });

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const handleNewAccount = () => {
    navigation.navigate("signUp");
  };

  const handleSignIn = ({ email, password }: FormDataProps) => {
    console.log({ email, password });
  };

  return (
    <Container>
      <View>
        <Image source={require("./../../assets/ifsafe-logo.png")} />
      </View>

      <Controller
        control={control}
        name="email"
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
        render={({ field: { onChange, value } }) => (
          <InputComponent
            placeholder="Senha"
            onChangeText={onChange}
            value={value}
            secureTextEntry
            errorMessage={errors.password?.message}
            returnKeyType="send"
          />
        )}
      />

      <ButtonComponent
        title="Acessar"
        loading={false}
        onPress={handleSubmit(handleSignIn)}
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
