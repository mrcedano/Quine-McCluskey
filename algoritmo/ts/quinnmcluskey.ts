
type AgrupacionPrimosImplicantes = {
    [key:number]: (string|number)[][]
}

type ResultadoComparacion = {
    posibleComparacion:boolean,
    PRIMOS_ES: AgrupacionPrimosImplicantes
}

/**
 * Devuelve el arreglo de todos los primos implicantes de la tabla de verdad.
 * @param tabla Tabla de verdad ya con los resultados de los casos  
 * @returns Arreglo de primos implicantes.
 */
function obtenerPrimosImplicantes(tabla:number[][]):(string|number)[][]{
    const TABLA = tabla.map((val) => val)
    const NUEVATABLA:(string|number)[][] = []
    const ENTRADAS = TABLA[0].length - 1
    for (let m = 0; m < tabla.length; m++) {
        if(TABLA[m][ENTRADAS] == 0) continue
        TABLA[m].pop()
        NUEVATABLA.push([(m+1).toString(),...TABLA[m]])
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
    let existe_comparacion:boolean = false
    let NUEVATABLA:AgrupacionPrimosImplicantes = tabla
    let posibleComparacion:boolean = true
    let PRIMOS_ESENCIALES:AgrupacionPrimosImplicantes = {}
    do{
        const RESULTADO = compararConjuntos(NUEVATABLA)      
        if(!("posibleComparacion" in RESULTADO) || !("PRIMOS_ES" in RESULTADO)) throw new Error("Algo sucedio mal...")
        posibleComparacion = RESULTADO.posibleComparacion
        NUEVATABLA = RESULTADO
        PRIMOS_ESENCIALES = {...PRIMOS_ESENCIALES,...RESULTADO.PRIMOS_ES}
    } while(posibleComparacion)
        if("PRIMOS_ES" in NUEVATABLA) NUEVATABLA.PRIMOS_ES = undefined
        NUEVATABLA = eliminarRepetidos(NUEVATABLA)
        PRIMOS_ESENCIALES = eliminarRepetidos(PRIMOS_ESENCIALES)

    return {...NUEVATABLA,...PRIMOS_ESENCIALES}
}

/**
 * Con esta función se elimina todos los elementos repetidos.
 * @param agrupacion Agrupación de los primos esenciales.
 * @returns Una nueva agrupación sin los elementos repetidos.
 */
function eliminarRepetidos(agrupacion:AgrupacionPrimosImplicantes):AgrupacionPrimosImplicantes {
    const TABLA = Object.entries(agrupacion)        
    const REGEXNUMERO = /^-?\d*\.?\d+$/;
    const NUEVATABLA:AgrupacionPrimosImplicantes = {}
    const VALORES:string[] = []
    for (let i = 0; i < TABLA.length; i++) {
        const ARREGLO = TABLA[i];
        if(!(ARREGLO[0].match(REGEXNUMERO))) continue
        const UNOS = parseInt(ARREGLO[0])
        if(NUEVATABLA[UNOS] == undefined) NUEVATABLA[UNOS] = []

        for(let j = 0; j < ARREGLO[1].length; j++){
            const VALOR:string = ARREGLO[1][j].slice(1).toString()
            if(!(VALORES.includes(VALOR))){
                NUEVATABLA[UNOS].push(ARREGLO[1][j])
                VALORES.push(VALOR)
            }                        
        }
    }
    return NUEVATABLA
}

function compararConjuntos(tabla:AgrupacionPrimosImplicantes):AgrupacionPrimosImplicantes&ResultadoComparacion {
    const NUEVATABLA:AgrupacionPrimosImplicantes = {}
    const PRIMOS_ES:AgrupacionPrimosImplicantes = {}
    const ARREGLO = Object.entries(tabla)
    let posibleComparacion:boolean;
    const PRIMOS_ESENCIALES:(string|number)[][] = [];
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
                    if(cambios > 1) {
                        PRIMOS_ESENCIALES.push(SIG_PRIMOS[k])
                        continue
                    }
                    if(NUEVATABLA[CANTIDAD_UNOS] == undefined) NUEVATABLA[CANTIDAD_UNOS] = []
                    const MINITERMINO_1:string = PRIMOS_IMPLICANTES[j][0].toString(), MINITERMINO_2:string = SIG_PRIMOS[k][0].toString()
                    NUEVATABLA[CANTIDAD_UNOS].push(["".concat(MINITERMINO_1,",",MINITERMINO_2), ...NUEVO_PRIMO])
                }
            }
        }
  }
  
  if(PRIMOS_ESENCIALES.length > 1) {
  const ESENCIALES:(string|number)[][] = obtenerPrimosEsenciales(PRIMOS_ESENCIALES)      
  
    for (let i = 0; i < ESENCIALES.length; i++) {
        const PRIMO_ESENCIAL:number[] = ESENCIALES[i].filter((v) => typeof v == "number")
        const UNOS:number = PRIMO_ESENCIAL.reduce((acc, current) => {
            if(current == -1) return acc
            return acc + current
        },0)    
        if(typeof ESENCIALES[i][0] != "string") throw new Error("Algo raro pasó...")
        if(PRIMOS_ES[UNOS] == undefined) PRIMOS_ES[UNOS] = []
        PRIMOS_ES[UNOS].push([ESENCIALES[i][0], ...PRIMO_ESENCIAL])
    }                    
  }
  posibleComparacion = Object.entries(NUEVATABLA).length > 1 ? true : false ;
  return {
    ...NUEVATABLA,
    posibleComparacion,
    PRIMOS_ES
  }
}

function obtenerPrimosEsenciales(esenciales:(string|number)[][]):(string|number)[][] {
    const MINITERMINOS = esenciales.map((val) => val[0])
    const PRIMOS_ESENCIALES:(string|number)[][] = []

    for (let i = 0; i < MINITERMINOS.length; i++) {
        let contador = 0

        for (let j = 0; j < MINITERMINOS.length; j++) {
            const MINITERMO = MINITERMINOS[i]
            if(MINITERMINOS[i] == MINITERMINOS[j]) {
                contador++
            }            
        }
        if(contador > 1) {
            const MINITERMINO = esenciales[i]
            PRIMOS_ESENCIALES.push(MINITERMINO)
        }
    }
    return PRIMOS_ESENCIALES
}

function resolverTabla(tabla:AgrupacionPrimosImplicantes):string {
    let resultado:string = ""
    const TABLA = Object.entries(tabla);    
    const ARREGLO:(string|number)[][] = []
    const LISTA:(string|number)[][] = []
    const CONTADORES:{
        [key:string]: number 
    } = {}

   for (let i = 0; i < TABLA.length; i++) {
       const CONJUNTO = TABLA[i];
        for (let j = 0; j < CONJUNTO[1].length; j++) {
            ARREGLO.push(CONJUNTO[1][j][0].toString().split(","))
            LISTA.push(CONJUNTO[1][j])
        }     
   }
    for (let i = 0; i < ARREGLO.length; i++) {
        const ARR = ARREGLO[i]
        for (let j = 0; j < ARR.length; j++) {
            if(CONTADORES[ARR[j]] == undefined) CONTADORES[ARR[j]] = 0
            CONTADORES[ARR[j]]++
        }        
    }   
    const ARREGLO_CONTADORES = Object.entries(CONTADORES)
    .filter((arr) => arr[1] == 1 ).flat().filter((val) => typeof val == "string" )

    for (let i = 0; i < ARREGLO.length; i++) {
        const MINITERMINOS = ARREGLO[i];
        for (let j = 0; j < ARREGLO_CONTADORES.length; j++) {
            const MINITERMINO_ES = ARREGLO_CONTADORES[j];
            if(MINITERMINOS.includes(MINITERMINO_ES)) {
                const NUMEROS:number[] = LISTA[i].slice(1).filter((ev) => typeof ev == "number")
                for (let m = 0; m < NUMEROS.length; m++) {
                    const NUMERO = NUMEROS[m];  
                    if(NUMERO == -1) continue
                    resultado += String.fromCharCode(65 + m)
                }
                resultado += "+"
                break
            }
        }
    }    
    
    return resultado.substring(0,resultado.length - 1)
}
export {obtenerPrimosImplicantes, agruparPrimosImplicantes, comparacionPrimosImplicantes, resolverTabla}