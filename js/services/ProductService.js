function getAll() {
  const options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  };
  // https://soydvaldez.github.io/eco-store
  //   return fetch("http://localhost:3000/users", options)
  return fetch("/eco-store/js/data/products.json", options)
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

// Maneja los datos extraidos de la respuesta HTTP del servidor:
function renderProducts() {
  getAll()
    .then((data) => {
      let element = document.createElement("div");
      element.classList.add("modal");
      element.innerHTML = `<div class="container-product-details">
        ${JSON.stringify(data.products[0])}
    </div>`;
      element.style.color = "#000";
      document.body.appendChild(element);
    })
    .catch((err) => {
      let element = document.createElement("div");
      element.classList.add("modal");
      element.innerHTML = `${err}`;
      element.style.color = "#FFF";
      document.body.appendChild(element);
    });
}
