import React from "react";
import { Container, Picture } from "./Profile.styles";
import { ScrollView, Text, View } from "react-native";
import InputComponent from "../../components/InputComponent";
import ButtonComponent from "../../components/ButtonComponent";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  old_password: string;
  confirm_password: string;
};

const Profile: React.FC = () => {
  return (
    <Container>
      <ScrollView>
        <View style={{ justifyContent: "center" }}>
          <Picture
            source={{ uri: "https://github.com/lybiomoraesjr.png" }}
            placeholder="L184i9ofbHof00ayjsay~qj[ayj@"
          />
          <Text>Alterar foto</Text>

          <InputComponent value="Lybio Moraes Junior" />
          <InputComponent disabled value="j.lybio@aluno.ifsp.br" />

          <Text>Alterar senha</Text>
          <InputComponent placeholder="Senha antiga" />
          <InputComponent placeholder="Nova senha" />

          <InputComponent placeholder="Confirme a nova senha" />

          <ButtonComponent title="Atualizar" />
        </View>
      </ScrollView>
    </Container>
  );
};

export default Profile;
