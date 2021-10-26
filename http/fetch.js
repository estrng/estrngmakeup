export function fetchProducts(url, options) {
  return fetch(url, options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Request failed!");
      }
    })
    .catch((error) => {
      showError("Something went wrong.", error);
      throw error;
    });
}

export function showError(message, error) {
  document.getElementById("errors").textContent = message;
  if (error) {
    console.error(error);
  }
}
