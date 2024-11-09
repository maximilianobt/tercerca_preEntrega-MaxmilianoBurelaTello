// Array para almacenar el historial de cálculos
let historialCalculos = [];

// Captura del botón y agregar un event listener
document.getElementById("calcular-btn").addEventListener("click", calcular);

function calcular() {
    // Datos de entrada
    let numero1 = parseFloat(document.getElementById("numero1").value);
    let numero2 = parseFloat(document.getElementById("numero2").value);

    // Entradas
    if (isNaN(numero1) || isNaN(numero2)) {
        mostrarResultado("<p>Por favor ingrese ambos números.</p>");
        return;
    }

    // Operaciones
    let resultados = {
        id: historialCalculos.length + 1,
        suma: numero1 + numero2,
        resta: numero1 - numero2,
        multiplicacion: numero1 * numero2,
        division: numero2 !== 0 ? (numero1 / numero2) : "Indefinido",
        usuario: "UsuarioDemo" // Reemplazar con un nombre real si se requiere
    };

    // Historial
    historialCalculos.push(resultados);

    // Mostrar resultados 
    let resultadoHTML = `
        <p><strong>Resultados del <p>cálculo #${resultados.id}:</p></strong></p>
        <p>Suma: ${resultados.suma}</p>
        <p>Resta: ${resultados.resta}</p>
        <p>Multiplicación: ${resultados.multiplicacion}</p>
        <p>División: ${resultados.division}</p>
    `;
    mostrarResultado(resultadoHTML);

    // Historial de cálculos en el DOM
    actualizarHistorial();
}

// Función 
function mostrarResultado(mensaje) {
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = mensaje;
    resultadoDiv.style.display = "block";
}

// Función para actualizar y mostrar el historial de cálculos
function actualizarHistorial() {
    const historialDiv = document.getElementById("historial");
    historialDiv.innerHTML = "<h3>Historial:</h3>";
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
