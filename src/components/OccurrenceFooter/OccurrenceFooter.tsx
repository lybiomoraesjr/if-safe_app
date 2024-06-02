import { Divider } from "@rneui/base";
import { ChatCircle, Warning } from "phosphor-react-native";
import { View, Text } from "react-native";
import { Input } from "@rneui/themed";
import { Comment } from "../../types";
import CommentList from "../CommentList";

type OccurrenceDetailsFooterProps = {
  notifiersNumber: number;
  commentsNumber: number;
  comments: Comment[];
};

const OccurrenceDetailsFooter: React.FC<OccurrenceDetailsFooterProps> = ({
  notifiersNumber,
  commentsNumber,
  comments,
}) => {
  return (
    <View>
      <Divider style={{ margin: 18 }} />

      <View style={{ flexDirection: "row" }}>
        <View style={{ flexDirection: "row" }}>
          <Warning size={16} />
          <Text>{notifiersNumber}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <ChatCircle size={16} />
          <Text>{commentsNumber}</Text>
        </View>
      </View>

      <Divider style={{ margin: 18 }} />

      <Input
        placeholder="Comment"
        leftIcon={{ type: "font-awesome", name: "comment" }}
      />

      <CommentList comments={comments} />

      <Divider style={{ margin: 18 }} />
    </View>
  );
};

export default OccurrenceDetailsFooter;
