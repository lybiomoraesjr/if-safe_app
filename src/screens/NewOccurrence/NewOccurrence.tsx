import React, { useEffect, useState } from "react";
import ScreenHeader from "@/components/ScreenHeader";
import {
  ButtonsContainer,
  Container,
  InputContainer,
  PhotoContainer,
  PhotoView,
} from "./NewOccurrence.styles";
import { Controller, useForm } from "react-hook-form";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { api } from "@/services/api";
import { storageAuthTokenGet } from "@/storage/storageAuthToken";
import PhotoPickerModal from "@/components/PhotoPickerModal";
import { usePhoto } from "@/hooks/usePhoto";
import OccurrencePhoto from "@/components/OccurrencePhoto/OccurrencePhoto";
import { Alert } from "react-native";
import { useTheme } from "styled-components";

type FormDataProps = {
  title: string;
  location: string;
  description: string;
};

const NewOccurrence: React.FC = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const { selectedPhoto } = usePhoto();

  const { COLORS } = useTheme();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDataProps>({});

  const handleResetForm = (): void => {
    reset({
      title: "",
      description: "",
      location: "",
    });

    setPhotoUri(null);
  };

  const handleCreateOccurrence = async (
    data: FormDataProps,
    encodedUserPhoto: string | null
  ) => {
    try {
      const token = await storageAuthTokenGet();

      const config = {
        description: data.description,
        image: encodedUserPhoto,
        location: data.location,
        title: data.title,
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      };

      await api.post(`/posts`, config);

      Alert.alert("Sucesso", "Ocorrência criada com sucesso");

      handleResetForm();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedPhoto.caller === "newOccurrence") {
      setPhotoUri(selectedPhoto.uri);
    }
  }, [selectedPhoto.uri]);

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
        <Button title="Foto" onPress={() => setModalVisible(true)} />
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
          {photoUri ? (
            <OccurrencePhoto size={200} source={{ uri: photoUri }} />
          ) : (
            <PhotoView />
          )}
        </PhotoContainer>
        <ButtonsContainer>
          <Button
            title="Descartar"
            onPress={handleResetForm}
            style={{ backgroundColor: COLORS.CANCELED }}
          />
          <Button
            title="Publicar"
            onPress={handleSubmit((data) =>
              handleCreateOccurrence(data, photoUri)
            )}
          />
        </ButtonsContainer>
      </InputContainer>

      <PhotoPickerModal
        isVisible={isModalVisible}
        caller="newOccurrence"
        onClose={() => setModalVisible(false)}
      />
    </Container>
  );
};

export default NewOccurrence;
