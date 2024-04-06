
type AgrupacionPrimosImplicantes = {
    [key:number]: (string|number)[][]
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
        NUEVATABLA.push([(m+1).toString(),...tabla[m].slice(1)])
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
        const CASO = tabla[m].filter((val) => typeof val == "number")
        const UNOS = CASO.reduce((acc,current) => acc + current)
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
function compararPrimosImplicantes(tabla:AgrupacionPrimosImplicantes):AgrupacionPrimosImplicantes {

    const TABLA = Object.entries(tabla)
    
    let existe_comparacion:boolean = false;
    let nuevaTabla: AgrupacionPrimosImplicantes = {}
    let u = 0

    console.log(TABLA);
    
    do 
    {
      const CANTIDAD_UNOS:number = parseInt(TABLA[u][0])
      const IMPLICANTES_PRIMOS = TABLA[u][1];
      const IMPLICANTES_PRIMOS_VALORES = IMPLICANTES_PRIMOS.map((val) => val.slice(1))
      const SIG_IMPLICANTES_PRIMOS = TABLA[u+1][1]

      if(SIG_IMPLICANTES_PRIMOS == undefined) continue;

      const SIG_IMPLICANTES_PRIMOS_VALORES = SIG_IMPLICANTES_PRIMOS.map((val) => val.slice(1))

      for(let i = 0; i < IMPLICANTES_PRIMOS.length - 1; i++) {
        const PRIMO = IMPLICANTES_PRIMOS_VALORES[i]
        for (let j = 0; j < PRIMO.length; j++) {
          let cambios:number = 0;
          const VALOR = PRIMO[j]
        }
      }
      existe_comparacion = true
      u = 0
    } while(!existe_comparacion);
    return {}
}



export {obtenerPrimosImplicantes, agruparPrimosImplicantes, compararPrimosImplicantes}
    
 