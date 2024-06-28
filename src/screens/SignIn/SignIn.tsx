import React, { useState } from "react";
import { Container, ImgContainer, TextQuest } from "./SignIn.styles";
import { Alert, Image, StatusBar, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@/routes/auth.routes";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { useTheme } from "styled-components";
import { AppError } from "@/utils/AppError";

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
  const { FONT_SIZE, FONT_FAMILY } = useTheme();

  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema),
  });

  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();

  const handleNewAccount = () => {
    navigate("signUp");
  };

  const handleSignIn = async ({ email, password }: FormDataProps) => {
    try {
      setIsLoading(true);
      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.data
        : "Não foi possível entrar. Tente novamente mais tarde.";

      setIsLoading(false);
      Alert.alert(title);
    }
  };

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <ImgContainer>
        <Image source={require("@/assets/ifsafe-logo.png")} />
      </ImgContainer>

      <Text
        style={{
          textAlign: "center",
          fontSize: FONT_SIZE.LG,
          fontFamily: FONT_FAMILY.BOLD,
          paddingBottom: 15,
        }}
      >
        Acesse sua conta
      </Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="E-mail"
            onChangeText={onChange}
            value={value}
            errorMessage={errors.email?.message}
            autoCapitalize="none"
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Senha"
            onChangeText={onChange}
            value={value}
            secureTextEntry
            errorMessage={errors.password?.message}
            returnKeyType="send"
            onSubmitEditing={handleSubmit(handleSignIn)}
          />
        )}
      />

      <Button
        title="Acessar"
        isLoading={isLoading}
        onPress={handleSubmit(handleSignIn)}
      />

      <TextQuest>Ainda não tem acesso?</TextQuest>

      <Button
        variant="outline"
        title="Criar Conta"
        onPress={handleNewAccount}
      />
    </Container>
  );
};

export default SignIn;
