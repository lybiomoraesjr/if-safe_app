import { OccurrenceStatusEnum } from "@/types";
import { CommentDTO } from "./CommentDTO";

export type OccurrenceCardDTO = {
  _id: string;
  title: string;
  image: string | null;
  likes: number;
  status: OccurrenceStatusEnum;
  comments: CommentDTO[];
  date: Date;
};
