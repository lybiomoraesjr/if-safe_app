import { CommentDTO } from "@/dtos/CommentDTO";
import CommentCard from "../CommentCard";
import {
  Heading,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ScrollView,
} from "@gluestack-ui/themed";
import { ModalContent } from "@gluestack-ui/themed";
import { X } from "phosphor-react-native";
import React from "react";
import { ModalBackdrop } from "@gluestack-ui/themed";

type CommentListModalProps = {
  showModal: boolean;
  comments: CommentDTO[];
  closeModal: () => void;
};

const CommentListModal: React.FC<CommentListModalProps> = ({
  comments,
  showModal,
  closeModal,
}) => {
  const ref = React.useRef(null);

  return (
    <Modal isOpen={showModal} onClose={closeModal} finalFocusRef={ref}>
      <ModalBackdrop />
      <ModalContent maxHeight={"$96"}>
        <ModalHeader>
          <Heading size="lg">Comentários</Heading>
          <ModalCloseButton>
            <Icon as={X} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <ScrollView>
            {comments.map((comment) => (
              <CommentCard
                key={comment.commentId}
                name={comment.userName}
                text={comment.comment}
                date={comment.commentDate}
              />
            ))}
          </ScrollView>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CommentListModal;
