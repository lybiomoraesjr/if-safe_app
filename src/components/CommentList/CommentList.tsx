import React from "react";
import { FlatList } from "react-native";
import { Container } from "./CommentList.styles";
import CommentItem from "../CommentItem/CommentItem";
import { Comment } from "../../types";

type CommentListProps = {
  comments: Comment[];
};

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <Container>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.uuid}
        renderItem={({ item }) => (
          <CommentItem
            imageUri={item.author.imageUri}
            name={item.author.name}
            date={item.date}
            content={item.content}
          />
        )}
      />
    </Container>
  );
};

export default CommentList;
