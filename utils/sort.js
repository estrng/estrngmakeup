export const sortByRating = (array) => {
  return array.sort(function (a, b) {
    return b.rating - a.rating;
  });
};

export const sortByBrand = (array) => {
  return array.sort(function (a, b) {
    if (a.brand < b.brand) {
      return -1;
    }
    if (a.brand > b.brand) {
      return 1;
    }
    return 0;
  });
};

export const filterElements = (array) => {
  var filteredElements = array.filter(function (el, i) {
    return array.indexOf(el) === i;
  });

  return filteredElements;
};

export const getBrands = (array) => {
  const brands = array.map((product) => product.brand);

  return filterElements(brands);
};

export const getCategory = (array) => {
  const category = array.map((product) => product.category);

  return filterElements(category);
};

export const sortByLowestPrice = (array) => {
  return array.sort(function (a, b) {
    return a.price - b.price;
  });
};

export const sortByHighestPrice = (array) => {
  return array.sort(function (a, b) {
    return b.price - a.price;
  });
};

export const sortByNameAZ = (array) => {
  return array.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
};

export const sortByNameZA = (array) => {
  return array.sort(function (a, b) {
    if (a.name > b.name) {
      return -1;
    }
    if (a.name < b.name) {
      return 1;
    }
    return 0;
  });
};

export const filterByName = (array, value) => {
  return array.filter((product) =>
    String(product.name).toLowerCase().includes(String(value).toLowerCase())
  );
};
