"use strict";

import { fetchProducts, fetchCategories } from "./functions.js";
import { saveVote, getVotes } from "./firebase.js";

/**
 * Muestra la notificación interactiva en pantalla.
 *
 * @param {string} [toastId="toast-interactive"] - Identificador del elemento de la notificación.
 * @param {string} [visibleClass="md:block"] - Clase que se agrega para hacer visible la notificación.
 * @returns {void}
 */
const showToast = (toastId = "toast-interactive", visibleClass = "md:block") => {
    const toast = document.getElementById(toastId);

    if (toast) {
        toast.classList.add(visibleClass);
        toast.classList.remove("hidden");
    }
};

/**
 * Asigna un evento click al botón de demostración para abrir un video de YouTube.
 *
 * @param {string} [demoId="demo"] - Identificador del elemento que activa el video.
 * @param {string} [videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"] - URL del video que se abrirá.
 * @returns {void}
 */
const showVideo = (demoId = "demo", videoUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ") => {
    const demo = document.getElementById(demoId);

    if (demo) {
        demo.addEventListener("click", () => {
            window.open(videoUrl, "_blank", "noopener,noreferrer");
        });
    }
};

const renderProducts = () => {
    fetchProducts("https://data-dawm.github.io/datum/reseller/products.json")
        .then(result => {
            if (result.success) {
                const container = document.getElementById("products-container");

                if (!container) {
                    return;
                }

                container.innerHTML = "";

                const products = result.body.slice(0, 6);

                products.forEach(product => {
                    let productHTML = `
                        <article class="space-y-3 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
                            <img src="imgUrl" alt="title" class="w-full h-40 object-cover rounded-lg">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">title</h3>
                            <p class="text-sm text-gray-600 dark:text-gray-300">Category ID: category_id</p>
                            <p class="text-xl font-bold text-blue-600 dark:text-blue-400">$price</p>
                            <a href="productURL" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                                Ver producto
                            </a>
                        </article>
                    `;

                    productHTML = productHTML
                        .replaceAll("imgUrl", product.imgUrl)
                        .replaceAll("title", product.title)
                        .replaceAll("category_id", product.category_id)
                        .replaceAll("price", product.price)
                        .replaceAll("productURL", product.productURL);

                    container.innerHTML += productHTML;
                });
            } else {
                alert(result.body);
            }
        });
};

const renderCategories = async () => {
    try {
        const result = await fetchCategories("https://data-dawm.github.io/datum/reseller/categories.xml");

        if (result.success) {
            const container = document.getElementById("categories");

            if (!container) {
                return;
            }

            container.innerHTML = `<option selected disabled>Seleccione una categoría</option>`;

            const categoriesXML = result.body;
            const categories = categoriesXML.getElementsByTagName("category");

            for (let category of categories) {
                let categoryHTML = `<option value="[ID]">[NAME]</option>`;

                const id = category.getElementsByTagName("id")[0].textContent;
                const name = category.getElementsByTagName("name")[0].textContent;

                categoryHTML = categoryHTML
                    .replaceAll("[ID]", id)
                    .replaceAll("[NAME]", name);

                container.innerHTML += categoryHTML;
            }
        } else {
            alert(result.body);
        }
    } catch (error) {
        alert(error.message);
    }
};

const enableForm = () => {
    const form = document.getElementById("form_voting");

    if (!form) {
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const selectProduct = document.getElementById("select_product");

        if (!selectProduct) {
            alert("No se encontró el producto seleccionado.");
            return;
        }

        const result = await saveVote(selectProduct.value);
        alert(result.message);
    });
};

const displayVotes = async () => {
    const results = document.getElementById("results");

    if (!results) {
        return;
    }

    const result = await getVotes();

    if (result.status !== "success") {
        results.innerHTML = `<p class="text-gray-500 text-center mt-16">${result.message}</p>`;
        return;
    }

    const votesData = result.data ?? {};
    const voteCounts = {};

    Object.values(votesData).forEach(vote => {
        const productID = vote?.productID;

        if (!productID) {
            return;
        }

        voteCounts[productID] = (voteCounts[productID] ?? 0) + 1;
    });

    const rows = Object.entries(voteCounts)
        .map(([productID, totalVotes]) => `
            <tr class="border-b border-gray-200">
                <td class="px-4 py-3 text-left">${productID}</td>
                <td class="px-4 py-3 text-center">${totalVotes}</td>
            </tr>
        `)
        .join("");

    results.innerHTML = `
        <div class="overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-700">
                <thead class="text-xs uppercase bg-gray-100 text-gray-600">
                    <tr>
                        <th class="px-4 py-3">Producto votado</th>
                        <th class="px-4 py-3 text-center">Total de votos</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows || `
                        <tr>
                            <td colspan="2" class="px-4 py-6 text-center text-gray-500">No hay votos disponibles</td>
                        </tr>
                    `}
                </tbody>
            </table>
        </div>
    `;
};

(() => {
    showToast();
    showVideo();
    renderProducts();
    renderCategories();
    enableForm();
    displayVotes();
})();