import { OccurrenceItem, OccurrenceStatus } from "../types";

export const occurencesMock: OccurrenceItem[] = [
  {
    uuid: "occurrenceId1",
    title: "Fio desencapado",
    imageUri:
      "https://i0.wp.com/www.horalivre.com.br/wp-content/uploads/2021/02/phb-para-4.jpg?fit=600%2C450&ssl=1",
    notifiersIDs: [
      "userId2",
      "userId3",
      "userId4",
      "userId5",
      "userId6",
      "userId10",
    ],
    status: OccurrenceStatus.UNSOLVED,
    date: new Date("2024-05-20T10:30:00"),
  },

  {
    uuid: "occurrenceId4",
    title: "Vazamento de água",
    imageUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLRErxGpWLEsAUfKq9GmcjZI8UczVRVxKiXA&s",
    notifiersIDs: ["userId3", "userId6", "userId4", "userId9"],
    status: OccurrenceStatus.SOLVED,
    date: new Date("2024-05-17T12:00:00"),
  },

  {
    uuid: "occurrenceId2",
    title: "Mesa danificada",
    imageUri:
      "https://www.mpma.mp.br/arquivos/COCOM/imagens/2016/SETEMBRO/EUSEBIO_CARTEIRA_QUEBRADA_REDUZIDA.jpg",
    notifiersIDs: ["userId5", "userId8"],
    status: OccurrenceStatus.UNSOLVED,
    date: new Date("2024-05-18T14:45:00"),
  },

  {
    uuid: "occurrenceId7",
    title: "Lâmpada queimada",
    imageUri: "https://app.tcm.rj.gov.br/SED/81/mini/F_62920.jpg",
    notifiersIDs: ["userId8", "userId12"],
    status: OccurrenceStatus.UNSOLVED,
    date: new Date("2024-05-23T07:00:00"),
  },

  {
    uuid: "occurrenceId5",
    title: "Vaso sanitário entupido",
    imageUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEYOMikoMMGTkUzT6YvGcXutQDILy3zs-nUPqIzPxG3LCY4TupLylSi95tI9KYQ_aWvX4&usqp=CAU",
    notifiersIDs: ["userId4", "userId9", "userId11", "userId1"],
    status: OccurrenceStatus.SOLVED,
    date: new Date("2024-05-21T08:30:00"),
  },

  {
    uuid: "occurrenceId6",
    title: "Lousa manchada",
    imageUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEAoR6aAvmFOhlkvGHb3EGUvhWjUjnXzWzrA&s",
    notifiersIDs: ["userId2", "userId5"],
    status: OccurrenceStatus.CANCELLED,
    date: new Date("2024-05-22T11:15:00"),
  },
  {
    uuid: "occurrenceId3",
    title: "Lixo acumulado",
    imageUri:
      "https://conexaoplaneta.com.br/wp-content/uploads/2017/07/artista-mostra-resultado-4-anos-lixo-acumulado-9-conexao-planeta.jpg",
    notifiersIDs: ["userId1", "userId7", "userId10"],
    status: OccurrenceStatus.CANCELLED,
    date: new Date("2024-05-19T09:00:00"),
  },
];
