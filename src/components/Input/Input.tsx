import React from "react";
import { TextInputProps, View, Text, StyleSheet } from "react-native";
import { InputComponent } from "./Input.styles";

type InputProps = TextInputProps & {
  errorMessage?: string;
};

const Input: React.FC<InputProps> = ({ errorMessage, ...rest }) => {
  return (
    <View style={styles.container}>
      <InputComponent {...rest} />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  errorText: {
    color: "red",
    marginTop: 4,
  },
});

export default Input;
