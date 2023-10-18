// Tipar funciones por parametros
const sayHiFromFuncton = (fn: (name: string) => void) =>{
  fn('Miguel')
}

const sayHi = (name: string) => {
  console.log(`Hola ${name}`)
}

sayHiFromFuncton(sayHi)

// Tipar "arrow functions"
const sumar = (a: number, b: number): number => {
  return a + b
}

const restar: (a: number, b:number) => number = (a,b) => {
  return a - b
}

// Never: funciones que nunca van a devolver nada "no dejas de terminar la ejecución, no llega al return"
// A diferencia del void, si que ejecuta toda la función
function throwError(message: string): never {
  throw new Error(message)
}

// Template union types
type HeroId = `${string}-${string}-${string}-${string}-${string}` // en tiempo de ejecución JS no valida

type HexadecimalColor = `#${string}`

// const color: HexadecimalColor = '0033ff' // --> error por el template union type
const color2: HexadecimalColor = '#0033ff'

//Union types
type HeroPowerScale = 'local' | 'planetary' | 'galactic' | 'universal' | 'multiversal'

// Type Alias (PascalCase)
type HeroProperties = {
  readonly id?: HeroId // readonly no lo hace inmutable sino que mientras desarrollamos nos "avisa" con un error de que no podemos hacer esa operación
  isActive?: boolean // Optional property
  powerScale?: HeroPowerScale
}

type HeroBasicInfo = {
  name: string
  age: number
}

type Hero = HeroBasicInfo & HeroProperties // Intersection type

function createHero(input: HeroBasicInfo): Hero {
  const { name, age } = input
  return { id: crypto.randomUUID(), name, age, isActive: true }
}

const thor = Object.freeze(createHero({ name: 'Thor', age: 1500 })) // con object freeze hacemos que el objeto sea inmutable

thor.id?.toString() // Optional chaining operator, si id existe, la función toString() se ejecuta


// Type Index

type HeroProperties2 = {
  isActive: boolean
  address: {
    planet: string
    city: string
  }
}
const addressHero: HeroProperties2['address'] = {
  planet: 'Earth',
  city: 'Madrid'
}

// Type from value

const address = {
  planet: 'Earth',
  city: 'Madrid'
}

type Address = typeof address

const addressTwitch: Address = {
  planet: 'Mars',
  city: 'Twitch'
}

function createAddress() {
  return {
    planet: 'Tierra',
    city: 'Barcelona'
  }
}

type Address2 = ReturnType<typeof createAddress>

// Arrays y Matrices
const languages = [] // que siempre esté vacío

type CellValue = 'X' | 'O' | ''

type GameBoard = [
  [CellValue, CellValue, CellValue],
  [CellValue, CellValue, CellValue],
  [CellValue, CellValue, CellValue]
]

const gameBoard: GameBoard = [
  ['X', 'O', 'X'],
  ['O', 'X', 'O'],
  ['X', '', 'O']
]
