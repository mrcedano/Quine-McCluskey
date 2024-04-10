var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2)
        for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar)
                    ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function obtenerPrimosImplicantes(tabla) {
    var TABLA = tabla.map(function (val) { return val; });
    var NUEVATABLA = [];
    var ENTRADAS = TABLA[0].length - 1;
    for (var m = 0; m < tabla.length; m++) {
        if (TABLA[m][ENTRADAS] == 0)
            continue;
        TABLA[m].pop();
        NUEVATABLA.push(__spreadArray([(m + 1).toString()], TABLA[m], true));
    }
    return NUEVATABLA;
}
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
function comparacionPrimosImplicantes(tabla) {
    var existe_comparacion = false;
    var NUEVATABLA = tabla;
    var posibleComparacion = true;
    var PRIMOS_ESENCIALES = {};
    do {
        var RESULTADO = compararConjuntos(NUEVATABLA);
        if (!("posibleComparacion" in RESULTADO) || !("PRIMOS_ES" in RESULTADO))
            throw new Error("Algo sucedio mal...");
        posibleComparacion = RESULTADO.posibleComparacion;
        NUEVATABLA = RESULTADO;
        PRIMOS_ESENCIALES = __assign(__assign({}, PRIMOS_ESENCIALES), RESULTADO.PRIMOS_ES);
    } while (posibleComparacion);
    if ("PRIMOS_ES" in NUEVATABLA)
        NUEVATABLA.PRIMOS_ES = undefined;
    NUEVATABLA = eliminarRepetidos(NUEVATABLA);
    PRIMOS_ESENCIALES = eliminarRepetidos(PRIMOS_ESENCIALES);
    return __assign(__assign({}, NUEVATABLA), PRIMOS_ESENCIALES);
}
function eliminarRepetidos(agrupacion) {
    var TABLA = Object.entries(agrupacion);
    var REGEXNUMERO = /^-?\d*\.?\d+$/;
    var NUEVATABLA = {};
    var VALORES = [];
    for (var i = 0; i < TABLA.length; i++) {
        var ARREGLO = TABLA[i];
        if (!(ARREGLO[0].match(REGEXNUMERO)))
            continue;
        var UNOS = parseInt(ARREGLO[0]);
        if (NUEVATABLA[UNOS] == undefined)
            NUEVATABLA[UNOS] = [];
        for (var j = 0; j < ARREGLO[1].length; j++) {
            var VALOR = ARREGLO[1][j].slice(1).toString();
            if (!(VALORES.includes(VALOR))) {
                NUEVATABLA[UNOS].push(ARREGLO[1][j]);
                VALORES.push(VALOR);
            }
        }
    }
    return NUEVATABLA;
}
function compararConjuntos(tabla) {
    var NUEVATABLA = {};
    var PRIMOS_ES = {};
    var ARREGLO = Object.entries(tabla);
    var posibleComparacion;
    var PRIMOS_ESENCIALES = [];
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
                    if (cambios > 1) {
                        PRIMOS_ESENCIALES.push(SIG_PRIMOS[k]);
                        continue;
                    }
                    if (NUEVATABLA[CANTIDAD_UNOS] == undefined)
                        NUEVATABLA[CANTIDAD_UNOS] = [];
                    var MINITERMINO_1 = PRIMOS_IMPLICANTES[j][0].toString(), MINITERMINO_2 = SIG_PRIMOS[k][0].toString();
                    NUEVATABLA[CANTIDAD_UNOS].push(__spreadArray(["".concat(MINITERMINO_1, ",", MINITERMINO_2)], NUEVO_PRIMO, true));
                }
            }
        }
    }
    if (PRIMOS_ESENCIALES.length > 1) {
        var ESENCIALES = obtenerPrimosEsenciales(PRIMOS_ESENCIALES);
        for (var i = 0; i < ESENCIALES.length; i++) {
            var PRIMO_ESENCIAL = ESENCIALES[i].filter(function (v) { return typeof v == "number"; });
            var UNOS = PRIMO_ESENCIAL.reduce(function (acc, current) {
                if (current == -1)
                    return acc;
                return acc + current;
            }, 0);
            if (typeof ESENCIALES[i][0] != "string")
                throw new Error("Algo raro pasó...");
            if (PRIMOS_ES[UNOS] == undefined)
                PRIMOS_ES[UNOS] = [];
            PRIMOS_ES[UNOS].push(__spreadArray([ESENCIALES[i][0]], PRIMO_ESENCIAL, true));
        }
    }
    posibleComparacion = Object.entries(NUEVATABLA).length > 1 ? true : false;
    return __assign(__assign({}, NUEVATABLA), { posibleComparacion: posibleComparacion, PRIMOS_ES: PRIMOS_ES });
}
function obtenerPrimosEsenciales(esenciales) {
    var MINITERMINOS = esenciales.map(function (val) { return val[0]; });
    var PRIMOS_ESENCIALES = [];
    for (var i = 0; i < MINITERMINOS.length; i++) {
        var contador = 0;
        for (var j = 0; j < MINITERMINOS.length; j++) {
            var MINITERMO = MINITERMINOS[i];
            if (MINITERMINOS[i] == MINITERMINOS[j]) {
                contador++;
            }
        }
        if (contador > 1) {
            var MINITERMINO = esenciales[i];
            PRIMOS_ESENCIALES.push(MINITERMINO);
        }
    }
    return PRIMOS_ESENCIALES;
}
function resolverTabla(tabla) {
    var resultado = "";
    var TABLA = Object.entries(tabla);
    var ARREGLO = [];
    var LISTA = [];
    var CONTADORES = {};
    for (var i = 0; i < TABLA.length; i++) {
        var CONJUNTO = TABLA[i];
        for (var j = 0; j < CONJUNTO[1].length; j++) {
            ARREGLO.push(CONJUNTO[1][j][0].toString().split(","));
            LISTA.push(CONJUNTO[1][j]);
        }
    }
    for (var i = 0; i < ARREGLO.length; i++) {
        var ARR = ARREGLO[i];
        for (var j = 0; j < ARR.length; j++) {
            if (CONTADORES[ARR[j]] == undefined)
                CONTADORES[ARR[j]] = 0;
            CONTADORES[ARR[j]]++;
        }
    }
    var ARREGLO_CONTADORES = Object.entries(CONTADORES)
        .filter(function (arr) { return arr[1] == 1; }).flat().filter(function (val) { return typeof val == "string"; });
    for (var i = 0; i < ARREGLO.length; i++) {
        var MINITERMINOS = ARREGLO[i];
        for (var j = 0; j < ARREGLO_CONTADORES.length; j++) {
            var MINITERMINO_ES = ARREGLO_CONTADORES[j];
            if (MINITERMINOS.includes(MINITERMINO_ES)) {
                var NUMEROS = LISTA[i].slice(1).filter(function (ev) { return typeof ev == "number"; });
                for (var m = 0; m < NUMEROS.length; m++) {
                    var NUMERO = NUMEROS[m];
                    if (NUMERO == -1)
                        continue;
                    resultado += String.fromCharCode(65 + m);
                }
                resultado += "+";
                break;
            }
        }
    }
    return resultado.substring(0, resultado.length - 1);
}
export { obtenerPrimosImplicantes, agruparPrimosImplicantes, comparacionPrimosImplicantes, resolverTabla };
