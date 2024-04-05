"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Operaciones;
(function (Operaciones) {
    Operaciones[Operaciones["Suma"] = 0] = "Suma";
    Operaciones[Operaciones["Multiplicacion"] = 1] = "Multiplicacion";
})(Operaciones || (Operaciones = {}));
function obtenerFragmentos(termino, valVariables, sigOperacion) {
    var nuevoFormato = [];
    if (typeof termino == "number")
        return termino;
    if (Array.isArray(termino)) {
        for (var i = 0; i < termino.length; i++) {
            var val = obtenerFragmentos(termino[i], valVariables, sigOperacion);
            if (typeof val == "number") {
                nuevoFormato.push(val);
            }
            if (Array.isArray(val)) {
                nuevoFormato = val;
            }
        }
        return obtenerResultado(nuevoFormato, sigOperacion);
    }
    nuevoFormato = termino;
    if (termino.length > 1) {
        var fragmentos = fragmentar(termino, valVariables);
        nuevoFormato = fragmentos.termino;
        sigOperacion = fragmentos.operacion;
    }
    if (Array.isArray(nuevoFormato)) {
        return obtenerFragmentos(nuevoFormato, valVariables, sigOperacion);
    }
    return aplicarValor(nuevoFormato, valVariables);
}
function fragmentar(termino, valVariables) {
    var nuevoFormato = expandiendoTermino(termino).replace(".", "");
    var sigOperacion;
    var contador = 0;
    var listaSignos = [
        {
            signo: "{",
            regex: /\{.*?\}/g
        },
        {
            signo: "[",
            regex: /\[.*?\]/g
        },
        {
            signo: "(",
            regex: /\(.*?\)/g
        }
    ];
    var agrupaciones = [];
    for (var i = 0; i < listaSignos.length; i++) {
        if (nuevoFormato.indexOf(listaSignos[i].signo) != -1) {
            var matches = nuevoFormato.match(listaSignos[i].regex);
            if (matches == null)
                throw new Error("#1 Existe & No Existe Match");
            var reemplazos = reemplazandoAgrupaciones(nuevoFormato, matches, contador);
            nuevoFormato = reemplazos.termino;
            contador = reemplazos.contador;
            agrupaciones.push.apply(agrupaciones, matches);
        }
    }
    sigOperacion = detectarOperacion(nuevoFormato);
    nuevoFormato = separandoTerminos(nuevoFormato, agrupaciones, sigOperacion);
    return {
        termino: nuevoFormato,
        operacion: sigOperacion
    };
}
function expandiendoTermino(termino) {
    var nuevoTermino = termino;
    var ABERTURA_REGEX = /[{[\(]/;
    var ABERTURA = nuevoTermino.match(ABERTURA_REGEX);
    var CERRADURAS = {
        "{": "}",
        "[": "]",
        "(": ")"
    };
    if (termino[0].match(/[A-Z]/) || (ABERTURA === null || ABERTURA === void 0 ? void 0 : ABERTURA[0]) == null || (ABERTURA.index != termino.lastIndexOf(ABERTURA[0])) || termino[termino.length - 1] != CERRADURAS[ABERTURA[0]]) {
        return nuevoTermino;
    }
    var llaveInicial = nuevoTermino[0] == "." ? 2 : 1;
    nuevoTermino = nuevoTermino.substring(llaveInicial, nuevoTermino.length - 1);
    return nuevoTermino;
}
function detectarOperacion(termino) {
    return termino.includes("+") ? Operaciones.Suma : Operaciones.Multiplicacion;
}
function separandoTerminos(termino, agrupaciones, operacion) {
    var nuevoFormato = termino;
    if (agrupaciones.length == 0 && nuevoFormato.length == 1)
        return nuevoFormato;
    switch (operacion) {
        case Operaciones.Suma:
            nuevoFormato = nuevoFormato.split("+");
            break;
        case Operaciones.Multiplicacion:
            nuevoFormato = nuevoFormato.split(nuevoFormato.includes(".") ? "." : "");
    }
    for (var i = 0; i < nuevoFormato.length; i++) {
        var existenNumeros = nuevoFormato[i].match(/\d/);
        if (!existenNumeros)
            continue;
        for (var j = 0; j < existenNumeros.length; j++) {
            nuevoFormato[i] = nuevoFormato[i].replace(existenNumeros[j], agrupaciones[parseInt(existenNumeros[j])]);
        }
    }
    return nuevoFormato;
}
function reemplazandoAgrupaciones(termino, matches, contador) {
    for (var i = 0; i < matches.length; i++) {
        var element = matches[i];
        termino = termino.replace(matches[i], "." + contador.toString());
        contador++;
    }
    return {
        termino: termino,
        contador: contador
    };
}
function aplicarValor(termino, valVariables) {
    var auxTermino = termino;
    var valor = valVariables[termino.charCodeAt(0) - 65];
    if (valor == undefined) {
        throw new Error("Debes de especifícar un valor para todos las variables!");
    }
    return valor;
}
function resolverExpresionBooleana(termino, valVariables) {
    var resultado = 0;
    var VAL = obtenerFragmentos(termino, valVariables, 0);
    if (typeof VAL == "number") {
        return VAL;
    }
    return 0;
}
function obtenerResultado(termino, operacion) {
    switch (operacion) {
        case Operaciones.Suma:
            return termino.includes(1) ? 1 : 0;
        case Operaciones.Multiplicacion:
            return termino.includes(0) ? 0 : 1;
        default:
            break;
    }
    return 0;
}
exports.default = resolverExpresionBooleana;
