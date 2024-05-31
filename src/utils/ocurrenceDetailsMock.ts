import { OccurrenceDetails, OccurrenceStatus } from "../types/types";

export const ocurrenceDetailsMock: OccurrenceDetails = {
  uuid: "occurrenceId1",
  title: "Fio desencapado",
  imageUri:
    "https://i0.wp.com/www.horalivre.com.br/wp-content/uploads/2021/02/phb-para-4.jpg?fit=600%2C450&ssl=1",
  description: "Fio desencapado no secador de mãos do banheiro masculino. Deu um choque em mim e em outro estudante.",
  notifiersIDs: ["userId2", "userId3"],
  status: OccurrenceStatus.UNSOLVED,
  author: {
    uuid: "userId1",
    name: "Lybio Moraes Junior",
  },
  date: new Date(),
};
