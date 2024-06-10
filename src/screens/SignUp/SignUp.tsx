import React, { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "../../routes/auth.routes";
import { Controller, set, useForm } from "react-hook-form";
import ButtonComponent from "../../components/ButtonComponent";
import InputComponent from "../../components/InputComponent";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../../services/api";
import { AppError } from "../../utils/AppError";
import { useAuth } from "../../hooks/useAuth";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

const signUpSchema = yup.object({
  name: yup.string().required("Informe o nome."),
  email: yup.string().required("Informe o e-mail").email("E-mail inválido."),
  password: yup
    .string()
    .required("Informe a senha")
    .min(6, "A senha deve ter pelo menos 6 dígitos."),
  password_confirm: yup
    .string()
    .required("Confirme a senha.")
    .oneOf([yup.ref("password"), ""], "A confirmação da senha não confere."),
});

const SignUn: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSignUp = async ({ name, email, password }: FormDataProps) => {
    try {
      setIsLoading(true);
      await api.post("/users", { name, email, password });
      await signIn(email, password);
    } catch (error) {
      setIsLoading(false);
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível criar a conta. Tente novamente mais tarde.";

      Alert.alert(title);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View>
        <Image source={require("./../../assets/ifsafe-logo.png")} />
      </View>

      <Text>Registre-se</Text>

      <Controller
        control={control}
        name="name"
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
          />
        )}
      />

      <Controller
        control={control}
        name="password_confirm"
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
        loading={isLoading}
        disabled={isLoading}
        title="Acessar"
        onPress={handleSubmit(handleSignUp)}
      />

      <ButtonComponent
        variant="outline"
        title="Voltar para o Login"
        onPress={handleGoBack}
      />
    </ScrollView>
  );
};

export default SignUn;
