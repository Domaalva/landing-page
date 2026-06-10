'use strict';

/**
 * Realiza una petición HTTP para obtener productos en formato JSON.
 *
 * @param {string} url - URL del recurso JSON de productos.
 * @returns {Promise<{success: boolean, body: any}>}
 * Retorna un objeto con el estado de la petición y los datos obtenidos
 * o el mensaje de error en caso de fallo.
 */
const fetchProducts = (url) => {

  return fetch(url)
    .then((response) => {

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {

      return {
        success: true,
        body: data
      };

    })
    .catch((error) => {

      return {
        success: false,
        body: error.message
      };

    });

};


/**
 * Realiza una petición HTTP para obtener categorías en formato XML
 * y las convierte a un documento XML utilizable en el DOM.
 *
 * @async
 * @param {string} url - URL del recurso XML de categorías.
 * @returns {Promise<{success: boolean, body: Document|string}>}
 * Retorna un objeto con el documento XML parseado o el mensaje de error.
 */
const fetchCategories = async (url) => {

  try {

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const text = await response.text();

    const parser = new DOMParser();

    const data = parser.parseFromString(text, "application/xml");

    return {
      success: true,
      body: data
    };

  } catch (error) {

    return {
      success: false,
      body: error.message
    };

  }

};


/**
 * Exporta las funciones de acceso a datos.
 */
export { fetchProducts, fetchCategories };