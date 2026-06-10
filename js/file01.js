import { fetchProducts, fetchCategories } from './functions.js';

/* =========================
   MENÚ RESPONSIVE
========================= */
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});


/* =========================
   TOAST
========================= */
const startBtn = document.getElementById("start");
const toast = document.getElementById("toast-interactive");
const closeToast = document.getElementById("close-toast");

startBtn.addEventListener("click", () => {
  toast.classList.remove("hidden");
});

closeToast.addEventListener("click", () => {
  toast.classList.add("hidden");
});


/* =========================
   PRODUCTOS
========================= */
const renderProducts = () => {

  fetchProducts(
    'https://data-dawm.github.io/datum/reseller/products.json'
  )
  .then((result) => {

    if (result.success) {

      const container = document.getElementById("products-container");

      container.innerHTML = "";

      const products = result.body.slice(0, 6);

      products.forEach((product) => {

        let productHTML = `
          <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">

            <img src="[IMG]" class="w-full h-40 object-cover rounded" />

            <h3 class="font-bold mt-3 dark:text-white">
              [TITLE]
            </h3>

            <p class="text-blue-600 font-semibold">
              $[PRICE]
            </p>

            <p class="text-sm text-gray-500 dark:text-gray-300">
              Categoría: [CAT]
            </p>

            <a href="[URL]" target="_blank"
              class="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded">
              Ver producto
            </a>

          </div>
        `;

        productHTML = productHTML.replaceAll("[IMG]", product.imgUrl);
        productHTML = productHTML.replaceAll(
          "[TITLE]",
          product.title.length > 20
            ? product.title.substring(0, 20) + "..."
            : product.title
        );
        productHTML = productHTML.replaceAll("[PRICE]", product.price);
        productHTML = productHTML.replaceAll("[URL]", product.productURL);
        productHTML = productHTML.replaceAll("[CAT]", product.category_id);

        container.innerHTML += productHTML;

      });

    } else {
      alert(result.body);
    }

  });

};


/* =========================
   CATEGORÍAS (ASYNC/AWAIT + XML)
========================= */
const renderCategories = async () => {

  try {

    const result = await fetchCategories(
      'https://data-dawm.github.io/datum/reseller/categories.xml'
    );

    if (result.success) {

      const container = document.getElementById("categories");

      container.innerHTML =
        `<option selected disabled>Seleccione una categoría</option>`;

      const categories = result.body.getElementsByTagName("category");

      for (let category of categories) {

        const id = category
          .getElementsByTagName("id")[0]
          .textContent;

        const name = category
          .getElementsByTagName("name")[0]
          .textContent;

        let categoryHTML = `
          <option value="[ID]">[NAME]</option>
        `;

        categoryHTML = categoryHTML.replaceAll("[ID]", id);
        categoryHTML = categoryHTML.replaceAll("[NAME]", name);

        container.innerHTML += categoryHTML;

      }

    } else {
      alert(result.body);
    }

  } catch (error) {
    alert(error.message);
  }

};


/* =========================
   AUTOEJECUCIÓN
========================= */
(() => {

  renderProducts();
  renderCategories();

})();