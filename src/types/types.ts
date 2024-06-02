export enum OccurrenceStatus {
  UNSOLVED = "não solucionado",
  SOLVED = "solucionado",
  CANCELLED = "cancelado",
}

export type User = {
  uuid: string;
  name: string;
  imageUri?: string;
};

export type OccurrenceItem = {
  uuid: string;
  title: string;
  imageUri: string;
  notifiersIDs: string[];
  status: OccurrenceStatus;
  date: Date;
};

export type Comment = {
  uuid: string;
  content: string;
  date: Date;
  author: User;
};

export type OccurrenceDetails = OccurrenceItem & {
  description: string;
  author: User;
  comments: Comment[];
};