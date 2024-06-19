import { UserDTO } from "./UserDTO";

export type CommentDTO = {
  uuid: string;
  text: string;
  date: Date;
  author: UserDTO;
};
