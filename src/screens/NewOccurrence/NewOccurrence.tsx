import React, { useEffect, useState } from "react";
import ScreenHeader from "@/components/ScreenHeader";
import {
  ButtonsContainer,
  Container,
  InputContainer,
  PhotoContainer,
  PhotoView,
  TitleContainer,
  TitleText,
} from "./NewOccurrence.styles";
import { Controller, useForm } from "react-hook-form";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { api } from "@/services/api";
import { storageAuthTokenGet } from "@/storage/storageAuthToken";
import PhotoPickerModal from "@/components/PhotoPickerModal";
import { usePhoto } from "@/hooks/usePhoto";
import OccurrencePhoto from "@/components/OccurrencePhoto/OccurrencePhoto";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "styled-components";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type FormDataProps = {
  title: string;
  location: string;
  description: string;
};

const profileSchema = yup.object({
  title: yup.string().required("Informe o título"),
  location: yup.string().required("Informe a localização"),
  description: yup.string().required("Informe a descrição"),
});

const NewOccurrence: React.FC = () => {
  const CALLER = "newOccurrence";

  const [isModalVisible, setModalVisible] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const { selectedPhoto } = usePhoto();

  const { COLORS, FONT_FAMILY, FONT_SIZE } = useTheme();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(profileSchema),
  });

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
    if (selectedPhoto.caller === CALLER) {
      setPhotoUri(selectedPhoto.uri);
    }
  }, [selectedPhoto.uri]);

  return (
    <Container>
      <TitleContainer>
        <TitleText>Nova Ocorrência:</TitleText>
      </TitleContainer>
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

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{ marginTop: 5 }}
          >
            <Text
              style={{
                color: COLORS.BRAND_MID,
                fontFamily: FONT_FAMILY.BOLD,
                fontSize: FONT_SIZE.SM,
              }}
            >
              Escolher foto
            </Text>
          </TouchableOpacity>
        </View>

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
        caller={CALLER}
        onClose={() => setModalVisible(false)}
      />
    </Container>
  );
};

export default NewOccurrence;
