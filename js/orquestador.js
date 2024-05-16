let $loader = document.body.querySelector(".loader-wrapper");

function createLoader() {
  $loader.innerHTML = `
      <div class="main-loader">
           <div class="loader-properties loader-animation"></div>
           <span>Cargando...</span>
       </div>`;

  let event = new Event("created-loader", {
    bubbles: true,
    composed: true,
  });

  document.body.dispatchEvent(event);
}

function removeMainLoader() {
  if ($loader) {
    $loader.remove();
  }
}

function handleScrolling() {
  document.body.classList.toggle("disable-scroll");
}

function displayMainLoader() {
  $loader.classList.toggle("hidden");
}

function ctrlLoader() {
  displayMainLoader();
}

createLoader();
// handleScrolling();

// setTimeout((e) => {
//   handleScrolling();
//   ctrlLoader();
//   // removeMainLoader();
// }, 1000);
