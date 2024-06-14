import React, { useState } from "react";
import { Container } from "./SignIn.styles";
import { Alert, Image, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "../../routes/auth.routes";
import ButtonComponent from "../../components/Button/Button";
import InputComponent from "../../components/InputComponent";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../hooks/useAuth";
import { AppError } from "../../utils/AppError";
import Button from "../../components/Button/Button";

type FormDataProps = {
  email: string;
  password: string;
};

const signInSchema = yup.object({
  email: yup.string().required("Informe o e-mail").email("E-mail inválido."),
  password: yup
    .string()
    .required("Informe a senha")
    .min(3, "A senha deve ter pelo menos 6 dígitos."),
});

const SignIn: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useAuth();

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

  const handleSignIn = async ({ email, password }: FormDataProps) => {
    try {
      setIsLoading(true);
      await signIn(email, password);
     
    } catch (error: any) {
      console.log("error =>", error);
      const title = error
        ? error
        : "Não foi possível entrar. Tente novamente mais tarde.";

      setIsLoading(false);
      Alert.alert(title);
    }
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

      <Button
        title="Acessar"
        isLoading={isLoading}
        disabled={isLoading}
        onPress={handleSubmit(handleSignIn)}
      />

      <Text>Ainda não tem acesso?</Text>

      <Button
        variant="outline"
        title="Criar Conta"
        onPress={handleNewAccount}
      />
    </Container>
  );
};

export default SignIn;
