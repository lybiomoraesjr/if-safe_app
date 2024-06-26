import React from "react";
import { Modal, TouchableWithoutFeedback } from "react-native";
import { ModalContainer, ModalContent } from "./PhotoPickerModal.styles";
import IconButton from "../IconButton";
import { Camera, Image, X } from "phosphor-react-native";
import { useTheme } from "styled-components/native";
import { usePhoto } from "@/hooks/usePhoto";
import { ChooseImageEnum } from "@/types/enums";

type PhotoPickerModalProps = {
  isVisible: boolean;
  caller: string;
  onClose: () => void;
};

const PhotoPickerModal: React.FC<PhotoPickerModalProps> = ({
  isVisible,
  caller,
  onClose,
}) => {
  const { COLORS } = useTheme();
  const { chooseImage } = usePhoto();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <ModalContainer>
          <ModalContent>
            <IconButton
              icon={Camera}
              onPress={async () => {
                await chooseImage(ChooseImageEnum.OPEN_CAMERA, caller);
                onClose();
              }}
              iconColor={COLORS.BRAND_MID}
              iconSize={32}
            />
            <IconButton
              icon={Image}
              onPress={async () => {
                await chooseImage(ChooseImageEnum.OPEN_GALLERY, caller);
                onClose();
              }}
              iconColor={COLORS.BRAND_MID}
              iconSize={32}
            />
            <IconButton
              icon={X}
              onPress={onClose}
              iconColor={COLORS.BRAND_MID}
              iconSize={32}
            />
          </ModalContent>
        </ModalContainer>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default PhotoPickerModal;
