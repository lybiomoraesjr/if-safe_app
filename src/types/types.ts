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
  
  export type Occurrence = {
    uuid: string;
    title: string;
    imageUri: string;
    notifiersIDs: string[];
    status: OccurrenceStatus;
    date: Date;
  };
  
  export type OccurrenceDetails = Occurrence & {
    description: string;
    author: User;
  };
  