import React, { ComponentProps } from "react";
import { Image } from "@gluestack-ui/themed";

type UserPhotoProps = ComponentProps<typeof Image>

const UserPhoto: React.FC<UserPhotoProps> = ({...rest}) => {
  return (
    <Image
      rounded="$full"
      borderWidth="$2"
      borderColor="$gray400"
      backgroundColor="$gray500"
      alt="Foto do usuário"
      {...rest}
    />
  );
};

export default UserPhoto;
