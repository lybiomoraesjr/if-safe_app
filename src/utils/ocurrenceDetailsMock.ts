import { OccurrenceDetails, OccurrenceStatus } from "../types/types";

export const ocurrenceDetailsMock: OccurrenceDetails = {
  uuid: "occurrenceId1",
  title: "Fio desencapado",
  imageUri:
    "https://i0.wp.com/www.horalivre.com.br/wp-content/uploads/2021/02/phb-para-4.jpg?fit=600%2C450&ssl=1",
  description: "descrição 1",
  notifiersIDs: ["userId2", "userId3"],
  status: OccurrenceStatus.UNSOLVED,
  author: {
    uuid: "userId1",
    name: "Lybio Moraes Junior",
  },
  date: new Date(),
};
