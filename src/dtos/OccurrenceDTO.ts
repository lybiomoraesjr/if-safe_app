import { OccurrenceCardDTO } from "./OccurrenceCardDTO";

export type OccurrenceDTO = OccurrenceCardDTO & {
  description: string;
  authorId: string;
  authorName: string;
  authorAvatar: string | null;
  location: string;
};
