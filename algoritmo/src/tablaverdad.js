"use strict";
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
function obtenerTablaVerdad(numeroEntradas) {
    var entradas = Math.pow(numeroEntradas, 2);
    var tablaverdad = [];
    var format = "0".repeat(numeroEntradas);
    for (var count = 0; count < entradas; count++) {
        var representacion = conversionDecimalaBinario(count);
        var resultado = format.concat(representacion).substring(representacion.length);
        console.log(resultado);
    }
    return tablaverdad;
}
/**
 * @param decimal Número Decimal
 * @returns Representación binaria del número decimal.
 */
function conversionDecimalaBinario(decimal) {
    return (decimal >>> 0).toString(2);
}
var arreglo = obtenerTablaVerdad(2);
