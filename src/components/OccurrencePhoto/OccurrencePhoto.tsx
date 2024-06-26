import { ImageProps } from "react-native";
import { StyledImage } from "./OccurrencePhoto.styles";

type OccurrencePhotoProps = ImageProps & {
  size: number;
};

const OccurrencePhoto: React.FC<OccurrencePhotoProps> = ({
  size,
  style,
  ...rest
}) => {
  return (
    <StyledImage
      style={[{ width: size, height: size }, style]}
      {...rest}
    />
  );
};

export default OccurrencePhoto;
