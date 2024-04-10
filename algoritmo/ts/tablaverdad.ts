import resolverExpresionBooleana from "./expresionbooleana";
import { obtenerPrimosImplicantes, agruparPrimosImplicantes, comparacionPrimosImplicantes, resolverTabla } from "./quinnmcluskey";
/**
 * @param decimal Número Decimal
 * @returns Representación binaria del número decimal.
 */
function conversionDecimalaBinario(decimal:number):string {
    return (decimal >>> 0).toString(2);
}
/**
 * Devuelve una tabla de verdad en un arreglo de X-dimensiones según 
 * la cantidad de entradas que se especifique.
 * @returns Arreglo de X-dimensiones.
 */
function obtenerTablaVerdad(expresion:string,numeroEntradas:number):number[][] {
    if(numeroEntradas <= 1) throw new RangeError("Los números de entrada deben de ser mayor a 1")
    const CASOS:number = Math.pow(2, numeroEntradas)
    const FORMATO:string = "0".repeat(numeroEntradas)
    const NUEVATABLA:number[][] = []
    for(let count = 0; count < CASOS; count++) {
       const BINARIO:string = conversionDecimalaBinario(count)
       const RESULTADO:string[] = FORMATO.concat(BINARIO).substring(BINARIO.length).split("")        
       NUEVATABLA.push(RESULTADO.map((val) => parseInt(val))) 
    }
    for(let count = 0; count < CASOS; count++) {
        NUEVATABLA[count][numeroEntradas] = resolverExpresionBooleana(expresion, NUEVATABLA[count])
    }
    return NUEVATABLA;
}
//const TABLAVERDAD:number[][] = obtenerTablaVerdad("A(CD+D+B)+D(A+B)",4)
//  const TABLAVERDAD:number[][] = obtenerTablaVerdad("A+B(C+A)+B(C+A)",3)
// const PRIMOS_IMPLICANTES:(string|number)[][] = obtenerPrimosImplicantes(TABLAVERDAD)
// const AGRUPACION_PRIMOS_IMPLICANTES = agruparPrimosImplicantes(PRIMOS_IMPLICANTES)
// const COMPARACION_PRIMOS_IMPLICANTES = comparacionPrimosImplicantes(AGRUPACION_PRIMOS_IMPLICANTES)
// const RESULTADO = resolverTabla(COMPARACION_PRIMOS_IMPLICANTES)

// console.log(RESULTADO);

export default obtenerTablaVerdad

