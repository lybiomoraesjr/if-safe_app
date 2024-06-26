import React, { useState, useEffect } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ScreenHeader from "@/components/ScreenHeader";
import Button from "@/components/Button";
import Input from "@/components/Input/Input";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "styled-components/native";
import { api } from "@/services/api";
import { AppError } from "@/utils/AppError";
import { storageAuthTokenGet } from "@/storage/storageAuthToken";
import defaultUserPhotoImg from "@/assets/userPhotoDefault.png";
import UserPhoto from "@/components/UserPhoto";
import PhotoPickerModal from "@/components/PhotoPickerModal";
import { usePhoto } from "@/hooks/usePhoto";
import { Skeleton } from "@rneui/base";
import { Container } from "./Profile.styles";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  old_password: string;
  confirm_password: string;
};

const profileSchema = yup.object({
  name: yup.string().required("Informe o nome"),
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 dígitos.")
    .nullable()
    .transform((value) => (!!value ? value : null)),
  confirm_password: yup
    .string()
    .nullable()
    .transform((value) => (!!value ? value : null))
    .oneOf([yup.ref("password"), null], "A confirmação de senha não confere."),
});

const Profile: React.FC = () => {
  const CALLER = "profile";

  const PHOTO_SIZE = 100;

  const [photoIsLoading, setPhotoIsLoading] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const { COLORS, FONT_SIZE, FONT_FAMILY } = useTheme();

  const { user, updateUserProfile } = useAuth();

  const { selectedPhoto, setSelectedPhoto } = usePhoto();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
    resolver: yupResolver(profileSchema),
  });

  useEffect(() => {
    if (selectedPhoto.caller === CALLER && selectedPhoto.uri) {
      handleUserPhotoSelected(selectedPhoto.uri);
    }
  }, [selectedPhoto.uri]);

  const handleProfileUpdate = async (data: FormDataProps) => {
    try {
      setIsUpdating(true);

      const token = await storageAuthTokenGet();

      let config = {
        name: data.name,
        oldpassword: data.old_password,
        newpassword: data.password,
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      await api.put(`/users/${user.id}`, config);

      await updateUserProfile({ ...user, name: data.name });

      Alert.alert("Sucesso", "Perfil atualizado com sucesso");
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.data : "Erro na atualização do perfil";
      Alert.alert(title);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUserPhotoSelected = async (encodedUserPhoto: string) => {
    try {
      setPhotoIsLoading(true);
      const token = await storageAuthTokenGet();

      const config = {
        avatar: encodedUserPhoto,
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      };

      await api.put(`/users/${user.id}`, config);

      await updateUserProfile({
        ...user,
        avatar: encodedUserPhoto,
      });

      setSelectedPhoto({ uri: "", caller: "" });

      Alert.alert("Sucesso", "Foto de perfil atualizada com sucesso");
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.data
        : "Erro na atualização da foto de perfil";
      Alert.alert(title);
    } finally {
      setPhotoIsLoading(false);
    }
  };

  return (
    <Container>
      <ScreenHeader title="Perfil" />
      <ScrollView style={{ paddingHorizontal: 20, marginTop: 15 }}>
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          {photoIsLoading ? (
            <Skeleton width={PHOTO_SIZE} height={PHOTO_SIZE} circle />
          ) : (
            <UserPhoto
              size={PHOTO_SIZE}
              source={user.avatar ? { uri: user.avatar } : defaultUserPhotoImg}
            />
          )}

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
              Alterar foto
            </Text>
          </TouchableOpacity>
        </View>

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
              editable={false}
              autoCapitalize="none"
            />
          )}
        />

        <Text
          style={{
            marginTop: 15,
            marginBottom: 5,
            fontFamily: FONT_FAMILY.BOLD,
            fontSize: FONT_SIZE.SM,
          }}
        >
          Alterar senha
        </Text>
        <Controller
          control={control}
          name="old_password"
          render={({ field: { onChange } }) => (
            <Input
              placeholder="Senha atual"
              onChangeText={onChange}
              errorMessage={errors.old_password?.message}
              secureTextEntry
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange } }) => (
            <Input
              placeholder="Nova senha"
              onChangeText={onChange}
              errorMessage={errors.password?.message}
              secureTextEntry
            />
          )}
        />

        <Controller
          control={control}
          name="confirm_password"
          render={({ field: { onChange } }) => (
            <Input
              placeholder="Confirme a nova senha"
              onChangeText={onChange}
              errorMessage={errors.confirm_password?.message}
              secureTextEntry
            />
          )}
        />

        <Button
          title="Atualizar"
          onPress={handleSubmit(handleProfileUpdate)}
          isLoading={isUpdating}
          style={{ marginTop: 10 }}
        />
      </ScrollView>
      <PhotoPickerModal
        isVisible={isModalVisible}
        caller={CALLER}
        onClose={() => setModalVisible(false)}
      />
    </Container>
  );
};

export default Profile;
