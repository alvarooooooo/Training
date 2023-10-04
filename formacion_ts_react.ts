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

const cleanArgs = parseArgs(process.argv)

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

// Fisher-Yates Sorting Algorithm
const shuffle = <T>(arr: T[]) => {
    for(let i = arr.length - 1; i > 0; --i){
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
}



// Muestro resultados
const showArray = (arr: number[]) => {
    console.warn(arr);
    const arr2 = shuffle(arr);
    console.log(minMax(arr2))
}

showArray(rangeArray(cleanArgs))