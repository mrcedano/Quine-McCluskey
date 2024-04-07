"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.comparacionPrimosImplicantes = exports.agruparPrimosImplicantes = exports.obtenerPrimosImplicantes = void 0;
function obtenerPrimosImplicantes(tabla) {
    var NUEVATABLA = [];
    var ENTRADAS = tabla[0].length - 1;
    for (var m = 0; m < tabla.length; m++) {
        if (tabla[m][ENTRADAS] == 0)
            continue;
        tabla[m].pop();
        NUEVATABLA.push(__spreadArray([(m + 1).toString()], tabla[m], true));
    }
    return NUEVATABLA;
}
exports.obtenerPrimosImplicantes = obtenerPrimosImplicantes;
function agruparPrimosImplicantes(tabla) {
    var PRIMOSIMPLICANTES = {};
    for (var m = 0; m < tabla.length; m++) {
        var CASO = tabla[m].map(function (val) {
            if (typeof val == "string")
                return parseInt(val);
            return val;
        }).slice(1);
        var UNOS = CASO.reduce(function (acc, current) { return acc + current; });
        if (PRIMOSIMPLICANTES[UNOS] == undefined)
            PRIMOSIMPLICANTES[UNOS] = [];
        PRIMOSIMPLICANTES[UNOS].push(tabla[m]);
    }
    return PRIMOSIMPLICANTES;
}
exports.agruparPrimosImplicantes = agruparPrimosImplicantes;
function comparacionPrimosImplicantes(tabla) {
    var existe_comparacion = false;
    var NUEVATABLA = tabla;
    var posibleComparacion = true;
    do {
        var RESULTADO_1 = compararConjuntos(NUEVATABLA);
        if (!("posibleComparacion" in RESULTADO_1))
            throw new Error("Algo sucedio mal...");
        posibleComparacion = RESULTADO_1.posibleComparacion;
        NUEVATABLA = RESULTADO_1;
    } while (posibleComparacion);
    var RESULTADO = resolverTabla(NUEVATABLA);
    console.log(NUEVATABLA);
    return {};
}
exports.comparacionPrimosImplicantes = comparacionPrimosImplicantes;
function compararConjuntos(tabla) {
    var NUEVATABLA = {};
    var ARREGLO = Object.entries(tabla);
    var posibleComparacion = false;
    for (var u = 0; u < ARREGLO.length - 1; u++) {
        var CANTIDAD_UNOS = u + 1;
        var PRIMOS_IMPLICANTES = ARREGLO[u][1];
        var SIG_PRIMOS_IMPLICANTES = ARREGLO[u + 1];
        var SIG_PRIMOS = SIG_PRIMOS_IMPLICANTES[1];
        if (SIG_PRIMOS_IMPLICANTES == undefined)
            break;
        for (var j = 0; j < PRIMOS_IMPLICANTES.length; j++) {
            var PRIMO = PRIMOS_IMPLICANTES[j].slice(1);
            var MINITERMINOS_GUARDADOS = [];
            for (var n = 0; n < PRIMO.length; n++) {
                var VALOR = PRIMO[n];
                if (typeof VALOR == "string")
                    continue;
                for (var k = 0; k < SIG_PRIMOS.length; k++) {
                    var NUEVO_PRIMO = [];
                    var SIG_PRIMO_ARREGLO = SIG_PRIMOS[k].slice(1);
                    var VALOR_PRIMO = SIG_PRIMO_ARREGLO[n];
                    var cambios = 0;
                    if (VALOR == VALOR_PRIMO || MINITERMINOS_GUARDADOS.includes(SIG_PRIMOS[k][0].toString())) {
                        continue;
                    }
                    MINITERMINOS_GUARDADOS.push(SIG_PRIMOS[k][0].toString());
                    for (var h = 0; h < SIG_PRIMO_ARREGLO.length; h++) {
                        var VALOR_PRIMO_R = SIG_PRIMO_ARREGLO[h];
                        var VALOR_R = PRIMO[h];
                        if (typeof VALOR_R != "number")
                            throw new Error("Algo raro paso...");
                        if (VALOR_R == VALOR_PRIMO_R) {
                            NUEVO_PRIMO.push(VALOR_R);
                            continue;
                        }
                        ;
                        NUEVO_PRIMO.push(-1);
                        cambios++;
                    }
                    if (cambios > 1)
                        continue;
                    if (NUEVATABLA[CANTIDAD_UNOS] == undefined)
                        NUEVATABLA[CANTIDAD_UNOS] = [];
                    var MINITERMINO_1 = PRIMOS_IMPLICANTES[j][0].toString(), MINITERMINO_2 = SIG_PRIMOS[k][0].toString();
                    NUEVATABLA[CANTIDAD_UNOS].push(__spreadArray(["".concat(MINITERMINO_1, ",", MINITERMINO_2)], NUEVO_PRIMO, true));
                }
            }
        }
    }
    return __assign(__assign({}, NUEVATABLA), { posibleComparacion: posibleComparacion });
}
function resolverTabla(tabla) {
    return {};
}
