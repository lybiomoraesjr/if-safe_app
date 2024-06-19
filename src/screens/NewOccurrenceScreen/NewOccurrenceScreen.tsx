import React from "react";
import ScreenHeader from "@/components/ScreenHeader";
import {
  ButtonsContainer,
  Container,
  InputContainer,
  PhotoContainer,
  PhotoView,
} from "./NewOccurrenceScreen.styles.";
import { Controller, useForm } from "react-hook-form";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { api } from "@/services/api";
import { storageAuthTokenGet } from "@/storage/storageAuthToken";

const NewOccurrenceScreen: React.FC = () => {
  type FormDataProps = {
    title: string;
    location: string;
    description: string;
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({});

  const handleCreateOccurrence = async (data: FormDataProps) => {
    const token = await storageAuthTokenGet();

    const response = await api.post(`posts/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(data);
  };

  return (
    <Container>
      <ScreenHeader title="Nova Ocorrência" />
      <InputContainer>
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Título"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.title?.message}
            />
          )}
        />

        <Button title="Foto" />

        <Controller
          control={control}
          name="location"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Localização"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.location?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Descrição"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.description?.message}
            />
          )}
        />
        <PhotoContainer>
          <PhotoView />
        </PhotoContainer>
        <ButtonsContainer>
          <Button
            title="Publicar"
            onPress={handleSubmit(handleCreateOccurrence)}
          />
          <Button title="Descartar" />
        </ButtonsContainer>
      </InputContainer>
    </Container>
  );
};

export default NewOccurrenceScreen;
