export const formateDate = (date: Date) => {
  return new Date(date).toLocaleDateString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};
