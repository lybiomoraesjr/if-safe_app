import React, { ComponentProps } from "react";
import {
  Input as GluestackInput,
  InputField,
  FormControl,
  FormControlError,
  FormControlErrorText,
} from "@gluestack-ui/themed";

type InputProps = ComponentProps<typeof InputField> & {
  errorMessage?: string | null;
  isInvalid?: boolean;
  isReadOnly?: boolean;
};

const Input: React.FC<InputProps> = ({
  isReadOnly = false,
  errorMessage = null,
  isInvalid = false,
  ...rest
}) => {
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={invalid} mb="$4" w="$full">
      <GluestackInput
        isInvalid={isInvalid}
        h="$16"
        borderWidth="$0"
        borderRadius="$md"
        $invalid={{
          borderWidth: 1,
          borderColor: "$red500",
        }}
        $focus={{
          borderWidth: 1,
          borderColor: invalid ? "$red500" : "$green500",
        }}
        isReadOnly={isReadOnly}
        opacity={isReadOnly ? 0.5 : 1}
      >
        <InputField
          px="$4"
          bg="$secondary50"
          color="$secondary950"
          fontFamily="$body"
          placeholderTextColor="$secondary500"
          {...rest}
        />
      </GluestackInput>

      <FormControlError>
        <FormControlErrorText color="$red500">
          {errorMessage}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
};

export default Input;
