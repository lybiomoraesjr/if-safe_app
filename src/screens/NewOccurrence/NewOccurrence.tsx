import React, { useState } from "react";
import ScreenHeader from "@/components/ScreenHeader";
import {
  ButtonsContainer,
  Container,
  InputContainer,
  PhotoContainer,
  PhotoView,
} from "./NewOccurrence.styles.";
import { Controller, useForm } from "react-hook-form";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { api } from "@/services/api";
import { storageAuthTokenGet } from "@/storage/storageAuthToken";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";

const NewOccurrence: React.FC = () => {
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

  const handlePhotoSelected = async (data: FormDataProps) => {
    try {
      const token = await storageAuthTokenGet();

      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photoSelected.canceled) {
        return;
      }

      if (photoSelected.assets[0].uri) {
        const { uri, fileSize } = photoSelected.assets[0];

        if (fileSize && fileSize / 1024 / 1024 > 5) {
          return Alert.alert("Erro", "A imagem deve ter no máximo 5MB");
        }

        const fileExtension = photoSelected.assets[0].uri.split(".").pop();

        const base64Image = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const userPhotoUploadForm = {
          avatar: `data:image/${fileExtension};base64,${base64Image}`,
        };

        const config = {
          avatar: userPhotoUploadForm.avatar,
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        };
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateOccurrence = async (data: FormDataProps) => {
    const token = await storageAuthTokenGet();

    const response = await api.post(`posts/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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

        <Button title="Foto" onPress={handleSubmit(handlePhotoSelected)} />

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

export default NewOccurrence;
