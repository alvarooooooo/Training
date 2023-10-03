const multiplicator = (a: number, b: number, printText: string) => {
    console.log(printText, a * b)
}

const parseArguments = (args): Array<number> => {
    if( args.length !== 4 ) {
        throw new Error('Wrong number of arguments')
    }

    const firstNumber = Number(args[2])
    const secondNumber = Number(args[3])

    if( !isNaN(firstNumber) && !isNaN(secondNumber) ){
        return [
            firstNumber,
            secondNumber
        ]
    }
    throw new Error('Provided values were not number')

}

const cleanArguments = parseArguments(process.argv)

/**
 * ts-node <function> <argv 2> <argv 3>
 */
const n1: number = Number(cleanArguments[0])
const n2: number = Number(cleanArguments[1])

multiplicator(n1, n2 , `${n1} times ${n2} is:`)