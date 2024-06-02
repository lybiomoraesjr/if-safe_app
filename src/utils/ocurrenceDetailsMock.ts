import { OccurrenceDetails, OccurrenceStatus } from "../types/types";

export const ocurrenceDetailsMock: OccurrenceDetails = {
  uuid: "occurrenceId1",
  title: "Fio desencapado",
  imageUri:
    "https://i0.wp.com/www.horalivre.com.br/wp-content/uploads/2021/02/phb-para-4.jpg?fit=600%2C450&ssl=1",
  description:
    "Fio desencapado no secador de mãos do banheiro masculino. Deu um choque em mim e em outro estudante.",
  notifiersIDs: ["userId2", "userId3"],
  status: OccurrenceStatus.UNSOLVED,
  author: {
    uuid: "userId1",
    name: "Lybio Moraes Junior",
  },
  date: new Date("2024-05-20T10:30:00"),
  comments: [
    {
      uuid: "commentId1",
      content: "Passei ontem e tomei um choque, muito perigoso",
      date: new Date(),
      author: {
        uuid: "userId2",
        name: "Thales Miranda dos Santos",
        imageUri:
          "https://www.save-free.com/cdn/https://instagram.fccm11-1.fna.fbcdn.net/v/t51.2885-19/274568729_917049325630882_5233696976206523807_n.jpg?_nc_ht=instagram.fccm11-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=my5EiGuM9JUQ7kNvgHexDaH&edm=AEF8tYYBAAAA&ccb=7-5&oh=00_AYBi-x7O6rGmNURCCowIMoL2-GsAnLlFpSTtjwQgsZJOOw&oe=66604DE3&_nc_sid=1e20d2",
      },
    },

    {
      uuid: "commentId2",
      content: "Passei ontem e tomei um choque, muito perigoso",
      date: new Date(),
      author: {
        uuid: "userId2",
        name: "Thales Miranda dos Santos",
        imageUri:
          "https://www.save-free.com/cdn/https://instagram.fccm11-1.fna.fbcdn.net/v/t51.2885-19/274568729_917049325630882_5233696976206523807_n.jpg?_nc_ht=instagram.fccm11-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=my5EiGuM9JUQ7kNvgHexDaH&edm=AEF8tYYBAAAA&ccb=7-5&oh=00_AYBi-x7O6rGmNURCCowIMoL2-GsAnLlFpSTtjwQgsZJOOw&oe=66604DE3&_nc_sid=1e20d2",
      },
    },

    {
      uuid: "commentId3",
      content: "Passei ontem e tomei um choque, muito perigoso",
      date: new Date(),
      author: {
        uuid: "userId2",
        name: "Thales Miranda dos Santos",
        imageUri:
          "https://www.save-free.com/cdn/https://instagram.fccm11-1.fna.fbcdn.net/v/t51.2885-19/274568729_917049325630882_5233696976206523807_n.jpg?_nc_ht=instagram.fccm11-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=my5EiGuM9JUQ7kNvgHexDaH&edm=AEF8tYYBAAAA&ccb=7-5&oh=00_AYBi-x7O6rGmNURCCowIMoL2-GsAnLlFpSTtjwQgsZJOOw&oe=66604DE3&_nc_sid=1e20d2",
      },
    },

    {
      uuid: "commentId4",
      content: "Passei ontem e tomei um choque, muito perigoso",
      date: new Date(),
      author: {
        uuid: "userId2",
        name: "Thales Miranda dos Santos",
        imageUri:
          "https://www.save-free.com/cdn/https://instagram.fccm11-1.fna.fbcdn.net/v/t51.2885-19/274568729_917049325630882_5233696976206523807_n.jpg?_nc_ht=instagram.fccm11-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=my5EiGuM9JUQ7kNvgHexDaH&edm=AEF8tYYBAAAA&ccb=7-5&oh=00_AYBi-x7O6rGmNURCCowIMoL2-GsAnLlFpSTtjwQgsZJOOw&oe=66604DE3&_nc_sid=1e20d2",
      },
    },
  ],
};
