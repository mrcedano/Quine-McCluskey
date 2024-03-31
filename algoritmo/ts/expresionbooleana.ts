enum Operaciones {
    "Suma",
    "Multiplicacion"
}
/**
 * Esta función recibe una expresión booleana y la fragmenta en términos independientes.
 * @returns string[]
 */
function obtenerFragmentos(termino:(string|number)[]|string|number,valVariables:number[], sigOperacion:Operaciones):(string|number)[]|number|string {       
    let nuevoTermino:(string|number)[]|number|string = [];
    
    if(typeof termino == "number") return termino;

    if(Array.isArray(termino)) {
        for (let i = 0; i < termino.length; i++) {
            let val = obtenerFragmentos(termino[i], valVariables, sigOperacion);
            if(typeof val == "number") {
                nuevoTermino.push(val);
            }

            if(Array.isArray(val)){
                nuevoTermino = val;
            }
        }
        return nuevoTermino;
    } // A partir de este punto, el termino es un string o array

    nuevoTermino = fragmentar(termino,valVariables);
    if(Array.isArray(nuevoTermino)) {
        return obtenerFragmentos(nuevoTermino, valVariables,sigOperacion)
    }
    return aplicarValores(nuevoTermino,valVariables);
}

function fragmentar(termino:string, valVariables:number[]):string[]|string {
    
    let nuevoTermino:string|string[] = termino;
    let sumasigno:boolean;
    let regex:RegExp;
    let matches:RegExpMatchArray|null, count:number = 0;
    
    const agrupaciones:string[] = [];
    if(termino.length == 1) {
        return termino;
    }
    if(nuevoTermino.indexOf("{") != -1) {
        regex = /\{.*?\}/g;     
        matches = termino.match(regex);
        console.log(matches);
        if(matches != null) {
            agrupaciones.push(...matches);
            for (let i = 0; i < matches.length; i++) {
                const element = matches[i];
                nuevoTermino = termino.replace(matches[i], count.toString())
                count++;
            }
        }
    }
    if(nuevoTermino.indexOf("[") != -1) {
        regex = /\[.*?\]/g;;     
        matches = termino.match(regex);
        console.log(matches);
        if(matches != null) {
            agrupaciones.push(...matches);
            for (let i = 0; i < matches.length; i++) {
                const element = matches[i];
                nuevoTermino = termino.replace(matches[i], count.toString())
                count++;
            }
        }
    }
    if(nuevoTermino.indexOf("(") != -1) {
        regex = /\(.*?\)/g;     
        matches = termino.match(regex);
        if(matches != null) {
            agrupaciones.push(...matches);
            for (let i = 0; i < matches.length; i++) {
                const element = matches[i];
                nuevoTermino = termino.replace(matches[i], count.toString())
                count++;
            }
        }
    }    
    sumasigno = nuevoTermino.includes("+");    
    if(sumasigno) {
      nuevoTermino = nuevoTermino.split("+");
        if(!(agrupaciones.length > 0)) {
            return nuevoTermino
        }
        const regexNum:RegExp = /\d/;
        nuevoTermino.map((term) => {
            let numeros = term.match(regexNum);
            if(numeros == null) {
                return term;
            }
        })
    }
    return nuevoTermino;
}

/**
 * Esta función recibirá un término de una expresión y los valores de cada término. 
 * Se aplica la jerarquia de operaciones.
 * @param termino
 * @param valVariables Los valores de las variables que se aplicarán al término.
 * @returns El resultado del t"érmino según los valores de sus variables.
 */
function aplicarValores(termino:string, valVariables:number[]):number {
    let auxTermino:string[]|string|number = termino;
    return 1;
}

function resolverExpresionBooleana(termino:string,valVariables:number[]):number {
    if(typeof termino == "number") {
        return termino;
    }
    let resultado:number = 0;
    
    const val:unknown = obtenerFragmentos(termino,valVariables,0);
    
    if(Array.isArray(val)) {
        console.log("Devuelve un array correcto.");
        console.log(val);
    }
    if(typeof termino == "number"){
        return termino;
    } 

    return 0;
}

// resolverExpresionBooleana("AB+C", [1,0,1]) 
// resolverExpresionBooleana("A(C+A)+AB", [1,0,1]);
resolverExpresionBooleana("AB[A+C(A+B)]+CD",[1,0,1])


function obtenerResultado() {

}
