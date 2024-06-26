import React, { useState } from "react";
import { Modal, TouchableWithoutFeedback } from "react-native";
import { ModalContainer, ModalContent } from "./PhotoPickerModal.styles";
import IconButton from "../IconButton";
import { Camera, Image, X } from "phosphor-react-native";
import { useTheme } from "styled-components/native";
import { usePhoto } from "@/hooks/usePhoto";
import { ChooseImageEnum } from "@/types/enums";
import Loading from "../Loading";

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

  const [isLoading, setIsLoading] = useState(false);

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
            {isLoading ? (
              <Loading />
            ) : (
              <>
                <IconButton
                  icon={Camera}
                  onPress={async () => {
                    setIsLoading(true);
                    await chooseImage(ChooseImageEnum.OPEN_CAMERA, caller);
                    onClose();
                    setIsLoading(false);
                  }}
                  iconColor={COLORS.BRAND_MID}
                  iconSize={32}
                />
                <IconButton
                  icon={Image}
                  onPress={async () => {
                    setIsLoading(true);
                    await chooseImage(ChooseImageEnum.OPEN_GALLERY, caller);
                    onClose();
                    setIsLoading(false);
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
              </>
            )}
          </ModalContent>
        </ModalContainer>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default PhotoPickerModal;
