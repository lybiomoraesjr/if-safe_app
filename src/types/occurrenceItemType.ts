import { OccurrenceStatusEnum } from "./enums";
import { UserType } from "./userType";

export type OccurrenceItemType = {
  uuid: string;
  title: string;
  imageUri: string;
  notifiersIDs: string[];
  status: OccurrenceStatusEnum;
  date: Date;
  author: UserType;
};
