//TUTORIAL DESDE 0
/**
 *  Para inicar proyecto
 *  $ npm init -y 
 *  $ npm install --save-dev ts-node typescript
 * 
 *  Para ejecutar
 *  1. Añadir en package-json bajo scripts lo que voy a ejecutar <ejecutar>
 *  2. Abrir Terminal
 *  $ npm run "<ejecutar>"
 * 
 *  Para git
 *  $ git init
 *  $ git add .
 *  $ git commit -m "msg"
 *  $ git remote set-url origin https://user:token@github.com/user//repo.git
 * 
 *  Todas las mañanas
 *  $ git checkout main
 *  $ git pull
 *  $ git checkout <-b> "mi_rama"
 *  $ git pull
 *  $ git rebase origin/main        trae los cambios de main a la rama actual 
 * 
 *  Para subir la rama a la nube
 *  $ git commit -m
 *  $ git push origin HEAD
 *  Abrir PR contra main
 */

/****************************************************************************
 * ARRAY VS TUPLA
 */

/**
 * 1. Crea una función que dada, un entero, devuelva un array del 0 al entero
 * 
 * También clásico for
 * function createArray(n: number): number[] {
 *  const array = []
 *  for(let i = 0; i < n; ++i) {
 *      array.push(i)
 *  }
 *  return array
 * }
 * 
 */
function rangeArray(n: number): number[] {
    if ( n > 0 ){ // no hace falta, si length < 0 from devuelve []
        return Array.from(
            {length: n},
            (value,idx) => idx //tambien (_, idx) => idx
        );
    }
    //throw new Error('Number is negative')
    return []
}

/**
 * Comprueba que el nº y tipo de argumento introducido es correcto
 * @param args 
 */
const parseArgs = (args): number => {
    if ( args.length !== 3 ){
        throw new Error('Wrong number of parameters\n Use: npm run showArray <number>')
    }

    if ( !isNaN(Number(args[2])) ){
        return Number(args[2])
    }

    throw new Error('Provided value is not a number')
}



/**
 * 2. Crea una funcion que dada una lista de numeros, devuelva una tupla con el minimo
 * y el maximo. ¿Por qué devolver una tupla y no un array?
 * 
 * > https://www.tutorialspoint.com/array-vs-tuples-in-typescript#:~:text=Unlike%20arrays%2C%20tuples%20have%20a,each%20element%20using%20type%20annotations.
 * > Arrays: collection of elements. It is an ordered list of values, where each value
 * is identified by an index. Can contain elements of differents types
 * 
 *      let numbers: number[] = [1,2,3]
 *      let fruits: string[] = ['apple','banana','orange']
 *      let mixed: (number | string)[] = [1, "two", 3]
 * 
 * > Tuples: finite ordered list of elements, where each element can have a different
 * type. Unlike arrays, tuples have a fixed length, and the types of each element are known
 * at the time of declaration
 *  
 *      let person: [string, number] = ["John", 25]
 *      let point: [number, number, string] = [10,20,"origin"]
 * 
 * > Arrays vs Tuples:
 *      Arrays are flexible and can hold any number of elements of the same or different
 *      types (dynamic, we can add or remove elements). 
 *      Tuples are fixed length, and the types of each element are predetermined.
 * 
 *      Arrays are commonly used when order or position of elements is important. We can
 *      perform adding, removing and modifying operations. Meanwhile, tuples are used
 *      when we want to represent a fixed set of values with different types, such as
 *      representing coordinates or key-values pairs. Tuples are safer.
 * 
 * 
 *  > Para este ejercicio devolvemos una tupla porque es más seguro, dado un conjunto
 *  de números fijo, el max y min no varia y son solo dos no queremos ni añadir ni eliminar
 */

/**
 *  Una aproximación con clasico bucle for O(n)
 */
const minMax = (numbers: number[]): [number,number] => {
    let min = numbers[0]
    let max = numbers[0]

    for(let i=0; i<numbers.length; ++i){
        if ( max < numbers[i] ){
            max = numbers[i]
        }
        if ( min > numbers[i] ){
            min = numbers[i]
        }
    }
    return [min, max]
}

/**
 *  Otra aproximación con O(2n)??
 *  Spread operator O(n) pero empleo dos
 *  
 *  function minMax(numbers: number[]): [number, number] {
 *      return [Math.min(...numbers),Math.max(...numbers)]
 *  }
 * 
 */


/** Fisher-Yates Sorting Algorithm
 *  Recibe como parametro el array a mezclar
 *  @param arr 
 */
const shuffle = <T>([...arr]: T[]) => {
    for(let i = arr.length - 1; i > 0; --i){
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
}

/**
 *  3. Crea una funcion que dado un array de numeros, devuelva un array de tuplas con el numero y su posicion en la lista
 *  Recibe como parametro el array a transformar en tupla
 *  @param arr
 * 
 *  Implementado en showArray()
 *  const tuple: [number, number][] = shuffledArr.map( (x,it) => [x,it]);  
 */

/****************************************************************************
 * MAP, FILTER, REDUCE
 */

/**
 *  1. (Map) Crea una funcion que, dada una lista de numeros y un numero N, devuelva la lista de numeros multiplicados por N
 *  @param arr
 *  @param n
 */
const multiply = (arr: number[], n: number): number[] => {
    return arr.map((x) => x*n);
}

/**
 *  2. (Map) Crea una funcion que, dada una lista de strings, devuelva una lista de strings en mayusculas
 *  Si no es string lanzamos error???
 *  @param arr
 */
const toUpper = (arr: string[]): string[] => {
    return arr.map((str) => str.toUpperCase())
}

/**
 * 3. (Filter) Crea una funcion que, dada una lista de numeros, devuelva una lista con los numeros pares
 * No hace falta usar ... spread operator porque map y filter crean copias
 * @param arr
 */
const onlyEven = (arr: number[]): number[] => {
    return arr.filter((n) => (n%2 === 0))
}

/**
 * 4. (Filter) Crea una funcion que, dada una lista de strings, devuelva una lista con los strings que
 * tengan mas de 5 caracteres
 * @param arr
 */
const bigWords = (arr: string[]): string[] => {
    return arr.filter((str) => (str.length > 5))
}

/**
 * 5. (Reduce) Crea una funcion que, dada una lista de numeros, devuelva la suma de todos los numeros
 * @param arr
 * Similar a reduce de OMP???
 */
const sum = (arr: number[]): number => {
    const initialValue = 0
    return arr.reduce((accumulator, currentValue) => accumulator + currentValue,initialValue)
}

/**
 * 6. (Reduce) Crea una funcion que, dada una lista de strings, devuelva un string con todos los strings concatenados
 * @param arr
 * Similar a 5. pero initial value debe ser logicamente ""
 */
const unifyStrings = (arr: string[]): string => {
    const initialValue = ""
    return arr.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue)
}

/**
 * 7. (Reduce) Crea una funcion que, dada una lista de numeros, encuentre el numero mas grande
 * @param arr
 *  Dos return 
 *  
 *  const maxNum = (arr: number[]): number => {
 *      const initialValue = arr[0]
 *      return arr.reduce((max, currentValue) => {
 *          return (max < currentValue ? currentValue : max)
 *      }, initialValue)
 *  }
 * 
 */
const maxNum = (arr: number[]): number => arr.reduce((max, current) => (max < current ? current : max), arr[0])
 
/**
 * 8. (Reduce) Crea una funcion que reciba una lista de objetos del tipo {name: string, age: number}
 * y agrupe los objetos por edad. Por ejemplo, si la lista es
 * [{name: 'Juan', age: 20}, {name: 'Maria', age: 20}, {name: 'Pedro', age: 30}],
 * la funcion debe devolver {20: [{name: 'Juan', age: 20}, {name: 'Maria', age: 20}], 30: [{name: 'Pedro', age: 30}]}
 * @param arr
 * 
 *  Para especificar el objeto pasado por parámetro también debemos indicar el nombre de los campos (name y age), no sólo su tipo (string, number)
 */
const groupByAge = (arr: {name: string,age: number}[]): { [key: number]: {name: string, age: number}[] } => {
    const initialValue = {}
    return arr.reduce((accumulator, person) => {
        const keyAge = person.age;
        (accumulator[keyAge] = accumulator[keyAge] || []).push(person) // si es null acumulator[key_age], la crea a vacia []
        return accumulator
    },initialValue)
}

/****************************************************************************
 * Rest and spread operator
 * 
 * > https://www.freecodecamp.org/news/javascript-rest-vs-spread-operators/
 * > Three dots (...) are used for both the rest and spread operators
 * > The main difference is that the rest operator puts the rest of some specific user-supplied values into an Array.
 * > Meanwhile the spread syntax expands iterables into individual elements.
 * 
 * > REST operator
 *      const [firstName, lastName, ...otherInfo] = ["Oluwatobi", "Sofela", "CodeSweetly", "Web Developer", "Male"];
 * 
 *      otherInfo contains ["CodeSweetly","Web Develop","Male"]
 * 
 * > SPREAD operator
 *      const myName = "Oluwatobi Sofela"
 *      
 *      myName contains ["O", "l", "u", "w", "a", "t", "o", "b", "i", " ", "S", "o", "f", "e", "l", "a"]
 */

/**
 * 1. Crea una funcion que, dada una lista de numeros, devuelva el primero
 * 2. Crea una funcion que, dada una lista de numeros, devuelva todos menos el primero
 * > Implemento una funcion lambda que devuelva el primer elemento y el resto
 * @param arr
 */
const firstRestNumber = (arr: number[]): {firstNumber: number,restArray: number[]} => {
    const [first, ...rest] = arr
    return {firstNumber: first, restArray: rest}
}

/**
 * 3. Crea una funcion que, dada una lista de numeros, devuelva una tupla con los dos primeros numeros
 * @param arr
 */
const firstTwoNumber = (arr: number[]): [number,number] => {
    const [first, second] = arr
    return [first, second]
}

/**
 * 4. Crea una funcion que reciba un numero indeterminado de enteros y devuelva la suma de todos ellos.
 * Por ejemplo, si la funcion recibe 1, 2, 3, 4, 5, debe devolver 15. Tenga en cuenta que la funcion
 * no recibe una lista. Ej: sum(1, 2, 3, 4, 5) // 15
 * @param arr
 * Otro recurso sería emplear reduce
 * function sum(...numbers: numbers[]): number {
 *      return numbers.reduce((acc, number) => acc + number, 0)
 * }
 */
const sumArray = (...arr: number[]): number => {
    const splitArray = firstRestNumber(arr)
    if(splitArray.restArray.length===0) { //if empty
        return splitArray.firstNumber
    }

    return splitArray.firstNumber + sumArray(...splitArray.restArray) //probando recursividad con spread operator
}

/**
 * 5. Crea una funcion que combine dos arrays de numeros en uno solo - Rehazla usando genericos
 * @param arr1 
 * @param arr2 
 */
const concatArrayNumbers = (arr1: number[], arr2: number[]): number[] => {
    return [...arr1,...arr2]
}

const concatArray = <T>(arr1: T[], arr2: T[]): T[] => {
    return [...arr1,...arr2]
}

/**
 * 6. Crea una funcion que combine dos objetos en uno solo. Si ambos objetos tienen la misma propiedad,
 * el valor del primer objeto debe prevalecer. Ej: combine({a: 1, b: 2}, {b: 3, c: 4}) // {a: 1, b: 2, c: 4}
 * @param obj1
 * @param obj2
 * 
 * > The spread operator does not clone identical properties!!!
 * > Suppose you used the spread operator to clone properties from object A into object B. And suppose
 * object B contains properties identical to those in object A. In such case, B's versions will override those inside A.
 * 
 *  const myName = { firstName:"Tobi" , lastName: "Sofela"};
 *  const bio = {...myName, firstName: "Oluwatobi", website: "codesweetly.com"}
 * 
 *  bio contains { firstName: "Oluwatobi", lastName: "Sofela", website: "codesweetly.com"}
 */
const combine = (obj1:{}, obj2:{}) => {
    return {...obj2,...obj1}
}

/**
 * 7. Crea una funcion que combine un numero indeterminado de arrays en uno solo.
 * Ej: combine([1, 2, 3], [4, 5, 6], [7, 8, 9]) // [1, 2, 3, 4, 5, 6, 7, 8, 9]
 * @param arr
 */
const combineArray = (...arr: number[][]): number[] => {
    return arr.reduce((acc, array) => [...acc, ...array],[])
}

/**
 * 8. Crea una funcion que combine un numero indeterminado de objetos en uno solo.
 * Si ambos objetos tienen la misma propiedad, el valor del primer objeto debe prevalecer.
 * Ej: combine({a: 1, b: 2}, {b: 3, c: 4}, {c: 5, d: 6}) // {a: 1, b: 2, c: 4, d: 6}
 * @param obj
 */
const combineObj = (...obj: {}[]): {} => {
    return obj.reduce((acc,obj) => ({...acc,...obj}),{})
}

/**
 * 9. Crea una funcion llamada squareAndSum en la que dado un numero indeterminado de numeros,
 * devuelva la suma de los cuadrados de todos ellos. Ej: squareAndSum(1, 2, 3, 4, 5) // 55. Tip: usa rest operator y reduce
 * @param
 */
function squareAndSum(...num: number[]){
    return num.reduce((acc,n) => acc + n*n, 0)
}


/**
 * Función para mostrar resultados, recibe como parámetro un array de números
 * @param arr 
 */
const showArray = (n: number) => {
    console.log("-------------------------------------------------")
    console.log("|\t\tTABLA DE RESULTADOS\t\t|")
    console.log("-------------------------------------------------")
    /***************************************************************
    /* TUPLES VS ARRAYS */
    console.log("\t\t|TUPLAS VS ARRAYS|")
    console.log("\t\t------------------")

    const arr = rangeArray(n);
    console.log("Array del 0 al %d:",process.argv[2],arr)
    const shuffledArr = shuffle(arr);
    console.log("Shuffled array:",shuffledArr)
    const [min , max] = minMax(shuffledArr)
    console.log("Minimum:", min)
    console.log("Maximum:", max)

    // Array -> Tuple
    const tuple: [number, number][] = shuffledArr.map((x,it) => [x,it]);

    console.log("Type of arr:", typeof(shuffledArr))
    console.log("Type of tuple:", typeof(tuple))
    console.log("Tuple:", tuple)

    /***************************************************************
    /* MAP, FILTER, REDUCE */
    console.log("-------------------------------------------------")
    console.log("\t\t|MAP, FILTER, REDUCE|")
    console.log("\t\t---------------------")

    console.log("Shuffled array times %d:",n,multiply(shuffledArr,n))
    const shoppingList = ["cereals", "chicken", "eggs", "rice", "bread"]
    console.log("Shopping List:",shoppingList)
    const uppperShoppingList = toUpper(shoppingList)
    console.log("Shoppig List Upercase:",uppperShoppingList)
    console.log("Even numbers of: ", shuffledArr, " => ",onlyEven(shuffledArr))
    console.log("Shopping List only words with >5 length", bigWords(shoppingList))
    console.log("Sum of", shuffledArr, " => ", sum(shuffledArr))
    console.log("Unified Shopping List:",unifyStrings(shoppingList))
    console.log("Max of", shuffledArr, " => ", maxNum(shuffledArr))
    const people = [{name: 'Juan', age:20},{name: 'Maria', age: 20},{name: 'Pedro', age: 30},{name: 'Luis', age:50}]
    console.log("List of name and age:", people)
    console.log("People classified by age:", groupByAge(people))

    /***************************************************************
    /* Rest and spread operator */
    console.log("-------------------------------------------------")
    console.log("\t   |REST AND SPREAD OPERATOR|")
    console.log("\t   --------------------------")
    const firstRest = firstRestNumber(shuffledArr)
    console.log("First number of",shuffledArr," => ",firstRest.firstNumber)
    console.log("And the rest of elements", firstRest.restArray)
    console.log("First two numbers of",shuffledArr," => ",firstTwoNumber(shuffledArr))
    console.log("Sum of", shuffledArr, " => ", sumArray(...shuffledArr))
    console.log("Concat of", arr, "and", shuffledArr," => ", concatArrayNumbers(arr,shuffledArr))
    console.log("Concat of",uppperShoppingList,"and",shoppingList," => ", concatArray(uppperShoppingList,shoppingList))
    //Falta imprimir resultados 6, 7, 8, 9
}


const cleanArgs = parseArgs(process.argv)
showArray(cleanArgs)