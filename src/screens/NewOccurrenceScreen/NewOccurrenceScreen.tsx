import React, { useState } from "react";
import ScreenHeader from "../../components/ScreenHeader";
import {
  ButtonsContainer,
  Container,
  GridCont,
  InputContainer,
  PhotoContainer,
  PhotoView,
} from "./NewOccurrenceScreen.styles.";
import { Controller, set, useForm } from "react-hook-form";
import ButtonComponent from "../../components/Button";
import InputComponent from "../../components/Input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../components/Button";
import { ScrollView } from "react-native";

const NewOccurrenceScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });

  return (
    <Container>
      {/* <ScrollView> */}
      <ScreenHeader title="Nova Ocorrência" />
      <InputContainer>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <InputComponent
              placeholder="Título"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.name?.message}
            />
          )}
        />

        <Button isLoading={isLoading} disabled={isLoading} title="Foto" />

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <InputComponent
              placeholder="Localização"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.name?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <InputComponent
              placeholder="Descrição"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.name?.message}
            />
          )}
        />
        <PhotoContainer>
          <PhotoView />
        </PhotoContainer>
        <ButtonsContainer>
          <Button isLoading={isLoading} disabled={isLoading} title="Publicar" />
          <Button
            isLoading={isLoading}
            disabled={isLoading}
            title="Descartar"
          />
        </ButtonsContainer>
      </InputContainer>
      {/* </ScrollView> */}
    </Container>
  );
};

export default NewOccurrenceScreen;
