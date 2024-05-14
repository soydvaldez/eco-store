let $body = document.body;

function createLoader() {
  let $loader = document.createElement("div");
  $loader.innerHTML = `<div class="main-loader hidden">
           <div class="loader-properties loader-animation"></div>
           <span>Cargando...</span>
       </div>`;
  $body.appendChild($loader.childNodes[0]);

  let event = new Event("created-loader", {
    bubbles: true,
    composed: true,
  });

  document.body.dispatchEvent(event);
}

function removeMainLoader() {
  let isExistLoader = $body.querySelector(".main-loader.hidden");

  if (isExistLoader) {
    isExistLoader.remove();
  }
}

function handleScrolling() {
  document.body.classList.toggle("disable-scroll");
}

function displayMainLoader() {
  let $mainloader = document.querySelector(".main-loader");
  $mainloader.classList.toggle("hidden");
}

function ctrlLoader() {
  displayMainLoader();
  handleScrolling();
}

createLoader();
ctrlLoader();
ctrlLoader();

// setTimeout((e) => {
//   ctrlLoader();
//   // removeMainLoader();
// }, 1000);
