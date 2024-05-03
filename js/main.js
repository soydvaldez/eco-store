let $productSection = document.querySelector(".card-section.click-listener");

let isSelectedACard = false;
let $nodeElementSelected = null;

function handlerClickEvent(e) {
  let childFinded = null;
  let containerListener = e.currentTarget;
  let imgProductClick = e.target;

  if (
    containerListener.tagName === "DIV" &&
    containerListener.classList.contains("card-section") &&
    imgProductClick.hasAttribute("product")
  ) {
    let productId = e.target.getAttribute("product");
    // Busca elemento en el DOM:
    console.log(imgProductClick);

    searchElementDOM(productId);
  } else {
    return;
  }

  function searchElementDOM(productId) {
    console.log("buscando producto en el DOM: " + productId);

    for (let child of $productSection.children) {
      if (
        child.hasAttribute("product") &&
        child.getAttribute("product") === productId
      ) {
        $nodeElementSelected = child;
      }
    }
  }
}

function print() {
  if ($nodeElementSelected) {
    console.log($nodeElementSelected);
  } else {
    console.log("Actualmente no existe un elemento seleccionado");
  }
}

$productSection.addEventListener("click", handlerClickEvent);

// Necesito que emita el evento

// selectedElement isSelectedElement
