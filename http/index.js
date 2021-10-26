import { fetchProducts } from "./fetch.js";
import baseUrl from "./api.js";

export function getProducts() {
  return fetchProducts(`${baseUrl}/products.json`);
  /* return fetchProducts(`${baseUrl}/products`); */
}

export function getProductsByBrand(brand) {
  return fetchProducts(`${baseUrl}/products.json?brand=${brand}`);
  /* return fetchProducts(`${baseUrl}/products?brand=${brand}`); */
}

export function getProductsByCategory(category) {
  return fetchProducts(`${baseUrl}/products.json?category=${category}`);
  /* return fetchProducts(`${baseUrl}/products?category=${category}`); */
}
