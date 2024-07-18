import { OccurrenceCardDTO } from "./OccurrenceCardDTO";

export type OccurrenceDTO = OccurrenceCardDTO & {
  description: string;
  authorId: string;
  authorName: string;
  location: string;
};
