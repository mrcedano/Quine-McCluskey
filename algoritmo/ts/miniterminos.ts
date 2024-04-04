function obtenerMiniterminos(){
type Term = string;
type PrimeImplicant = {
    term: Term;
    used: boolean;
};
    function findPrimeImplicants(expression: Term[]): PrimeImplicant[] {
    const primeImplicants: PrimeImplicant[] = [];
    for (const term of expression) {
        primeImplicants.push({ term: term, used: false });
    }
    return primeImplicants;
}
    function simplifyExpression(expression: Term[]): Term[] {
    const primeImplicants = findPrimeImplicants(expression);
    return expression;
}
    function simplifyQuineMcCluskey(inputExpression: string): string {
    const expression: Term[] = inputExpression.split('|');
    const simplifiedExpression = simplifyExpression(expression);
    return simplifiedExpression.join('|');
}
    const userInput = "(A&B)|(C&D)";
    const simplifiedExpression = simplifyQuineMcCluskey(userInput);
    console.log("Expresión simplificada:", simplifiedExpression);
}
    
