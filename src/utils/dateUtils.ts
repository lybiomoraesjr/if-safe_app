export const formattedDate = (date: Date): string => {
  return date.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
};
