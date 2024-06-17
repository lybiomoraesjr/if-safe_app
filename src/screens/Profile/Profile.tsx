import React, { useState } from "react";
import { Container, Picture } from "./Profile.styles";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import ScreenHeader from "@/components/ScreenHeader";
import Button from "@/components/Button";
import Input from "@/components/Input/Input";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "styled-components";
import { api } from "@/services/api";
import { AppError } from "@/utils/AppError";
import { storageAuthTokenGet } from "@/storage/storageAuthToken";
import defaultUserPhotoImg from "@/assets/userPhotoDefault.png";
import * as FileSystem from "expo-file-system";

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
  const [isUpdating, setIsUpdating] = useState(false);
  const [photoIsLoading, setPhotoIsLoading] = useState(false);

  const { COLORS, FONT_SIZE, FONT_FAMILY } = useTheme();

  const { user, updateUserProfile } = useAuth();
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

  async function handleProfileUpdate(data: FormDataProps) {
    try {
      setIsUpdating(true);

      const token = await storageAuthTokenGet();

      let config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      // const userUpdated = user;
      // userUpdated.name = data.name;

      const response = await api.get("/posts", config);
      console.log(response.data);
      // await updateUserProfile(userUpdated);

      // Alert.alert("Sucesso", "Perfil atualizado com sucesso");
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.data : "Erro na atualização do perfil";
      Alert.alert(title);
    } finally {
      setIsUpdating(false);
    }
  }

  async function handleUserPhotoSelected() {
    try {
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

        const avatarUpdatedResponse = await api.patch(
          "/users/avatar",
          userPhotoUploadForm,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const userUpdated = user;
        userUpdated.avatar = avatarUpdatedResponse.data.avatar;

        updateUserProfile(userUpdated);

        Alert.alert("Sucesso", "Foto de perfil atualizada com sucesso");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Container>
      <ScreenHeader title="Perfil" />
      <ScrollView style={{ paddingHorizontal: 20, marginTop: 5 }}>
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Picture
            source={user.avatar ? { uri: user.avatar } : defaultUserPhotoImg}
            placeholder="L184i9ofbHof00ayjsay~qj[ayj@"
          />

          <TouchableOpacity
            onPress={handleUserPhotoSelected}
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
              placeholder="E-mail"
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
    </Container>
  );
};

export default Profile;
