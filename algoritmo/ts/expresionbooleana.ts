
interface SignosAgrupamiento {
    signo:string,
    regex:RegExp
}

interface Cerraduras {
    [key: string]: string;
}

type Fragmentos = {
    termino:string[]|string
    operacion:0|1
}

type FormatoAgrupacion = {
    termino: string,
    contador: number
}

type FormatoNegados = {
     termino:string
     negado:boolean
}

const listaSignos:SignosAgrupamiento[] = [
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
]
/**
 * Esta función recibe una expresión booleana y la fragmenta en términos independientes.
 * @returns string[]
 */
function obtenerFragmentos(termino: (string | number)[] | number | string, valVariables: number[], sigOperacion:0|1, negacion:boolean): (string | number)[] | number | string {
    let negacionAntes:boolean = negacion
    let nuevoFormato: (string | number)[] | number | string = []
    if (typeof termino == "number") return termino;
    if (Array.isArray(termino)) {
        for (let i = 0; i < termino.length; i++) {
            let term = termino[i]
            if(typeof term == "string"){
                const NEGS = obtenerNegados(term) 
                term = NEGS.termino
                negacion = NEGS.negado
            } 
            const VALUE = obtenerFragmentos(term, valVariables, sigOperacion,negacion);

            if (typeof VALUE == "number") {
                nuevoFormato.push(VALUE);
            }
            if (Array.isArray(VALUE)) {
                nuevoFormato = VALUE;
            }
        }
        return obtenerResultado(nuevoFormato, sigOperacion, negacionAntes);
    }

    nuevoFormato = termino 
    if(termino.length > 1) {
        const fragmentos:Fragmentos = fragmentar(termino,valVariables)
        nuevoFormato = fragmentos.termino
        sigOperacion = fragmentos.operacion
    } 
    if (Array.isArray(nuevoFormato)) {
        return obtenerFragmentos(nuevoFormato, valVariables, sigOperacion,negacion)
    }
    return aplicarValor(termino, valVariables,negacion);
}

function obtenerNegados(expresion:string):FormatoNegados {
    const PATRON:RegExp = /[a-zA-Z]'/
    let hay_negado:boolean = false
    let nueva_expresion:string = expresion

    if(expresion[expresion.length - 1] == "'") {
        for (let i = 0; i < listaSignos.length; i++) {
            const SIGNO:SignosAgrupamiento = listaSignos[i];
            if((expresion[0] == SIGNO.signo || expresion[1] == SIGNO.signo)) {
                hay_negado = true
                nueva_expresion = expresion.substring(0, expresion.length - 1)
                break
            }
    }
    }
    if(PATRON.test(nueva_expresion) && nueva_expresion.length < 3) {
        nueva_expresion = nueva_expresion[0]
        hay_negado = true
    }
    
    return {
        termino:nueva_expresion,
        negado: hay_negado
    }
}

function fragmentar(termino: string, valVariables: number[]): Fragmentos {
    let nuevoFormato: string | string[] = expandiendoTermino(termino).replaceAll(".","");
    let sigOperacion:0|1
    let contador: number = 0;
    const agrupaciones: string[] = [];

    for (let i = 0; i < listaSignos.length; i++) {
        if (nuevoFormato.indexOf(listaSignos[i].signo) != -1) {
            const matches:RegExpMatchArray|null = nuevoFormato.match(listaSignos[i].regex);
            if (matches == null) throw new Error("#1 Existe & No Existe Match")
            const reemplazos:FormatoAgrupacion = reemplazandoAgrupaciones(nuevoFormato, matches, contador)
            nuevoFormato = reemplazos.termino
            contador = reemplazos.contador
            agrupaciones.push(...matches)
        }
    }

    sigOperacion = detectarOperacion(nuevoFormato)
    nuevoFormato = separandoTerminos(nuevoFormato, agrupaciones, sigOperacion)

    return {
        termino: nuevoFormato,
        operacion: sigOperacion
    };
}

function expandiendoTermino(termino:string):string {    
    let nuevoTermino:string = termino
    const ABERTURA_REGEX:RegExp = /[{[\(]/
    const ABERTURA = nuevoTermino.match(ABERTURA_REGEX)
    const CERRADURAS:Cerraduras = {
      "{": "}",
      "[": "]",
      "(": ")"
    }
    if(termino[0].match(/[A-Z]/) || ABERTURA?.[0] == null || (ABERTURA.index != termino.lastIndexOf(ABERTURA[0])) || termino[termino.length - 1] != CERRADURAS[ABERTURA[0]] )    {
      return nuevoTermino
    }
    let llaveInicial = nuevoTermino[0] == "." ? 2 : 1
    nuevoTermino = nuevoTermino.substring(llaveInicial, nuevoTermino.length - 1)
    return nuevoTermino
}

function detectarOperacion(termino:string):0|1 {
    return termino.includes("+") ? 1 : 0
}

function separandoTerminos(termino:string, agrupaciones:string[], operacion:0|1):string[]|string {
    let nuevoFormato:string|string[] = termino;
    if(nuevoFormato.length == 1) return nuevoFormato
    
    const MATCH:IterableIterator<RegExpExecArray> = nuevoFormato.matchAll(/'[A-Z]/g) // Devuelve un iterador.
    
    // Agregando . después de los signos de negación '.
    let result = MATCH.next(), i:number = 1
    while (!result.done) {
        const INDEX:number = result.value.index 
        const AUX:string = nuevoFormato
        nuevoFormato = nuevoFormato.slice(0, INDEX+i).concat(".")
        nuevoFormato = nuevoFormato.concat(AUX.slice(INDEX+i))        
        result = MATCH.next()
        i++
    }
    switch(operacion) {
        case 1: 
            nuevoFormato = nuevoFormato.split("+")
        break;
        case 0:
            nuevoFormato = nuevoFormato.split( nuevoFormato.includes(".") ? "." : "" )
    }
    for (let i = 0; i < nuevoFormato.length; i++) {
        const existenNumeros:RegExpMatchArray|null = nuevoFormato[i].match(/\d/);
        if(!existenNumeros) continue;
        for (let j = 0; j < existenNumeros.length; j++) {
            nuevoFormato[i] = nuevoFormato[i].replace(existenNumeros[j], agrupaciones[parseInt(existenNumeros[j])]);            
        }
    }
    
    return nuevoFormato
}

function reemplazandoAgrupaciones(termino: string, matches: RegExpMatchArray, contador: number): FormatoAgrupacion {
    for (let i = 0; i < matches.length; i++) {
        const element = matches[i];
        termino = termino.replace(matches[i],"."+contador.toString())
        contador++;
    }
    return {
        termino: termino,
        contador: contador
    }
}


/**
 * Esta función recibirá un término de una expresión y los valores de cada término. 
 * Se aplica la jerarquia de operaciones.
 * @param termino
 * @param valVariables Los valores de las variables que se aplicarán al término.
 * @returns El resultado del término según los valores de sus variables.
 */
function aplicarValor(termino: string, valVariables: number[], negacion:boolean): number {
    let auxTermino:string = termino;
    let valor:number = valVariables[termino.charCodeAt(0) - 65 ] // Riesgoso! CAMBIAR
    if(valor == undefined) throw new Error("Debes de especifícar un valor para todos las variables!")
    if(negacion) {
        if(valor == 1) valor = 0
        else valor = 1
    }
    return valor;
}

function resolverExpresionBooleana(termino: string, valVariables: number[]): number {
    let resultado: number = 0;
    const VAL:string|number|(string|number)[] = obtenerFragmentos(termino, valVariables, 0,false);
    if (typeof VAL == "number") {
        return VAL;
    }
    return 0;
}

function obtenerResultado(termino:(string|number)[], operacion:1|0, negados:boolean):number {
    let valor:number = 0
    
    switch (operacion) {
        case 1:
            valor = termino.includes(1) ? 1 : 0
            break;
        case 0: 
            valor = termino.includes(0) ? 0 : 1
            break;
         default:
            break;
    }
    if(negados) {
        valor = valor == 1 ? 0 : 1
    }
    return valor;
}

const df= resolverExpresionBooleana("A'B(A+B)+B",[1,0])
console.log(df);
