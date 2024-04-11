"use strict";
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
/**
 * Esta función recibe una expresión booleana y la fragmenta en términos independientes.
 * @returns string[]
 */
function obtenerFragmentos(termino, valVariables, sigOperacion, negacion) {
    var negacionAntes = negacion;
    var nuevoFormato = [];
    if (typeof termino == "number")
        return termino;
    if (Array.isArray(termino)) {
        for (var i = 0; i < termino.length; i++) {
            var term = termino[i];
            if (typeof term == "string") {
                var NEGS = obtenerNegados(term);
                term = NEGS.termino;
                negacion = NEGS.negado;
            }
            var VALUE = obtenerFragmentos(term, valVariables, sigOperacion, negacion);
            if (typeof VALUE == "number") {
                nuevoFormato.push(VALUE);
            }
            if (Array.isArray(VALUE)) {
                nuevoFormato = VALUE;
            }
        }
        return obtenerResultado(nuevoFormato, sigOperacion, negacionAntes);
    }
    nuevoFormato = termino;
    if (termino.length > 1) {
        var fragmentos = fragmentar(termino, valVariables);
        nuevoFormato = fragmentos.termino;
        sigOperacion = fragmentos.operacion;
    }
    if (Array.isArray(nuevoFormato)) {
        return obtenerFragmentos(nuevoFormato, valVariables, sigOperacion, negacion);
    }
    return aplicarValor(termino, valVariables, negacion);
}
function obtenerNegados(expresion) {
    var PATRON = /[a-zA-Z]'/;
    var hay_negado = false;
    var nueva_expresion = expresion;
    if (PATRON.test(nueva_expresion) && nueva_expresion.length < 3) {
        nueva_expresion = nueva_expresion[0];
        hay_negado = true;
    }
    if (expresion[expresion.length - 1] == "'") {
        for (var i = 0; i < listaSignos.length; i++) {
            var SIGNO = listaSignos[i];
            if ((expresion[0] == SIGNO.signo || expresion[1] == SIGNO.signo)) {
                hay_negado = true;
                nueva_expresion = expresion.substring(0, expresion.length - 1);
                break;
            }
        }
    }
    if (PATRON.test(nueva_expresion) && nueva_expresion.length < 3) {
        nueva_expresion = nueva_expresion[0];
        hay_negado = true;
    }
    return {
        termino: nueva_expresion,
        negado: hay_negado
    };
}
function fragmentar(termino, valVariables) {
    var nuevoFormato = expandiendoTermino(termino).replace(".", "");
    var sigOperacion;
    var contador = 0;
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
    return termino.includes("+") ? 1 : 0;
}
function separandoTerminos(termino, agrupaciones, operacion) {
    var nuevoFormato = termino;
    if (nuevoFormato.length == 1)
        return nuevoFormato;
    var MATCH = nuevoFormato.matchAll(/'[A-Z]/g); // Devuelve un iterador.
    // Agregando . después de los signos de negación '.
    var result = MATCH.next(), i = 1;
    while (!result.done) {
        var INDEX = result.value.index;
        var AUX = nuevoFormato;
        nuevoFormato = nuevoFormato.slice(0, INDEX + i).concat(".");
        nuevoFormato = nuevoFormato.concat(AUX.slice(INDEX + i));
        result = MATCH.next();
        i++;
    }
    switch (operacion) {
        case 1:
            nuevoFormato = nuevoFormato.split("+");
            break;
        case 0:
            nuevoFormato = nuevoFormato.split(nuevoFormato.includes(".") ? "." : "");
    }
    for (var i_1 = 0; i_1 < nuevoFormato.length; i_1++) {
        var existenNumeros = nuevoFormato[i_1].match(/\d/);
        if (!existenNumeros)
            continue;
        for (var j = 0; j < existenNumeros.length; j++) {
            nuevoFormato[i_1] = nuevoFormato[i_1].replace(existenNumeros[j], agrupaciones[parseInt(existenNumeros[j])]);
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
/**
 * Esta función recibirá un término de una expresión y los valores de cada término.
 * Se aplica la jerarquia de operaciones.
 * @param termino
 * @param valVariables Los valores de las variables que se aplicarán al término.
 * @returns El resultado del término según los valores de sus variables.
 */
function aplicarValor(termino, valVariables, negacion) {
    var auxTermino = termino;
    var valor = valVariables[termino.charCodeAt(0) - 65]; // Riesgoso! CAMBIAR
    if (valor == undefined)
        throw new Error("Debes de especifícar un valor para todos las variables!");
    if (negacion) {
        if (valor == 1)
            valor = 0;
        else
            valor = 1;
    }
    return valor;
}
function resolverExpresionBooleana(termino, valVariables) {
    var resultado = 0;
    var VAL = obtenerFragmentos(termino, valVariables, 0, false);
    if (typeof VAL == "number") {
        return VAL;
    }
    return 0;
}
function obtenerResultado(termino, operacion, negados) {
    var valor = 0;
    switch (operacion) {
        case 1:
            valor = termino.includes(1) ? 1 : 0;
            break;
        case 0:
            valor = termino.includes(0) ? 0 : 1;
            break;
        default:
            break;
    }
    if (negados) {
        valor = valor == 1 ? 0 : 1;
    }
    return valor;
}

var RESULTADO = resolverExpresionBooleana("A'B'+A", [1, 1]);
console.log(RESULTADO);
export default resolverExpresionBooleana;
