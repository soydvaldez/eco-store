function getAll() {
  const options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  };
  
  // return fetch("/eco-store/js/data/products.json", options)
  return fetch("/js/data/products.json", options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject({
          message: response.statusText,
          statusHTTP: response.status,
        });
      }
    })
    .then((data) => {
      return data.products;
    })
    .catch((err) => {
      if (err.message === "Failed to fetch") {
        console.log("message: error. caused by: net::ERR_CONNECTION_REFUSED");
      }

      if (err.statusHTTP >= 400 && err.statusHTTP <= 499) {
        // console.log("errores del cliente");
        console.log("message: error. caused by: bad request");
      }

      if (err.statusHTTP >= 500 && err.statusHTTP <= 599) {
        // console.log("errores del servidor");
        console.log("message: error. caused by: Internal Server Error");
      }
      throw new Error("failed to retrieve data");
    });
}

async function getById(productIdTofilter) {
  try {
    let products = await getAll();
    return products.filter((prod) => prod.id === productIdTofilter)[0] || null;
  } catch (error) {
    console.log(error);
  }
}

//throw new Error("failed to retrieve data");


