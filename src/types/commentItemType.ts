import { UserType } from "./userType";

export type CommentItemType = {
    uuid: string;
    text: string;
    date: Date;
    author: UserType;
  };