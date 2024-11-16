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
document.getElementById("limpiar-historial-btn").addEventListener("click", limpiarHistorial);

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
        const resultadoHTML = historialCalculos.slice(indiceHistorial, indiceHistorial + 1)
            .map(generarResultadoHTML)
            .join("");
        contenidoHistorial.innerHTML = resultadoHTML;
    } else {
        contenidoHistorial.innerHTML = "<p>No hay cálculos en el historial.</p>";
    }

    // Actualiza los botones de navegación
    document.getElementById("prev").disabled = indiceHistorial <= 0;
    document.getElementById("next").disabled = indiceHistorial >= historialCalculos.length - 1;
}

// Navega por el historial
function navegarHistorial(direccion) {
    indiceHistorial += direccion;
    actualizarHistorial();
}

// Muestra el resultado de la operación
function mostrarResultado(contenido) {
    const divResultado = document.getElementById("resultado");
    divResultado.innerHTML = contenido;
    divResultado.style.display = "block";
}

// Limpia el historial y lo borra de localStorage
function limpiarHistorial() {
    historialCalculos = [];
    indiceHistorial = 0;
    localStorage.removeItem("historialCalculos");
    actualizarHistorial();
    document.getElementById("resultado").style.display = "none";
}

// Guarda el historial en localStorage
function guardarEnLocalStorage() {
    localStorage.setItem("historialCalculos", JSON.stringify(historialCalculos));
}
