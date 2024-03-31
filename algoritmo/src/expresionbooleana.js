"use strict";
var Operaciones;
(function (Operaciones) {
    Operaciones[Operaciones["Suma"] = 0] = "Suma";
    Operaciones[Operaciones["Multiplicacion"] = 1] = "Multiplicacion";
})(Operaciones || (Operaciones = {}));
function obtenerFragmentos(termino, valVariables, sigOperacion) {
    var nuevoTermino = [];
    if (typeof termino == "number")
        return termino;
    if (Array.isArray(termino)) {
        for (var i = 0; i < termino.length; i++) {
            var val = obtenerFragmentos(termino[i], valVariables, sigOperacion);
            if (typeof val == "number") {
                nuevoTermino.push(val);
            }
            if (Array.isArray(val)) {
                nuevoTermino = val;
            }
        }
        return nuevoTermino;
    }
    nuevoTermino = fragmentar(termino, valVariables);
    if (Array.isArray(nuevoTermino)) {
        return obtenerFragmentos(nuevoTermino, valVariables, sigOperacion);
    }
    return aplicarValores(nuevoTermino, valVariables);
}
function fragmentar(termino, valVariables) {
    var nuevoTermino = termino;
    var sumasigno;
    var regex;
    var matches, count = 0;
    var agrupaciones = [];
    if (termino.length == 1) {
        return termino;
    }
    if (nuevoTermino.indexOf("{") != -1) {
        regex = /\{.*?\}/g;
        matches = termino.match(regex);
        console.log(matches);
        if (matches != null) {
            agrupaciones.push.apply(agrupaciones, matches);
            for (var i = 0; i < matches.length; i++) {
                var element = matches[i];
                nuevoTermino = termino.replace(matches[i], count.toString());
                count++;
            }
        }
    }
    if (nuevoTermino.indexOf("[") != -1) {
        regex = /\[.*?\]/g;
        ;
        matches = termino.match(regex);
        console.log(matches);
        if (matches != null) {
            agrupaciones.push.apply(agrupaciones, matches);
            for (var i = 0; i < matches.length; i++) {
                var element = matches[i];
                nuevoTermino = termino.replace(matches[i], count.toString());
                count++;
            }
        }
    }
    if (nuevoTermino.indexOf("(") != -1) {
        regex = /\(.*?\)/g;
        matches = termino.match(regex);
        if (matches != null) {
            agrupaciones.push.apply(agrupaciones, matches);
            for (var i = 0; i < matches.length; i++) {
                var element = matches[i];
                nuevoTermino = termino.replace(matches[i], count.toString());
                count++;
            }
        }
    }
    sumasigno = nuevoTermino.includes("+");
    if (sumasigno) {
        nuevoTermino = nuevoTermino.split("+");
        if (!(agrupaciones.length > 0)) {
            return nuevoTermino;
        }
        var regexNum_1 = /\d/;
        nuevoTermino.map(function (term) {
            var numeros = term.match(regexNum_1);
            if (numeros == null) {
                return term;
            }
            console.log(numeros);
        });
    }
    return nuevoTermino;
}
function aplicarValores(termino, valVariables) {
    var auxTermino = termino;
    return 1;
}
function resolverExpresionBooleana(termino, valVariables) {
    if (typeof termino == "number") {
        return termino;
    }
    var resultado = 0;
    var val = obtenerFragmentos(termino, valVariables, 0);
    if (Array.isArray(val)) {
        console.log("Devuelve un array correcto.");
        console.log(val);
    }
    if (typeof termino == "number") {
        return termino;
    }
    return 0;
}
resolverExpresionBooleana("AB[A+C(A+B)]+CD", [1, 0, 1]);
function obtenerResultado() {
}
