import { factor } from "./factor.js";

export const capitalize = (str) => {
  if (typeof str !== "string") {
    return "";
  }
  return str.charAt(0).toUpperCase() + str.substr(1);
};

export const factorPrice = (price) => {
  if (typeof price !== "number") {
    return 0;
  }
  return price * factor;
};

export const formatPrice = (price) => {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const priceFormatted = formatter.format(price);

  return priceFormatted;
};
