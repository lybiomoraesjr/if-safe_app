import React, { useEffect, useState } from "react";
import {
  ButtonsContainer,
  Container,
  InputContainer,
  PhotoContainer,
  TitleContainer,
  TitleText,
} from "./NewOccurrence.styles";
import { Controller, useForm } from "react-hook-form";
import Button from "@/components/Button";
import Input from "@/components/Input";
import PhotoPickerModal from "@/components/PhotoPickerModal";
import { usePhoto } from "@/hooks/usePhoto";
import OccurrencePhoto from "@/components/OccurrencePhoto/OccurrencePhoto";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "styled-components";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Skeleton } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@/routes/app.routes";
import { useOccurrence } from "@/hooks/useOccurrence";
import { NewOccurrenceFormData } from "@/types";

const profileSchema = yup.object({
  title: yup.string().required("Informe o título"),
  location: yup.string().required("Informe a localização"),
  description: yup.string().required("Informe a descrição"),
});

const NewOccurrence: React.FC = () => {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  const [isLoading, setIsLoading] = useState(false);

  const CALLER = "newOccurrence";

  const PHOTO_SIZE = 200;

  const [isModalVisible, setModalVisible] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const { handleCreateOccurrence } = useOccurrence();

  const { selectedPhoto, setSelectedPhoto } = usePhoto();

  const { COLORS, FONT_FAMILY, FONT_SIZE } = useTheme();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewOccurrenceFormData>({
    resolver: yupResolver(profileSchema),
  });

  const handleResetForm = (): void => {
    reset({
      title: "",
      description: "",
      location: "",
    });

    setPhotoUri(null);
    setSelectedPhoto({ uri: "", caller: "" });
    navigate("home");
  };

  const handlePublish = async (data: NewOccurrenceFormData) => {
    try {
      setIsLoading(true);
      await handleCreateOccurrence(data, photoUri);

      Alert.alert("Sucesso", "Ocorrência criada com sucesso");

      handleResetForm();
    } catch (error) {
      console.error("Erro ao criar ocorrência:", error);
      Alert.alert(
        "Erro",
        "Não foi possível criar a ocorrência. Por favor, tente novamente."
      );
    } finally {
      setIsLoading(false);
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
            <OccurrencePhoto size={PHOTO_SIZE} source={{ uri: photoUri }} />
          ) : (
            <Skeleton
              animation="none"
              width={PHOTO_SIZE}
              height={PHOTO_SIZE}
              style={{ borderRadius: 10 }}
            />
          )}
        </PhotoContainer>

        <View style={{ alignItems: "center", marginBottom: 12 }}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{ marginTop: 2 }}
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
            disabled={isLoading}
          />
          <Button
            title="Publicar"
            isLoading={isLoading}
            onPress={handleSubmit(handlePublish)}
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
