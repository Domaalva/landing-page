"use strict";

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

(() => {
    showToast();
    showVideo();
})();