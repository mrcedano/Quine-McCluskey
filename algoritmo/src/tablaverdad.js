"use strict";
function obtenerTablaVerdad(numeroEntradas) {
    if (numeroEntradas <= 1) {
        throw new RangeError("Los números de entrada deben de ser mayor a 1");
    }
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
function conversionDecimalaBinario(decimal) {
    return (decimal >>> 0).toString(2);
}
