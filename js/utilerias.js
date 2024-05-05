// Manejadores de eventos
function handlerSubmit(event) {
  // event.preventDefault();
  
  handlerLoader();
  setTimeout((e) => handlerLoader(), 2000);

  let formData = new FormData(document.forms[0]);

  //Maneja las respuesta de red y la respuesta HTTP del servidor:
  let serverResponse = fetch("http://localhost:3000/users", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(formDataAsAJson()), // body: new FormData(document.forms[0])
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .catch((err) => {
      let reasonError = "";

      if (err.message && err.message === "Failed to fetch") {
        reasonError = "Error: net::ERR_CONNECTION_REFUSED";
      }

      if (err.status >= 400 && err.status <= 499) {
        let logError = `HTTP status ${err.status} Bad Request: client Side Error.`;
        console.error(logError);
      }

      if (err.status >= 500 && err.status <= 599) {
        let logError = {
          message: `HTTP status ${err.status} Internal Server Error`,
          details: `Server Side Error`,
        };
        console.error(logError);
      }

      return Promise.reject(reasonError);
    });

  // Maneja los datos extraidos de la respuesta HTTP del servidor:
  serverResponse
    .then((data) => {
      console.log(data);
      //Manda a llamar a una capa superior
    })
    .catch((err) => {
      console.error("Algo salio mal a recuperar los datos.");
    });
}

function formDataAsAJson() {
  return Object.fromEntries(new FormData(document.forms[0]));
}

function requestToServer() {
  document.forms[0].addEventListener("submit", handlerSubmit);
  document.forms[0].dispatchEvent(new Event("submit"));
}

function handlerLoader() {
  let $loader = document.querySelector(".loader-container");
  $loader.classList.toggle("hidden");
}
