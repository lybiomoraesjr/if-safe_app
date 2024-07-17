import { CommentDTO } from "@/dtos/CommentDTO";
import { Dialog } from "@rneui/themed";
import CommentCard from "../CommentCard";
import { ScrollView } from "react-native";

type CommentsListDialogProps = {
  isVisible: boolean;
  onClose: () => void;
  comments: CommentDTO[];
};

const CommentListDialog: React.FC<CommentsListDialogProps> = ({
  comments,
  isVisible,
  onClose,
}) => {
  return (
    <Dialog isVisible={isVisible} onBackdropPress={onClose}>
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
    </Dialog>
  );
};

export default CommentListDialog;
