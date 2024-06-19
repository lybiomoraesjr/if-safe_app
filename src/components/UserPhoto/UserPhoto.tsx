import React from "react";
import { ImageProps } from "react-native";
import { StyledImage } from "./UserPhoto.styles";

type UserPhotoProps = ImageProps & {
  size: number;
};

const UserPhoto: React.FC<UserPhotoProps> = ({ size, style, ...rest }) => {
  return (
    <StyledImage
      style={[{ width: size, height: size, borderRadius: size / 2 }, style]}
      {...rest}
    />
  );
};

export default UserPhoto;
