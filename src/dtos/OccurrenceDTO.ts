import { OccurrenceStatusEnum } from "@/types";
import { UserDTO } from "./UserDTO";
import { CommentDTO } from "./CommentDTO";

export type OccurrenceDTO = {
  id: string;
  name: string;
  image: string;
  likes: string[];
  status: OccurrenceStatusEnum;
  date: Date;
  autor: UserDTO;
  description: string;
  comments: CommentDTO[];
};
