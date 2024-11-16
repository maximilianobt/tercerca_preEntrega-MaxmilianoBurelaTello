// Array para almacenar el historial de cálculos y el índice de navegación actual
let historialCalculos = [];
let indiceHistorial = 0;

// Carga inicial del historial desde localStorage
document.addEventListener("DOMContentLoaded", () => {
    const historialGuardado = JSON.parse(localStorage.getItem("historialCalculos")) || [];
    historialCalculos = historialGuardado;
    indiceHistorial = historialCalculos.length - 1; // Último cálculo
    actualizarHistorial();
});

// Captura el botón de cálculo y agrega un event listener
document.getElementById("calcular-btn").addEventListener("click", calcular);
document.getElementById("limpiar-historial").addEventListener("click", limpiarHistorial);

// Función de cálculo
function calcular() {
    let numero1 = parseFloat(document.getElementById("numero1").value);
    let numero2 = parseFloat(document.getElementById("numero2").value);

    if (isNaN(numero1) || isNaN(numero2)) {
        mostrarResultado("<p>Por favor ingrese ambos números.</p>");
        return;
    }

    let resultados = {
        id: historialCalculos.length + 1,
        suma: numero1 + numero2,
        resta: numero1 - numero2,
        multiplicacion: numero1 * numero2,
        division: numero2 !== 0 ? (numero1 / numero2) : "Indefinido"
    };

    historialCalculos.push(resultados);
    guardarEnLocalStorage();
    indiceHistorial = historialCalculos.length - 1;
    mostrarResultado(generarResultadoHTML(resultados));
    actualizarHistorial();
}

// Genera el HTML para mostrar el resultado del cálculo actual
function generarResultadoHTML(resultados) {
    return `
        <p><strong>Resultados del cálculo #${resultados.id}:</strong></p>
        <p>Suma: ${resultados.suma}</p>
        <p>Resta: ${resultados.resta}</p>
        <p>Multiplicación: ${resultados.multiplicacion}</p>
        <p>División: ${resultados.division}</p>
    `;
}

// Actualiza el contenido del historial de acuerdo al índice actual
function actualizarHistorial() {
    const contenidoHistorial = document.getElementById("contenido-historial");
    if (historialCalculos.length > 0) {
        contenidoHistorial.innerHTML = generarResultadoHTML(historialCalculos[indiceHistorial]);
    } else {
        contenidoHistorial.innerHTML = "<p>No hay cálculos en el historial.</p>";
    }
}

// Navega por el historial en función de la dirección (-1 para atrás, 1 para adelante)
function navegarHistorial(direccion) {
    if (historialCalculos.length > 0) {
        indiceHistorial += direccion;
        if (indiceHistorial < 0) {
            indiceHistorial = historialCalculos.length - 1; // Vuelve al último
        } else if (indiceHistorial >= historialCalculos.length) {
            indiceHistorial = 0; // Vuelve al primero
        }
        actualizarHistorial();
    }
}

// Limpia el historial
function limpiarHistorial() {
    historialCalculos = [];
    guardarEnLocalStorage();
    actualizarHistorial();
    mostrarResultado("<p>Historial limpiado.</p>");
}

// Guarda el historial en localStorage
function guardarEnLocalStorage() {
    localStorage.setItem("historialCalculos", JSON.stringify(historialCalculos));
}

// Muestra el resultado en el contenedor de resultados
function mostrarResultado(html) {
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.style.display = "block";
    resultadoDiv.innerHTML = html;
}
