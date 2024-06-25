import React, { useState } from "react";
import { Modal } from "react-native";
import { ModalContainer, ModalContent } from "./PhotoPickerModal.styles";

type GenericModalProps = {
  isVisible: boolean;
};

const PhotoPickerModal: React.FC<GenericModalProps> = (isVisible) => {
  const [modalActive, setModalActive] = useState(false);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalActive}
      onRequestClose={() => setModalActive(false)}
    >
      <ModalContainer>
        <ModalContent></ModalContent>
      </ModalContainer>
    </Modal>
  );
};

export default PhotoPickerModal;
