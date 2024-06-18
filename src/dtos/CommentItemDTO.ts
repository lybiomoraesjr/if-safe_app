import { UserDTO } from "./UserDTO";

export type CommentItemDTO = {
  uuid: string;
  text: string;
  date: Date;
  author: UserDTO;
};
