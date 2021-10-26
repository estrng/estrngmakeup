import {
  getProducts,
  getProductsByBrand,
  getProductsByCategory,
} from "../http/index.js";
import { capitalize, factorPrice, formatPrice } from "../utils/format.js";
import {
  sortByRating,
  getBrands,
  getCategory,
  sortByLowestPrice,
  sortByHighestPrice,
  sortByNameAZ,
  sortByNameZA,
  filterByName,
} from "../utils/sort.js";

let products = [];
let sortedProducts = [];
let allBrands = [];
let allCategory = [];
let productsByBrand = [];
let productsByCategory = [];

const listEl = document.querySelector("#list");
const brandSelector = document.querySelector("#brand");
const categorySelector = document.querySelector("#category");
const ratingFilter = document.querySelector("#rating");
const searchInput = document.querySelector("#search");
const h2 = document.querySelector("#loading");

async function init() {
  /* h2.innerText = "Loading...";
  listEl.appendChild(h2);
 */
  products = await getProducts();
  sortedProducts = sortByRating(products);
  allBrands = getBrands(sortedProducts);
  allCategory = getCategory(sortedProducts);

  renderData(sortedProducts);
  renderBrandFilter();
  renderCategoryFilter();
}

init();

function renderData(array) {
  console.log(array.length);
  /* const h2 = document.querySelector("#loading");
  listEl.removeChild(h2); */

  array.forEach((product) => {
    //card
    const card = document.createElement("div");
    card.classList.add("product");

    //image
    const img = document.createElement("img");
    img.classList.add("product-image");
    img.src = product.api_featured_image
      ? product.api_featured_image
      : "../assets/images/unavailable.png";
    img.alt = product.name;
    card.appendChild(img);

    //product info
    const info = document.createElement("div");
    info.classList.add("product-info");
    card.appendChild(info);

    //title
    const title = document.createElement("h3");
    title.classList.add("product-title");
    title.innerText = product.name;
    info.appendChild(title);

    //brading
    const brand = document.createElement("p");
    brand.classList.add("product-brand");
    brand.innerText = product.brand ? capitalize(product.brand) : product.name;
    info.appendChild(brand);

    //rating
    const rating = document.createElement("div");
    rating.classList.add("product-rating");
    info.appendChild(rating);

    //stars
    for (let i = 0; i < product.rating; i++) {
      const stars = document.createElement("i");
      stars.classList.add("fa", "fa-star");
      stars.style.color = "gold";
      rating.appendChild(stars);
    }

    //price
    const price = document.createElement("p");
    price.classList.add("product-price");
    price.innerText = String(formatPrice(factorPrice(Number(product.price))));
    info.appendChild(price);

    const moreInfo = document.createElement("div");
    moreInfo.setAttribute("id", "more-info");
    moreInfo.classList.add("product-more-info");
    moreInfo.textContent = `More Info`;
    info.appendChild(moreInfo);

    const productDetails = renderProductsDetails(product);
    card.appendChild(productDetails);

    listEl.appendChild(card);
  }, this);
}

function renderProductsDetails(item) {
  const details = document.createElement("div");
  details.classList.add("product-details");

  const labelsContainer = document.createElement("div");
  labelsContainer.classList.add("product-details-labels");
  details.appendChild(labelsContainer);

  const brandLabel = document.createElement("p");
  brandLabel.classList.add("product-details-label");
  brandLabel.innerText = "Brand: ";
  labelsContainer.appendChild(brandLabel);

  const priceLabel = document.createElement("p");
  priceLabel.classList.add("product-details-label");
  priceLabel.innerText = "Price: ";
  labelsContainer.appendChild(priceLabel);

  const ratingLabel = document.createElement("p");
  ratingLabel.classList.add("product-details-label");
  ratingLabel.innerText = "Rating: ";
  labelsContainer.appendChild(ratingLabel);

  const categoryLabel = document.createElement("p");
  categoryLabel.classList.add("product-details-label");
  categoryLabel.innerText = "Category: ";
  labelsContainer.appendChild(categoryLabel);

  const typeLabel = document.createElement("p");
  typeLabel.classList.add("product-details-label");
  typeLabel.innerText = "Type: ";
  labelsContainer.appendChild(typeLabel);

  const detailsContainer = document.createElement("div");
  detailsContainer.classList.add("product-details-details");
  details.appendChild(detailsContainer);

  const brandDetail = document.createElement("p");
  brandDetail.classList.add("product-brand-detail");
  brandDetail.innerText = item.brand ? capitalize(item.brand) : item.name;
  detailsContainer.appendChild(brandDetail);

  const priceDetail = document.createElement("p");
  priceDetail.classList.add("product-price-detail");
  priceDetail.innerText = String(formatPrice(factorPrice(Number(item.price))));
  detailsContainer.appendChild(priceDetail);

  const ratingDetail = document.createElement("p");
  ratingDetail.classList.add("product-rating-detail");
  ratingDetail.innerText = String(item.rating);
  detailsContainer.appendChild(ratingDetail);

  const categoryDetail = document.createElement("p");
  categoryDetail.classList.add("product-category-detail");
  categoryDetail.innerText = item.category
    ? capitalize(item.category)
    : "No category";
  detailsContainer.appendChild(categoryDetail);

  const typeDetail = document.createElement("p");
  typeDetail.classList.add("product-type-detail");
  typeDetail.innerText = capitalize(item.product_type);
  detailsContainer.appendChild(typeDetail);

  return details;
}

function renderBrandFilter() {
  allBrands.forEach((brand) => {
    const option = document.createElement("option");
    option.innerText = brand ? capitalize(brand) : "No brand";
    brandSelector.appendChild(option);
  });
}

function renderCategoryFilter() {
  allCategory.forEach((category) => {
    const option = document.createElement("option");
    option.innerText = category ? capitalize(category) : "No category";
    categorySelector.appendChild(option);
  });
}

ratingFilter.addEventListener("change", (e) => {
  const { value } = e.target;

  switch (value) {
    case "Good Ones":
      listEl.innerHTML = "";
      /* renderData(sortByRating(products)); */
      init();
      break;
    case "Very Cheap":
      listEl.innerHTML = "";
      renderData(sortByLowestPrice(products));
      break;
    case "Expensive":
      listEl.innerHTML = "";
      renderData(sortByHighestPrice(products));
      break;
    case "A-Z":
      listEl.innerHTML = "";
      renderData(sortByNameAZ(products));
      break;
    case "Z-A":
      listEl.innerHTML = "";
      renderData(sortByNameZA(products));
    default:
      listEl.innerHTML = "";
      renderData(sortByRating(products));
      break;
  }
});

async function filterByBrand(value) {
  listEl.innerHTML = "";
  productsByBrand = await getProductsByBrand(value);
  renderData(productsByBrand);
}

brandSelector.addEventListener("change", (e) => {
  const { value } = e.target;
  listEl.innerHTML = "";
  if (value === "All") init();
  filterByBrand(String(value).toLowerCase());
});

async function filterByCategory(value) {
  listEl.innerHTML = "";
  productsByCategory = await getProductsByCategory(value);
  renderData(productsByCategory);
}

categorySelector.addEventListener("change", (e) => {
  const { value } = e.target;
  listEl.innerHTML = "";
  if (value === "All") init();
  filterByCategory(String(value).toLowerCase());
});

searchInput.addEventListener("input", (e) => {
  const { value } = e.target;
  listEl.innerHTML = "";
  if (value === "") init();
  renderData(filterByName(products, value));
});
