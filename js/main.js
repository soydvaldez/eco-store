let $productSection = document.querySelectorAll(".card-section.click-listener");

let isSelectedACard = false;
let $currentElementSelected = null;
let selectedProductCard = null;

function disableScrolling() {
  document.body.classList.toggle("disable-scroll");
}

async function handlerClickEvent(e) {
  let $productSection = this;
  let containerListener = e.currentTarget;
  let imgProductClick = e.target;

  function searchElementDOM(productId) {
    console.log("buscando producto en el DOM: " + productId);

    for (let child of $productSection.children) {
      if (
        child.hasAttribute("product") &&
        child.getAttribute("product") === productId
      ) {
        $currentElementSelected = child;
      }
    }
  }

  if (
    containerListener.classList.contains("card-section") &&
    imgProductClick.hasAttribute("product")
  ) {
    let productId = e.target.getAttribute("product");
    // Busca elemento en el DOM:
    // searchElementDOM(productId);
    selectedProductCard = await getById(productId);
    renderProductDetails();
  }
}

function print() {
  if ($currentElementSelected) {
    console.log($currentElementSelected);
  } else {
    console.log("Actualmente no existe un elemento seleccionado");
  }
}

function renderProductDetails() {
  //Existe un modal abierto: si-cierralo y crea otro
  if (document.querySelector('[modal="product-details"]')) {
    document.querySelector('[modal="product-details"]').remove();
  }

  if (!selectedProductCard) {
    return null;
  }

  let element = document.createElement("div");
  element.setAttribute("modal", "product-details");
  element.setAttribute("open", "");
  element.classList.add("modal");
  element.innerHTML = `<div class="container-product-details">
        ${JSON.stringify(selectedProductCard)}
    </div>`;
  element.style.color = "#000";
  document.body.appendChild(element);
  disableScrolling();
}

//Secciones productos
$productSection[0].addEventListener("click", handlerClickEvent);
$productSection[1].addEventListener("click", handlerClickEvent);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    //Esta abierto un modal?
    if (
      document.querySelector(`[modal="product-details"]`).hasAttribute("open")
    ) {
      document.querySelector(`[modal="product-details"]`).remove();
      disableScrolling();
    }
  }
});

// Necesito que emita el evento

// selectedElement isSelectedElement
