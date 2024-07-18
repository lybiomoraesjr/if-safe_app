import {
  Textarea as GluestackTextarea,
  TextareaInput,
} from "@gluestack-ui/themed";
import React, { ComponentProps } from "react";

type TextareaProps = ComponentProps<typeof TextareaInput> & {
  isInvalid: boolean;
  placeholder: string;
};

const Textarea: React.FC<TextareaProps> = (isInvalid, placeholder, ...rest) => {
  return (
    <GluestackTextarea size="md" isInvalid={!!isInvalid} w="$64" {...rest}>
      <TextareaInput placeholder={placeholder} />
    </GluestackTextarea>
  );
};

export default Textarea;
