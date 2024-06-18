import { CommentItemDTO } from "./CommentItemDTO";
import { OccurrenceItemDTO } from "./OccurrenceItemDTO";

export type OccurrenceDetailDTO = OccurrenceItemDTO & {
  description: string;
  comments: CommentItemDTO[];
};
