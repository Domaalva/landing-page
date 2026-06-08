"use strict";

// Función flecha que muestra el toast si existe
const showToast = () => {
  const toast = document.getElementById("toast-interactive");
  if (toast) {
    toast.classList.remove("hidden");   // quita la clase hidden
    toast.classList.add("md:block");    // agrega la clase md:block
    console.log("Notificación mostrada");
  } else {
    console.warn("No se encontró el elemento con ID 'toast-interactive'");
  }
};

// Autoejecución
(() => {
  showToast();
})();


// Función flecha que agrega el evento al botón "demo"
const showVideo = () => {
  const demoButton = document.getElementById("demo");
  if (demoButton) {
    demoButton.addEventListener("click", () => {
      window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
      console.log("Video abierto en nueva pestaña");
    });
  } else {
    console.warn("No se encontró el elemento con ID 'demo'");
  }
};

// Función autoejecutable (IIFE)
(() => {
  showVideo();
})();
console.log("file01.js se está ejecutando");
