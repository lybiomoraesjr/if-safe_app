import React, { createContext, ReactNode, useEffect, useState } from "react";
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
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();

        if (!cameraStatus.granted) {
          return Alert.alert(
            "Erro",
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
          return Alert.alert(
            "Erro",
            "Precisamos de permissão para acessar a galeria"
          );
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
          return Alert.alert("Erro", "A imagem deve ter no máximo 2MB");
        }

        const fileExtension = uri.split(".").pop();

        // const _rotate90andFlip = async () => {
        //   const manipResult = await manipulateAsync(
        //     image.localUri || image.uri,
        //     [{ rotate: 90 }, { flip: FlipType.Vertical }],
        //     { compress: 1, format: SaveFormat.PNG }
        //   );
        //   setImage(manipResult);
        // };

        const base64Image = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const encodedUserPhoto = `data:image/${fileExtension};base64,${base64Image}`;

        // const manipulatedImage = await ImageManipulator.manipulateAsync(
        //   uri,
        //   saveOptions: { base64: true, }

        // );

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
