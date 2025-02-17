/*Categories are all in upper case (because of enum type) */
const formatCategory = (category: string) => {
  return (
    category.charAt(0).toUpperCase() + category.slice(1).toLocaleLowerCase()
  );
};

const formatDate = (date: string) => {
  const newDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  return new Intl.DateTimeFormat("en-GB", options).format(newDate);
}

export { formatCategory, formatDate };
