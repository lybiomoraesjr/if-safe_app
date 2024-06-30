import { OccurrenceStatusEnum } from "@/types";

export type OccurrenceCardDTO = {
  _id: string;
  title: string;
  image: string | null;
  likes: number;
  status: OccurrenceStatusEnum;
  date: Date;
};
