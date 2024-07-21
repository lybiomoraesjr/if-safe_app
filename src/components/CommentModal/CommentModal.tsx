import Input from "../Input";
import Button from "../Button";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { HStack, Icon, Modal } from "@gluestack-ui/themed";
import { ModalBackdrop } from "@gluestack-ui/themed";
import { ModalContent } from "@gluestack-ui/themed";
import { ModalHeader } from "@gluestack-ui/themed";
import { Heading } from "@gluestack-ui/themed";
import { ModalCloseButton } from "@gluestack-ui/themed";
import { X } from "phosphor-react-native";
import { ModalBody } from "@gluestack-ui/themed";
import { ModalFooter } from "@gluestack-ui/themed";

type CommentModalProps = {
  showModal: boolean;
  closeModal: () => void;
  occurrenceId: string;
  onInteraction: (comment: string) => Promise<void>;
};

type FormDataProps = {
  comment: string;
};

const CreateACommentDialogSchema = yup.object({
  comment: yup.string().required("Digite um comentário."),
});

const CommentModal: React.FC<CommentModalProps> = ({
  showModal,
  closeModal,
  onInteraction,
}) => {
  const [isLoading, setIsLoading] = useState(false);

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
      closeModal();
    } catch (error) {
      setIsLoading(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  const ref = React.useRef(null);
  return (
    <Modal isOpen={showModal} onClose={closeModal} finalFocusRef={ref}>
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg">Comentário:</Heading>

          <ModalCloseButton>
            <Icon as={X} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
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
        </ModalBody>

        <ModalFooter>
          <HStack gap="$4">
            <Button
              title="Descartar"
              onPress={() => {
                handleResetForm();
                closeModal();
              }}
              disabled={isLoading}
              bg="$canceled"
              $active-backgroundColor="$red300"
              w="$7/15"
            />

            <Button
              title="Publicar"
              onPress={handleSubmit(handleMakeACommentWithLoading)}
              isLoading={isLoading}
              w="$7/15"
            />
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CommentModal;
