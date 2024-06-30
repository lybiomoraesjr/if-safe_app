import { CommentDTO } from "./CommentDTO";
import { OccurrenceCardDTO } from "./OccurrenceCardDTO";

export type OccurrenceDTO = OccurrenceCardDTO & {
  description: string;
  authorId: string;
  authorName: string;
  comments: CommentDTO[];
  authorAvatar: string | null;
  location: string;
};
