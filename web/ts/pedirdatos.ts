function obtenerExpresion(): void {
  
    const expresionInput = document.getElementById('expresionInput') as HTMLInputElement;
    const expresion = expresionInput.value;

  console.log("LA EXPRESION QUE INGRESASTES ES:", expresion);
}
document.getElementById("enviar").addEventListener("click", () => {
  obtenerExpresion()
})
