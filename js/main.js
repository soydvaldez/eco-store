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
  document.body.querySelector(".modal.product-details").classList.remove("hidden");
  //Existe un modal abierto: si-cierralo y crea otro
  // if (document.querySelector('[modal="product-details"]')) {
  //   document.querySelector('[modal="product-details"]').remove();
  // }

  // if (!selectedProductCard) {
  //   return null;
  // }
  console.log(selectedProductCard);

  let $header = document.body.querySelector(".header-product-details");

  function setHeaderDetails(category) {
    switch (category) {
      case "healthcare":
        return "Cuidado de la salud";
      case "furniture":
        return "Decoracion del Hogar";
    }
  }

  $header.innerHTML = `<h1>${setHeaderDetails(
    selectedProductCard.category
  )}</h1>
  <button onclick="closedElement('product-details')">
      <i modal="close-detail-product" class="fa-solid fa-xmark"></i>
  </button>`;

  let $flexWrap = document.body.querySelector(".flex-wrap");
  $flexWrap.innerHTML = `<div class="product-img-actions">
  <h2>${selectedProductCard.name}</h2>
  <img src="${selectedProductCard.imgs}" alt="">
  <span class="price">$${selectedProductCard.price} MXN</span>
  <div class="container-collapsible">
      <div class="collapsible description">
          <button>Descripcion</button>
          <i class="fa-solid fa-angle-down"></i>
      </div>
      <div class="content description" style="max-height: 150px;">
          <p>${selectedProductCard.description}</p>
      </div>
  </div>
  <div class="actions">
      <button action="addToCart" class="button-product">
          <i class="fa-solid fa-cart-shopping"></i>
          <span>Agregar al carrito</span>
      </button>
      <button action="addToWishList" class="button-product">
          <i class="fa-solid fa-heart"></i>
          <span>Agregar a la lista de deseos</span>
      </button>
  </div>
</div>
<div class="container-caracteristicas">
  <div class="product-details"
      style="display: flex; flex-direction: column; height: auto;overflow: scroll;">
      <div class="container-collapsible">
          <div class="collapsible">
              <button>Propiedades del eucalipto</button>
              <i class="fa-solid fa-angle-down"></i>
          </div>
          <div class="content">
              <ul>
                  <li>Antiinflamatorias</li>
                  <li>Expectorantes</li>
                  <li>Calmantes</li>
                  <li>Antioxidantes</li>
                  <li>Antifúngicas</li>
                  <li>Antisépticas</li>
              </ul>
          </div>
      </div>

      <div class="container-collapsible">
          <div class="collapsible">
              <button>Otros beneficios</button>
              <i class="fa-solid fa-angle-down"></i>
          </div>
          <div class="content">
              <ul>
                  <li>Alivia infecciones y enfermedades respiratorias</li>
                  <li>Desinfecta el ambiente ante procesos virales</li>
                  <li>Reduce la inflamación en la piel</li>
                  <li>Previene la resequedad en la piel</li>
                  <li>Desinfecta heridas</li>
                  <li>Equilibra la producción de grasa en la piel</li>
                  <li>Ayuda a que los granos desaparezcan más rápido</li>
                  <li>Estimula el funcionamiento del sistema inmune</li>
                  <li>Trata las manchas en la piel y unifica el tono facial</li>
                  <li>Relaja la mente y el cuerpo</li>
              </ul>
          </div>
      </div>
  </div>
  </div>`;
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
      // document.querySelector(`[modal="product-details"]`).remove();
      disableScrolling();
    }
  }
});

// Necesito que emita el evento

// selectedElement isSelectedElement
