import { CommentDTO } from "./CommentDTO";

export type OccurrenceDTO = {
  authorId: string;
  date: string;
  authorName: string;
  likes: string[];
  description: string;
  image: string;
  comments: CommentDTO[];
  authorAvatar: string;
  title: string;
  status: string;
};
