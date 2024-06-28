import React, { createContext, ReactNode, useState } from "react";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { ChooseImageEnum } from "@/types/enums";
import { PhotoInfo } from "@/types";

export type PhotoContextDataProps = {
  chooseImage: (source: ChooseImageEnum, caller: string) => Promise<void>;
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

  const chooseImage = async (source: ChooseImageEnum, caller: string) => {
    try {
      let result;
      if (source === ChooseImageEnum.OPEN_CAMERA) {
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
          aspect: [4, 4],
          allowsEditing: true,
        });
      } else {
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

        if (fileSize && fileSize / 1024 / 1024 > 5) {
          return Alert.alert("Erro", "A imagem deve ter no máximo 5MB");
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
