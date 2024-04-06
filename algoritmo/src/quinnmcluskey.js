"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compararPrimosImplicantes = exports.agruparPrimosImplicantes = exports.obtenerPrimosImplicantes = void 0;
function obtenerPrimosImplicantes(tabla) {
    var NUEVATABLA = [];
    var ENTRADAS = tabla[0].length - 1;
    for (var m = 0; m < tabla.length; m++) {
        if (tabla[m][ENTRADAS] == 0)
            continue;
        NUEVATABLA.push(__spreadArray([(m + 1).toString()], tabla[m].slice(1), true));
    }
    return NUEVATABLA;
}
exports.obtenerPrimosImplicantes = obtenerPrimosImplicantes;
function agruparPrimosImplicantes(tabla) {
    var PRIMOSIMPLICANTES = {};
    for (var m = 0; m < tabla.length; m++) {
        var CASO = tabla[m].filter(function (val) { return typeof val == "number"; });
        var UNOS = CASO.reduce(function (acc, current) { return acc + current; });
        if (PRIMOSIMPLICANTES[UNOS] == undefined)
            PRIMOSIMPLICANTES[UNOS] = [];
        PRIMOSIMPLICANTES[UNOS].push(tabla[m]);
    }
    return PRIMOSIMPLICANTES;
}
exports.agruparPrimosImplicantes = agruparPrimosImplicantes;
function compararPrimosImplicantes(tabla) {
    var TABLA = Object.entries(tabla);
    var existe_comparacion = false;
    var nuevaTabla = {};
    var u = 0;
    console.log(TABLA);
    do {
        var CANTIDAD_UNOS = parseInt(TABLA[u][0]);
        var IMPLICANTES_PRIMOS = TABLA[u][1];
        var IMPLICANTES_PRIMOS_VALORES = IMPLICANTES_PRIMOS.map(function (val) { return val.slice(1); });
        var SIG_IMPLICANTES_PRIMOS = TABLA[u + 1][1];
        if (SIG_IMPLICANTES_PRIMOS == undefined)
            continue;
        var SIG_IMPLICANTES_PRIMOS_VALORES = SIG_IMPLICANTES_PRIMOS.map(function (val) { return val.slice(1); });
        for (var i = 0; i < IMPLICANTES_PRIMOS.length - 1; i++) {
            var PRIMO = IMPLICANTES_PRIMOS_VALORES[i];
            for (var j = 0; j < PRIMO.length; j++) {
                var cambios = 0;
                var VALOR = PRIMO[j];
            }
        }
        existe_comparacion = true;
        u = 0;
    } while (!existe_comparacion);
    return {};
}
exports.compararPrimosImplicantes = compararPrimosImplicantes;
