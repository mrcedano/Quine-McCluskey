"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var expresionbooleana_1 = require("./expresionbooleana");
var quinnmcluskey_1 = require("./quinnmcluskey");
function conversionDecimalaBinario(decimal) {
    return (decimal >>> 0).toString(2);
}
function obtenerTablaVerdad(expresion, numeroEntradas) {
    if (numeroEntradas <= 1)
        throw new RangeError("Los números de entrada deben de ser mayor a 1");
    var CASOS = Math.pow(2, numeroEntradas);
    var FORMATO = "0".repeat(numeroEntradas);
    var NUEVATABLA = [];
    for (var count = 0; count < CASOS; count++) {
        var BINARIO = conversionDecimalaBinario(count);
        var RESULTADO_1 = FORMATO.concat(BINARIO).substring(BINARIO.length).split("");
        NUEVATABLA.push(RESULTADO_1.map(function (val) { return parseInt(val); }));
    }
    for (var count = 0; count < CASOS; count++) {
        NUEVATABLA[count][numeroEntradas] = (0, expresionbooleana_1.default)(expresion, NUEVATABLA[count]);
    }
    return NUEVATABLA;
}
var TABLAVERDAD = obtenerTablaVerdad("A(CD+D+B)+D(A+B)", 4);
var PRIMOS_IMPLICANTES = (0, quinnmcluskey_1.obtenerPrimosImplicantes)(TABLAVERDAD);
var AGRUPACION_PRIMOS_IMPLICANTES = (0, quinnmcluskey_1.agruparPrimosImplicantes)(PRIMOS_IMPLICANTES);
var COMPARACION_PRIMOS_IMPLICANTES = (0, quinnmcluskey_1.comparacionPrimosImplicantes)(AGRUPACION_PRIMOS_IMPLICANTES);
var RESULTADO = (0, quinnmcluskey_1.resolverTabla)(COMPARACION_PRIMOS_IMPLICANTES);
console.log(RESULTADO);
