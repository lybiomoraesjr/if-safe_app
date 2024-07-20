import React, { useState } from "react";
import { Alert, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import Input from "@/components/Input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "@/services/api";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/Button";
import { AppError } from "@/utils/AppError";
import { Heading } from "@gluestack-ui/themed";
import { ScrollView } from "@gluestack-ui/themed";
import { Image } from "@gluestack-ui/themed";
import { VStack } from "@gluestack-ui/themed";
import { Center } from "@gluestack-ui/themed";

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

  const { goBack } = useNavigation();

  const handleGoBack = () => {
    goBack();
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
        ? error.data
        : "Não foi possível criar a conta. Tente novamente mais tarde";

      Alert.alert(title);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      backgroundColor="$white"
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <VStack pt={48}>
        <Image
          w="$full"
          h="$32"
          source={require("@/assets/ifsafe-logo.png")}
          defaultSource={require("@/assets/ifsafe-logo.png")}
          alt="Logo IfSafe"
        />

        <VStack px="$8" pb={18} pt={48}>
          <Center gap="$2" mb={24}>
            <Heading color="$black">Crie sua conta</Heading>

            <Controller
              control={control}
              name="name"
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
                />
              )}
            />

            <Controller
              control={control}
              name="password_confirm"
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
              isLoading={isLoading}
              title="Criar e acessar"
              onPress={handleSubmit(handleSignUp)}
            />
          </Center>
        
            <Button
              variant="outline"
              title="Voltar para o Login"
              onPress={handleGoBack}
              
            />
        </VStack>
      </VStack>
    </ScrollView>
  );
};

export default SignUn;
