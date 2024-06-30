import { OccurrenceStatusEnum } from "@/types";

export type OccurrenceCardDTO = {
  _id: string;
  title: string;
<<<<<<< HEAD
  image: string;
=======
  image: string | null;
>>>>>>> c460832dc00e6a6ff13bb077bda454cb8afd6dbe
  likes: number;
  status: OccurrenceStatusEnum;
  date: Date;
};
