import * as tabla from "modulos/tablaverdad.js"
import * as quinnmcluskey from "modulos/quinnmcluskey.js"

function obtenerTexto(input_element:HTMLInputElement):string {  
    if(input_element == null) throw new Error("Error en el DOM")
    const expresion:string = input_element.value;
    return expresion
}


const EXPRESSION_INPUT:HTMLInputElement|null = document.getElementById("input_expresion") as HTMLInputElement
const VALORES_INPUT:HTMLInputElement|null = document.getElementById("input_valores") as HTMLInputElement
const BUTTON:HTMLElement|null = document.getElementById("enviar")

if(EXPRESSION_INPUT == null || BUTTON == null || VALORES_INPUT == null) throw new Error("Error en el DOM")

BUTTON.addEventListener("click",() => {
    const EXPRESION:string = obtenerTexto.call(document,EXPRESSION_INPUT)
    const VALORES:number[] = obtenerTexto.call(document, VALORES_INPUT).split(",").map((val)=> parseInt(val))
    
    const TABLAVERDAD:number[][] = tabla.default(EXPRESION,VALORES)
    const PRIMOS_IMPLICANTES:(string|number)[][] = quinnmcluskey.obtenerPrimosImplicantes(TABLAVERDAD)
    const AGRUPACION_PRIMOS_IMPLICANTES = quinnmcluskey.agruparPrimosImplicantes(PRIMOS_IMPLICANTES)
    const COMPARACION_PRIMOS_IMPLICANTES = quinnmcluskey.comparacionPrimosImplicantes(AGRUPACION_PRIMOS_IMPLICANTES)
    const RESULTADO = quinnmcluskey.resolverTabla(COMPARACION_PRIMOS_IMPLICANTES)
})

