
type AgrupacionPrimosImplicantes = {
    [key:number]: (string|number)[][]
}

type ResultadoComparacion = {
    posibleComparacion:boolean
}
/**
 * Devuelve el arreglo de todos los primos implicantes de la tabla de verdad.
 * @param tabla Tabla de verdad ya con los resultados de los casos  
 * @returns Arreglo de primos implicantes.
 */
function obtenerPrimosImplicantes(tabla:number[][]):(string|number)[][]{
    const NUEVATABLA:(string|number)[][] = []
    const ENTRADAS = tabla[0].length - 1
    for (let m = 0; m < tabla.length; m++) {
        if(tabla[m][ENTRADAS] == 0) continue
        tabla[m].pop()
        NUEVATABLA.push([(m+1).toString(),...tabla[m]])
    }
    return NUEVATABLA
}
/**
 * Recibe el arreglo de los primos implicantes y los agrupa según el número de 1's que contengan.
 * @param tabla Arreglo de los primos implicantes.
 * @returns Un objeto que contendra arreglos según el número de 1's que tiene cada primo implicante.
 */
function agruparPrimosImplicantes(tabla:(string|number)[][]):AgrupacionPrimosImplicantes {
    const PRIMOSIMPLICANTES:AgrupacionPrimosImplicantes = {}
    for (let m = 0; m < tabla.length; m++) {
        const CASO = tabla[m].map((val:string|number) => {
            if(typeof val == "string") return parseInt(val)
            return val;
        }).slice(1)
        const UNOS = CASO.reduce((acc,current) => acc+current)
        if(PRIMOSIMPLICANTES[UNOS] == undefined) PRIMOSIMPLICANTES[UNOS] = []
        PRIMOSIMPLICANTES[UNOS].push(tabla[m])
    }
    return PRIMOSIMPLICANTES
}

/**
 * Comparará cada caso de 1's con el siguiente caso, exceptuando por el último caso que no requerirá comparación alguna.
 * @param tabla Obtenida a través del método de agruparPrimosImplicantes()
 * @returns Objeto que contendrá los minitérminos esenciales.
 */
function comparacionPrimosImplicantes(tabla:AgrupacionPrimosImplicantes):AgrupacionPrimosImplicantes {

    let existe_comparacion:boolean = false;
    let NUEVATABLA:AgrupacionPrimosImplicantes = tabla
    let posibleComparacion:boolean = true;

    do{
        const RESULTADO:AgrupacionPrimosImplicantes&ResultadoComparacion = compararConjuntos(NUEVATABLA)      
        if(!("posibleComparacion" in RESULTADO)) throw new Error("Algo sucedio mal...")
        posibleComparacion = RESULTADO.posibleComparacion
        NUEVATABLA = RESULTADO;
    } while(posibleComparacion)

    const RESULTADO = resolverTabla(NUEVATABLA)
    console.log(NUEVATABLA);
    return {}
}

function compararConjuntos(tabla:AgrupacionPrimosImplicantes):AgrupacionPrimosImplicantes&ResultadoComparacion {
    const NUEVATABLA:AgrupacionPrimosImplicantes = {}
    const ARREGLO = Object.entries(tabla)
    let posibleComparacion:boolean = false
    for(let u = 0; u < ARREGLO.length - 1; u++) { 
        const CANTIDAD_UNOS:number = u+1
        const PRIMOS_IMPLICANTES = ARREGLO[u][1]
        const SIG_PRIMOS_IMPLICANTES = ARREGLO[u+1]
        const SIG_PRIMOS = SIG_PRIMOS_IMPLICANTES[1]
        if(SIG_PRIMOS_IMPLICANTES == undefined) break;
        for(let j = 0; j < PRIMOS_IMPLICANTES.length; j++) {
            const PRIMO = PRIMOS_IMPLICANTES[j].slice(1);
            const MINITERMINOS_GUARDADOS:string[] = [] 
            for (let n = 0; n < PRIMO.length; n++) {
                const VALOR:number|string = PRIMO[n]
                if(typeof VALOR == "string") continue;
                for (let k = 0; k < SIG_PRIMOS.length; k++) {
                    const NUEVO_PRIMO:number[] = []
                    const SIG_PRIMO_ARREGLO =  SIG_PRIMOS[k].slice(1);
                    const VALOR_PRIMO = SIG_PRIMO_ARREGLO[n]        
                    let cambios:number = 0;
                    if(VALOR == VALOR_PRIMO || MINITERMINOS_GUARDADOS.includes(SIG_PRIMOS[k][0].toString())){
                        continue 
                    }                
                     MINITERMINOS_GUARDADOS.push(SIG_PRIMOS[k][0].toString())
                    for (let h = 0; h < SIG_PRIMO_ARREGLO.length ; h++) {
                            const VALOR_PRIMO_R = SIG_PRIMO_ARREGLO[h]
                            const VALOR_R = PRIMO[h]
                            if(typeof VALOR_R != "number") throw new Error("Algo raro paso...")
                            if(VALOR_R == VALOR_PRIMO_R) {
                                NUEVO_PRIMO.push(VALOR_R)
                                continue;
                            };
                            NUEVO_PRIMO.push(-1)
                            cambios++
                        }
                    if(cambios > 1) continue;
                    if(NUEVATABLA[CANTIDAD_UNOS] == undefined) NUEVATABLA[CANTIDAD_UNOS] = []
                    const MINITERMINO_1:string = PRIMOS_IMPLICANTES[j][0].toString(), MINITERMINO_2:string = SIG_PRIMOS[k][0].toString()
                    NUEVATABLA[CANTIDAD_UNOS].push(["".concat(MINITERMINO_1,",",MINITERMINO_2), ...NUEVO_PRIMO])
                }
            }
        }
  }

  return {
    ...NUEVATABLA,
    posibleComparacion
  }
}

function resolverTabla(tabla:AgrupacionPrimosImplicantes) {
    
    return {}
}



export {obtenerPrimosImplicantes, agruparPrimosImplicantes, comparacionPrimosImplicantes}
    
 