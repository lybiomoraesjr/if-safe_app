import { OccurrenceStatusEnum } from "@/types";

export type OccurrenceCardDTO = {
  _id: string;
  title: string;
  image: string;
  likes: string[];
  status: OccurrenceStatusEnum;
  date: Date;
};
