import { Dialog } from "@rneui/themed";
import Input from "../Input";
import Button from "../Button";
import { Alert, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useOccurrence } from "@/hooks/useOccurrence";
import { AppError } from "@/utils/AppError";
import { useTheme } from "styled-components";

type CreateACommentDialogProps = {
  isVisible: boolean;
  onClose: () => void;
  occurrenceId: string;
};

type FormDataProps = {
  comment: string;
};

const CreateACommentDialogSchema = yup.object({
  comment: yup.string().required("Digite um comentário."),
});

const CreateACommentDialog: React.FC<CreateACommentDialogProps> = ({
  isVisible,
  onClose,
  occurrenceId,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const { COLORS } = useTheme();

  const { handleMakeAComment } = useOccurrence();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormDataProps>({
    resolver: yupResolver(CreateACommentDialogSchema),
  });

  const handleResetForm = (): void => {
    reset({
      comment: "",
    });
  };

  const handleMakeACommentWithLoading = async (data: FormDataProps) => {
    try {
      setIsLoading(true);
      await handleMakeAComment(occurrenceId, data.comment);

      Alert.alert("Comentário publicado com sucesso.");

      handleResetForm();
      onClose();
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.data
        : "Ocorreu um erro ao tentar fazer o comentário.";

      Alert.alert(title);

      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog isVisible={isVisible} onBackdropPress={onClose}>
      <Dialog.Title title="Depoimento: " />
      <Controller
        control={control}
        name="comment"
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Digite seu comentário"
            onChangeText={onChange}
            value={value}
            errorMessage={errors.comment?.message}
            returnKeyType="send"
            onSubmitEditing={handleSubmit(handleMakeACommentWithLoading)}
          />
        )}
      />

      <View style={{ flexDirection: "row" }}>
        <Button
          title="Descartar"
          style={{ marginRight: 8, backgroundColor: COLORS.CANCELED }}
          onPress={() => {
            handleResetForm();
            onClose();
          }}
          disabled={isLoading}
        />

        <Button
          title="Publicar"
          onPress={handleSubmit(handleMakeACommentWithLoading)}
          isLoading={isLoading}
        />
      </View>
    </Dialog>
  );
};

export default CreateACommentDialog;
