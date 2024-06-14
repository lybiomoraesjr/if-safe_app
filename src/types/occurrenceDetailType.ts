import { CommentItemType } from "./commentItemType";
import { OccurrenceItemType } from "./occurrenceItemType";

export type OccurrenceDetailType = OccurrenceItemType & {
  description: string;
  comments: CommentItemType[];
};
