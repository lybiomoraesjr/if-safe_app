import React, { createContext, ReactNode, useEffect, useState } from "react";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { ChooseImageEnum } from "@/types/enums";
import { PhotoInfo } from "@/types";
import { useToast } from "@gluestack-ui/themed";
import ToastMessage from "@/components/ToastMessage";

export type PhotoContextDataProps = {
  chooseImage: (
    source: ChooseImageEnum,
    caller: string
  ) => Promise<void | string>;
  selectedPhoto: PhotoInfo;
  setSelectedPhoto: (photo: PhotoInfo) => void;
};

export const PhotoContext = createContext<PhotoContextDataProps>(
  {} as PhotoContextDataProps
);

type PhotoContextProviderProps = {
  children: ReactNode;
};

export const PhotoContextProvider = ({
  children,
}: PhotoContextProviderProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoInfo>(
    {} as PhotoInfo
  );

  const toast = useToast();

  const chooseImage = async (source: ChooseImageEnum, caller: string) => {
    try {
      let result;
      if (source === ChooseImageEnum.OPEN_CAMERA) {
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();

        if (!cameraStatus.granted) {
          return Alert.alert(
            "Erro!",
            "Precisamos de permissão para acessar a câmera"
          );
        }

        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
          aspect: [4, 4],
          allowsEditing: true,
        });
      } else {
        const libraryStatus =
          await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!libraryStatus.granted) {
          return toast.show({
            placement: "top",
            render: ({ id }) => (
              <ToastMessage
                id={id}
                action="error"
                title="Erro!"
                description="Precisamos de permissão para acessar a galeria"
                onClose={() => toast.close(id)}
              />
            ),
          });
        }

        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
          aspect: [4, 4],
          allowsEditing: true,
        });
      }

      if (result.canceled) {
        return;
      }

      if (result.assets[0].uri) {
        const { uri, fileSize } = result.assets[0];

        if (fileSize && fileSize / 1024 / 1024 > 2) {
          return toast.show({
            placement: "top",
            render: ({ id }) => (
              <ToastMessage
                id={id}
                action="error"
                title="Erro!"
                description="A imagem deve ter no máximo 2MB"
                onClose={() => toast.close(id)}
              />
            ),
          });
        }

        const fileExtension = uri.split(".").pop();

        const base64Image = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const encodedUserPhoto = `data:image/${fileExtension};base64,${base64Image}`;

        setSelectedPhoto({ uri: encodedUserPhoto, caller });
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <PhotoContext.Provider
      value={{
        chooseImage,
        selectedPhoto,
        setSelectedPhoto,
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
};
