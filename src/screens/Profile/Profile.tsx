import React, { useState } from "react";
import { Container, Picture } from "./Profile.styles";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import InputComponent from "../../components/InputComponent";
import ButtonComponent from "../../components/Button";
import * as ImagePicker from "expo-image-picker";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Loading from "../../components/Loading";
import ScreenHeader from "../../components/ScreenHeader";
import Button from "../../components/Button";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  old_password: string;
  confirm_password: string;
};

const Profile: React.FC = () => {
  const [userPhoto, setUserPhoto] = useState(
    "https://github.com/lybiomoraesjr.png"
  );

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

        if (fileSize && fileSize / 1024 / 1024 > 2) {
          return Alert.alert("Erro", "A imagem deve ter no máximo 2MB");
        }

        setUserPhoto(uri);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Container>
      <ScreenHeader title="Perfil" />
      <ScrollView>
        <View style={{ justifyContent: "center" }}>
          <Picture
            source={{ uri: userPhoto }}
            placeholder="L184i9ofbHof00ayjsay~qj[ayj@"
          />

          <TouchableOpacity onPress={handleUserPhotoSelected}>
            <Text style={{ color: "green", fontWeight: "bold" }}>
              Alterar foto
            </Text>
          </TouchableOpacity>

          <InputComponent value="Lybio Moraes Junior" />
          <InputComponent disabled value="j.lybio@aluno.ifsp.br" />

          <Text>Alterar senha</Text>
          <InputComponent placeholder="Senha antiga" />
          <InputComponent placeholder="Nova senha" />

          <InputComponent placeholder="Confirme a nova senha" />

          <Button title="Atualizar" />
        </View>
      </ScrollView>
    </Container>
  );
};

export default Profile;
