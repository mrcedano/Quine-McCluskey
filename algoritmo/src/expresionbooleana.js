"use strict";
function obtenerFragmentos(termino) {
    var parentesis, corchete, llave;
    var suma;
    if (termino instanceof Array) {
        for (var i = 0; i < termino.length; i++) {
            var aux = obtenerFragmentos(termino[i]);
            if (Array.isArray(aux)) {
                return aux;
            }
            if (typeof aux == "string") {
                aux = obtenerFragmentos(aux);
                return aux;
            }
        }
        return termino;
    }
    parentesis = termino.includes("(");
    corchete = termino.includes("[");
    llave = termino.includes("{");
    if (!parentesis && !corchete && !llave) {
        termino = termino.split("+");
        return termino;
    }
    return [termino];
}
function aplicarValores(termino, valVariables) {
    var auxTermino = termino;
    obtenerFragmentos([termino]);
    return 0;
}
function resolverExpresionBooleana(termino, valVariaables) {
    var auxTermino = termino;
    var arreglo = [];
    arreglo.push(auxTermino);
    while (typeof auxTermino != "number") {
        var aux = obtenerFragmentos(arreglo);
        console.log(aux);
        break;
    }
    return 0;
}
resolverExpresionBooleana("AB+C+B+A+DFD", [1, 0, 1]);
function obtenerResultado() {
}
