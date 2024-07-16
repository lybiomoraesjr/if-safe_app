import { Dialog } from "@rneui/themed";
import Input from "../Input";
import Button from "../Button";
import { Alert, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { AppError } from "@/utils/AppError";
import { useTheme } from "styled-components";

type CommentDialogProps = {
  isVisible: boolean;
  onClose: () => void;
  occurrenceId: string;
  onInteraction: (comment: string) => Promise<void>;
};

type FormDataProps = {
  comment: string;
};

const CreateACommentDialogSchema = yup.object({
  comment: yup.string().required("Digite um comentário."),
});

const CommentDialog: React.FC<CommentDialogProps> = ({
  isVisible,
  onClose,
  onInteraction,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const { COLORS } = useTheme();

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

  const handleMakeACommentWithLoading = async ({ comment }: FormDataProps) => {
    try {
      setIsLoading(true);
      await onInteraction(comment);

      handleResetForm();
      onClose();
    } catch (error) {
      setIsLoading(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog isVisible={isVisible} onBackdropPress={onClose}>
      <Dialog.Title title="Comentário: " />
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

export default CommentDialog;
