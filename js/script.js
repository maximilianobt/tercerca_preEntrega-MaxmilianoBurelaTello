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

// Función para mostrar el mensaje en el resultado
function mostrarResultado(mensaje) {
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = mensaje;
    resultadoDiv.style.display = "block";
}

// Función para actualizar y mostrar el historial de cálculos
function actualizarHistorial() {
    const historialDiv = document.getElementById("contenido-historial");
    const mensajeHistorial = document.getElementById("mensaje-historial");

    // Si no hay cálculos, muestra el mensaje
    if (historialCalculos.length === 0) {
        mensajeHistorial.style.display = "block"; // Muestra el mensaje
        historialDiv.innerHTML = ''; // Borra cualquier contenido previo
    } else {
        mensajeHistorial.style.display = "none"; // Oculta el mensaje
        historialDiv.innerHTML = ''; // Limpia el contenido del historial
        historialCalculos.forEach(calc => {
            historialDiv.innerHTML += `
                <div>
                    <p><strong>Cálculo #${calc.id}:</strong></p>
                    <p>Suma: ${calc.suma}</p>
                    <p>Resta: ${calc.resta}</p>
                    <p>Multiplicación: ${calc.multiplicacion}</p>
                    <p>División: ${calc.division}</p>
                </div>
                <hr>
            `;
        });
    }
}
