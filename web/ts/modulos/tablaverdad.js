import resolverExpresionBooleana from "./expresionbooleana.js";
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
        var RESULTADO = FORMATO.concat(BINARIO).substring(BINARIO.length).split("");
        NUEVATABLA.push(RESULTADO.map(function (val) { return parseInt(val); }));
    }
    for (var count = 0; count < CASOS; count++) {
        NUEVATABLA[count][numeroEntradas] = resolverExpresionBooleana(expresion, NUEVATABLA[count]);
    }
    return NUEVATABLA;
}
export default obtenerTablaVerdad;
