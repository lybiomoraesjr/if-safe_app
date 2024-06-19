import { OccurrenceStatusEnum } from "@/types";
import { UserDTO } from "./UserDTO";
import { CommentDTO } from "./CommentDTO";

export type OccurrenceDTO = {
  _id: string;
  title: string;
  image: string;
  likes: string[];
  status: OccurrenceStatusEnum;
  date: Date;
  author: UserDTO;
  description: string;
  comments: CommentDTO[];
};


