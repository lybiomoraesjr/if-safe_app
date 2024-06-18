import { OccurrenceStatusEnum } from "@/types";
import { UserDTO } from "./UserDTO";

export type OccurrenceItemDTO = {
  id: string;
  name: string;
  image: string;
  likes: string[];
  status: OccurrenceStatusEnum;
  date: Date;
  autor: UserDTO;
};
