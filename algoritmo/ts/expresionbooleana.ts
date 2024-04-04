
interface SignosAgrupamiento {
    signo:string,
    regex:RegExp
}

interface Cerraduras {
    [key: string]: string;
}

type Fragmentos = {
    termino:string[]|string
    operacion:Operaciones
}

type FormatoAgrupacion = {
    termino: string,
    contador: number
}


enum Operaciones {
    "Suma",
    "Multiplicacion"
}
/**
 * Esta función recibe una expresión booleana y la fragmenta en términos independientes.
 * @returns string[]
 */
function obtenerFragmentos(termino: (string | number)[] | number | string, valVariables: number[], sigOperacion: Operaciones): (string | number)[] | number | string {
    let nuevoFormato: (string | number)[] | number | string = [];

    if (typeof termino == "number") return termino;

    if (Array.isArray(termino)) {
        for (let i = 0; i < termino.length; i++) {
            const val = obtenerFragmentos(termino[i], valVariables, sigOperacion);
            if (typeof val == "number") {
                nuevoFormato.push(val);
            }

            if (Array.isArray(val)) {
                nuevoFormato = val;
            }
        }
        return obtenerResultado(nuevoFormato, sigOperacion);
    }
    
    nuevoFormato = termino
    if(termino.length > 1) {
        const fragmentos:Fragmentos = fragmentar(termino,valVariables)
        nuevoFormato = fragmentos.termino
        sigOperacion = fragmentos.operacion
    } 
    if (Array.isArray(nuevoFormato)) {
        return obtenerFragmentos(nuevoFormato, valVariables, sigOperacion)
    }
    return aplicarValor(nuevoFormato, valVariables);
}

function fragmentar(termino: string, valVariables: number[]): Fragmentos {
    let nuevoFormato: string | string[] = expandiendoTermino(termino).replace(".","");
    let sigOperacion:Operaciones
    let contador: number = 0;

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
      return nuevoTermino;
    }
    let llaveInicial = nuevoTermino[0] == "." ? 2 : 1;

    nuevoTermino = nuevoTermino.substring(llaveInicial, nuevoTermino.length - 1);
    return nuevoTermino;
}

function detectarOperacion(termino:string):Operaciones {
    return termino.includes("+") ? Operaciones.Suma : Operaciones.Multiplicacion
}

function separandoTerminos(termino:string, agrupaciones:string[], operacion:Operaciones):string[]|string {
    let nuevoFormato:string|string[] = termino;
    if(agrupaciones.length == 0 && nuevoFormato.length == 1) return nuevoFormato
    switch(operacion) {
        case Operaciones.Suma: 
            nuevoFormato = nuevoFormato.split("+")
        break;
        case Operaciones.Multiplicacion:
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
function aplicarValor(termino: string, valVariables: number[]): number {
    let auxTermino:string = termino;
    let valor:number = valVariables[termino.charCodeAt(0) - 65 ] // Riesgoso! CAMBIAR
        if(valor == undefined) {
            throw new Error("Debes de especifícar un valor para todos las variables!")
        }
    return valor;
}

function resolverExpresionBooleana(termino: string, valVariables: number[]): number {
    let resultado: number = 0;
    const VAL:string|number|(string|number)[] = obtenerFragmentos(termino, valVariables, 0);
    if (typeof VAL == "number") {
        return VAL;
    }
    return 0;
}

// resolverExpresionBooleana("AB+C", [1,0,1]) 
// resolverExpresionBooleana("A(C+A)+AB", [1,0,1]);
// resolverExpresionBooleana("AB[A+C(A+B)]+CD",[1,0,1])
console.log(resolverExpresionBooleana("{AB[AB+B(C+A)]}+CD(AB+A)", [1, 1, 1,1]));
 

function obtenerResultado(termino:(string|number)[], operacion:Operaciones):number {
    switch (operacion) {
        case Operaciones.Suma:
            return termino.includes(1) ? 1 : 0                
        case Operaciones.Multiplicacion: 
            return termino.includes(0) ? 0 : 1 
         default:
            break;
    }

    return 0;
}
