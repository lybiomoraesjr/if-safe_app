import React, { useState, useRef } from "react";
import IconButton from "../IconButton";
import { Camera, Image, X } from "phosphor-react-native";
import { usePhoto } from "@/hooks/usePhoto";
import { ChooseImageEnum } from "@/types/enums";
import Loading from "../Loading";
import {
  HStack,
  Icon,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  Heading,
  ModalContent,
} from "@gluestack-ui/themed";

type PhotoPickerModalProps = {
  showModal: boolean;
  caller: string;
  closeModal: () => void;
};

const PhotoPickerModal: React.FC<PhotoPickerModalProps> = ({
  showModal,
  caller,
  closeModal,
}) => {
  const { chooseImage } = usePhoto();
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef(null);

  return (
    <Modal isOpen={showModal} onClose={closeModal} finalFocusRef={ref}>
      <ModalBackdrop />
      <ModalContent>
        {!isLoading && (
          <ModalHeader>
            <Heading size="lg">Escolher Foto</Heading>
            <ModalCloseButton>
              <Icon as={X} />
            </ModalCloseButton>
          </ModalHeader>
        )}
        <ModalBody>
          {isLoading ? (
            <Loading bgColor="transparent" />
          ) : (
            <HStack gap="$2">
              <IconButton
                icon={Camera}
                onPress={async () => {
                  setIsLoading(true);
                  await chooseImage(ChooseImageEnum.OPEN_CAMERA, caller);
                  closeModal();
                  setIsLoading(false);
                }}
              />
              <IconButton
                icon={Image}
                onPress={async () => {
                  setIsLoading(true);
                  await chooseImage(ChooseImageEnum.OPEN_GALLERY, caller);
                  closeModal();
                  setIsLoading(false);
                }}
              />
            </HStack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PhotoPickerModal;
