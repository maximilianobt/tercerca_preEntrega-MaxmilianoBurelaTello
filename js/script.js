let historialCalculos = [];
let indiceHistorial = 0;

document.addEventListener("DOMContentLoaded", () => {
    const historialGuardado = JSON.parse(localStorage.getItem("historialCalculos")) || [];
    historialCalculos = historialGuardado;
    indiceHistorial = historialCalculos.length - 1; // Último cálculo
    actualizarHistorial();
    cargarOperaciones();

    // Agregar evento click al botón calcular
    document.getElementById("calcular-btn").addEventListener("click", realizarCalculo);

    // Agregar evento click al botón limpiar historial
    document.getElementById("limpiar-historial-btn").addEventListener("click", limpiarHistorial);

    // Agregar eventos click a las flechas de navegación
    document.getElementById("prev").addEventListener("click", () => navegarHistorial(-1));
    document.getElementById("next").addEventListener("click", () => navegarHistorial(1));
});

// Función para realizar el cálculo
function realizarCalculo() {
    const numero1 = parseFloat(document.getElementById("numero1").value);
    const numero2 = parseFloat(document.getElementById("numero2").value);

    if (isNaN(numero1) || isNaN(numero2)) {
        mostrarResultado("Por favor, ingrese números válidos.");
        return;
    }

    const suma = numero1 + numero2;
    const resta = numero1 - numero2;
    const multiplicacion = numero1 * numero2;
    const division = numero2 !== 0 ? (numero1 / numero2).toFixed(2) : "No se puede dividir por cero";

    const resultado = `
        <p>Suma: ${suma}</p>
        <p>Resta: ${resta}</p>
        <p>Multiplicación: ${multiplicacion}</p>
        <p>División: ${division}</p>
    `;

    mostrarResultado(resultado);

    // Guardar en el historial
    const nuevoCalculo = {
        id: historialCalculos.length + 1,
        suma,
        resta,
        multiplicacion,
        division
    };
    historialCalculos.push(nuevoCalculo);
    localStorage.setItem("historialCalculos", JSON.stringify(historialCalculos));
    indiceHistorial = historialCalculos.length - 1; // Actualizar el índice al último cálculo
    actualizarHistorial();
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
        const calc = historialCalculos[indiceHistorial];
        historialDiv.innerHTML = `
            <div>
                <p><strong>Cálculo #${calc.id}:</strong></p>
                <p>Suma: ${calc.suma}</p>
                <p>Resta: ${calc.resta}</p>
                <p>Multiplicación: ${calc.multiplicacion}</p>
                <p>División: ${calc.division}</p>
            </div>
            <hr>
        `;
    }
}

// Función para navegar por el historial de cálculos
function navegarHistorial(direccion) {
    if (historialCalculos.length === 0) return;

    indiceHistorial += direccion;
    if (indiceHistorial < 0) {
        indiceHistorial = 0;
    } else if (indiceHistorial >= historialCalculos.length) {
        indiceHistorial = historialCalculos.length - 1;
    }
    actualizarHistorial();
}

// Función para limpiar el historial de cálculos
function limpiarHistorial() {
    historialCalculos = [];
    localStorage.removeItem("historialCalculos");
    indiceHistorial = 0;
    actualizarHistorial();
}

// Función para cargar operaciones desde un archivo JSON
async function cargarOperaciones() {
    try {
        const response = await fetch('operaciones.json');
        const operaciones = await response.json();
        mostrarOperaciones(operaciones);
    } catch (error) {
        console.error('Error al cargar las operaciones:', error);
    }
}

// Función para mostrar las operaciones en la interfaz
function mostrarOperaciones(operaciones) {
    const operacionesDiv = document.getElementById('operaciones');
    operaciones.forEach(op => {
        const opElement = document.createElement('p');
        opElement.textContent = `${op.operacion}: ${op.descripcion}`;
        operacionesDiv.appendChild(opElement);
    });
}
