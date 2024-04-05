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
exports.agruparPrimosImplicantes = exports.obtenerPrimosImplicantes = void 0;
function obtenerPrimosImplicantes(tabla) {
    var NUEVATABLA = [];
    var ENTRADAS = tabla[0].length - 1;
    for (var m = 0; m < tabla.length; m++) {
        if (tabla[m][ENTRADAS] == 0)
            continue;
        NUEVATABLA.push(__spreadArray([m + 1], tabla[m], true));
        NUEVATABLA[NUEVATABLA.length - 1].pop();
    }
    return NUEVATABLA;
}
exports.obtenerPrimosImplicantes = obtenerPrimosImplicantes;
function agruparPrimosImplicantes(tabla) {
    var PRIMOSIMPLICANTES = {};
    for (var m = 0; m < tabla.length; m++) {
    }
    return PRIMOSIMPLICANTES;
}
exports.agruparPrimosImplicantes = agruparPrimosImplicantes;
