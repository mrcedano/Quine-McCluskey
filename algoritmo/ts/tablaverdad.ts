/**
 * 
 * Verbos de las funciones:
 * - Definir (set)
 * - Obtener (get)
 */


/**
 * Devuelve una tabla de verdad en un arreglo de X-dimensiones según 
 * la cantidad de entradas que se especifique.
 * @returns number[]
 */
function obtenerTablaVerdad(numeroEntradas:number, ):number[][] {
    if(numeroEntradas <= 1) {
        throw new RangeError("Los números de entrada deben de ser mayor a 1")
    }

    const entradas:number = Math.pow(numeroEntradas, 2)
    const tablaverdad:number[][] = []

    const format:string = "0".repeat(numeroEntradas)
    
    for(let count = 0; count < entradas; count++) {
       let representacion:string = conversionDecimalaBinario(count)
       let resultado:string = format.concat(representacion).substring(representacion.length)
        console.log(resultado);
    }
    
    return tablaverdad
}

/**
 * @param decimal Número Decimal
 * @returns Representación binaria del número decimal.
 */
function conversionDecimalaBinario(decimal:number):string {
    return (decimal >>> 0).toString(2);
}

const arreglo:number[][] = obtenerTablaVerdad(4);


 
