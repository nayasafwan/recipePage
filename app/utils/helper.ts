  /*Categories are all in upper case (because of enum type) */
  const formatCategory = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1).toLocaleLowerCase();
  }


export { formatCategory }