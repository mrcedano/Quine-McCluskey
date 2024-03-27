function obtenerExpresion(): void {
  
    const expresionInput = document.getElementById('expresionInput') as HTMLInputElement;
    const expresion = expresionInput.value;

  console.log("LA EXPRESION QUE INGRESASTES ES:", expresion);
}
document.getElementById("enviar").addEventListener("click", () => {
  obtenerExpresion()
})
function generarTablaVerdad(variables) {
    const numVariables = variables.length;
    const numFilas = Math.pow(2, numVariables);

    const tablaVerdad = document.createElement('table');

    const encabezado = tablaVerdad.createTHead();
    const encabezadoFila = encabezado.insertRow();
    for (let i = 0; i < numVariables; i++) {
        const th = document.createElement('th');
        th.textContent = variables[i];
        encabezadoFila.appendChild(th);
    }
    const thResultado = document.createElement('th');
    thResultado.textContent = 'Resultado';
    encabezadoFila.appendChild(thResultado);
        
    const cuerpoTabla = tablaVerdad.createTBody();

    for (let i = 0; i < numFilas; i++) {
        const fila = cuerpoTabla.insertRow();
        const binario = (i).toString(2).padStart(numVariables, '0');
        for (let j = 0; j < numVariables; j++) {
            const celda = fila.insertCell();
            celda.textContent = binario[j];
        }
        const resultado = evaluarExpresion(binario);
        const celdaResultado = fila.insertCell();
        celdaResultado.textContent = resultado ? '1' : '0';
    }
    return tablaVerdad;
}
function evaluarExpresion(binario) {
    const suma = binario.split('').reduce((acc, val) => acc + parseInt(val), 0);
    return suma % 2 === 0;
}
const variables = ['A', 'B'];
const tablaVerdadContainer = document.getElementById('tablaVerdadContainer');
tablaVerdadContainer.appendChild(generarTablaVerdad(variables));
