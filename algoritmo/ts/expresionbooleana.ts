
/**
 * Esta función recibe una expresión booleana y la fragmenta en términos independientes.
 * @returns string[]
 */
function obtenerFragmentos(termino:string[]|string):string[]|string {   
    let parentesis:boolean, corchete:boolean, llave:boolean;
    let suma:number;

    if(termino instanceof Array) {
        for (let i = 0; i < termino.length; i++) {
            let aux:unknown = obtenerFragmentos(termino[i]);
                if(Array.isArray(aux)){ 
                    console.log(aux, "array");
                    
                }

                if(typeof aux == "string"){
                    aux = obtenerFragmentos(aux);
                    console.log(aux);
                       
                }
        }
        return termino;
    }
    parentesis = termino.includes("(");
    corchete = termino.includes("[");
    llave = termino.includes("{");

    if(!parentesis && !corchete && !llave){
        termino = termino.split("+");
        return termino;
    }
    
    return [termino];

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

    obtenerFragmentos([termino]);
    return 0;
}

function resolverExpresionBooleana(termino:string,valVariaables:number[]):number {
    let auxTermino:string|number = termino;
    let arreglo:string[] = [];
    arreglo.push(auxTermino);

    while(typeof auxTermino != "number") {
        let aux = obtenerFragmentos(arreglo);
        // Haciendo la suma...

        console.log(aux);
        
        break;
    }
    

    return 0;
}

//resolverExpresionBooleana("AB[B(C+A)+C[A+C]]", [1,0,1]);
resolverExpresionBooleana("AB+C", [1,0,1])


function obtenerResultado() {

}
