
type AgrupacionMiniterminos = {
    [key:number]: number[][]
}

/**
 * Devuelve el arreglo de todos los primos implicantes de la tabla de verdad.
 * @param tabla Tabla de verdad ya con los resultados de los casos  
 * @returns Arreglo de primos implicantes.
 */
function obtenerPrimosImplicantes(tabla:number[][]):number[][]{
    const NUEVATABLA:number[][] = []
    const ENTRADAS = tabla[0].length - 1
    for (let m = 0; m < tabla.length; m++) {
        if(tabla[m][ENTRADAS] == 0) continue
        NUEVATABLA.push([m+1,...tabla[m]])
        NUEVATABLA[NUEVATABLA.length - 1].pop()
    }
    return NUEVATABLA
}

/**
 * Recibe el arreglo de los primos implicantes y los agrupa según el número de 1's que contengan.
 * @param tabla Arreglo de los primos implicantes.
 * @returns Un objeto que contendra arreglos según el número de 1's que tiene cada primo implicante.
 */
function agruparPrimosImplicantes(tabla:number[][]):AgrupacionMiniterminos {
    const PRIMOSIMPLICANTES:AgrupacionMiniterminos = {}

    for (let m = 0; m < tabla.length; m++) {
    }

    return PRIMOSIMPLICANTES
}

export {obtenerPrimosImplicantes, agruparPrimosImplicantes}
    
