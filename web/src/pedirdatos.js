import * as tabla from "./modulos/tablaverdad.js";
import * as quinnmcluskey from "./modulos/quinnmcluskey.js";
function obtenerTexto(input_element) {
    if (input_element == null)
        throw new Error("Error en el DOM");
    var expresion = input_element.value;
    return expresion;
}
var EXPRESSION_INPUT = document.getElementById("input_expresion");
var VALORES_INPUT = document.getElementById("input_valores");
var RESULTADO_SPAN = document.getElementById("resultado_span");
var BUTTON = document.getElementById("enviar");
if (EXPRESSION_INPUT == null || BUTTON == null || VALORES_INPUT == null || RESULTADO_SPAN == null)
    throw new Error("Error en el DOM");
BUTTON.addEventListener("click", function () {
    var EXPRESION = obtenerTexto.call(document, EXPRESSION_INPUT);
    var VALORES = obtenerTexto.call(document, VALORES_INPUT).split(",").map(function (val) { return parseInt(val); });
    try {
    var TABLAVERDAD = tabla.default(EXPRESION, VALORES);
    var PRIMOS_IMPLICANTES = quinnmcluskey.obtenerPrimosImplicantes(TABLAVERDAD);
    var AGRUPACION_PRIMOS_IMPLICANTES = quinnmcluskey.agruparPrimosImplicantes(PRIMOS_IMPLICANTES);
    var COMPARACION_PRIMOS_IMPLICANTES = quinnmcluskey.comparacionPrimosImplicantes(AGRUPACION_PRIMOS_IMPLICANTES);

        var RESULTADO = quinnmcluskey.resolverTabla(COMPARACION_PRIMOS_IMPLICANTES);
        RESULTADO_SPAN.textContent = RESULTADO;
    }
    catch (exception) {
        RESULTADO_SPAN.textContent = "Hubo un error...";
    }
});


    var RESULTADO = quinnmcluskey.resolverTabla(COMPARACION_PRIMOS_IMPLICANTES);
    console.log(RESULTADO);