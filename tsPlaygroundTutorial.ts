//Reunión 1

//const maxNum = (arr: number[]): number => arr.reduce((max, current) => Math.max(max,current), arr[0])
//const maxNum = (arr: number[]): number => Math.max(...arr)
interface MyObj {readonly a:2, b: number} 
const createObject = (): MyObj => ({a:2, b:3}as const)

/**const combine = (obj1:{}, obj2:{}) => {
    return {...obj2,...obj1}
}*/

const combineObj2 = (...obj: {}[]) => {
    return Object.assign({},...obj)
}

const a = {a:1} as const
const x = Object.assign(a,{b:2},{a:2})
console.log(x,a)

//Reunión 2
//Try catch
/**
try{
    noSuchVariable
} catch (err){
    alert( 'error is caught')
    alert(err.name)
    alert(err.message)
    alert(err.stack)
}*/

//Promises async await
//Syntax 
let promise = new Promise(function(resolve, reject){
    // the function is executed automatically when the promise is constructed
   setTimeout(() => resolve("done!"), 1000)
})
//The executor is called automatically and immediately by new Promise
promise.then(
    result => alert(result), // shows "done!" after 1 second
    error => alert(error) // doesn't run
)

let promise2 = new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("Whoops!")), 1000)
})

promise2.then(
    result => alert(result), //doesn't run
    error => alert(error) //shows "Error: Whoops!" after 1 second
)

// .catch(f) is the same as promise.then(null,f)
promise2.catch(console.log) //shows "Error: Whoops!" after 1 second
promise2.then(alert,alert)

//Cleanup: finally
//.finally(f) is similar to .then(f, f) in the sense that f runs always,
// when the promise is settled: be it resolve or reject
// A finally handler "passes through" the result or error
new Promise((resolve,reject) => {
    setTimeout(() => resolve("value"),2000)
}).finally(() => alert("Promise ready")) //triggers first
    .then((result) => alert(result)) // <-- .then shows "value"

/**
 * To summarize
 *  -> A finally handler doesn't get the outcome of the previous handler (it has no arguments)
 *  -> If a finally handler returns something, it's ignored
 *  -> When finally throws an error, then the execution goes to the nearest error handler
 */

//Example: loadScript en js
/**
function loadScript(src, callback){
    let script = document.createElement('script')
    script.src = src

    script.onload = () => callback(null,script)
    script.onerror = () => callback(new Error(`Script load error for ${src}`))

    document.head.append(script)
}

function loadScript(src: any){
    return new Promise(function(resolve, reject){
        let script = document.createElement('script')
        script.src = src

        script.onload = () => resolve(script)
        script.onerror = () => reject(new Error(`Script load error for ${src}`))

        document.head.append(script)
    })
}

//Usage:
let promiseScript = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js")

promise.then(
    script => alert(`${script.src} is loaded!`),
    error => alert(`Error: ${error.message}`)
);

promise.then(script => alert('Another handler...'))
*/
/**PROMISES CHAINING */
new Promise(function(resolve, reject) {
    setTimeout(() => resolve(1), 1000)
}).then(function(result: any) { //result any?? no funciona con Promise<number> | number
    alert(result)
    return result * 2 // 2
}).then(function(result) {
    alert(result)
    return result * 2 // 4
}).then(function(result) {
    alert(result)
    return result * 2
})
/**
 * Here the flow is:
 *      1. The initial promise resolves in 1 second (*)
 *      2. Then the .then handler is called, which in turn creates a new promise 
 *      (resolved with 2 value)
 *      3. The next then gets the result of the previous one, processes it 
 *      (doubles) and passes it to the next handler
 *      4. ... and so on
 * 
 * When a handler returns a value, it becomes the result of that promise, to he next .then is
 * called with it
 * 
 *                            +-------------+
 *                            | new Promise | 
 *                            |  resolve(1) |
 *                            +-------------+
 *                                   |
 *                                   |
 *                                 .then
 *                                   |
 *                                   |
 *                                 .then
 *                                   |
 *                                   |
 *                                 .then
 *
 */

/**
 * !!!!!!!!!!
 * A classic newbie error: technically we can also add many .then to a single promise.This
 * is no chaining
 * 
 *  let promise = new Promise(function(resolve,reject) {
 *      setTimeout(() => resolve(1), 1000)    
 *  })
 * 
 *  promise.then(function(result) {
 *      alert(result)
 *      return result * 2
 *  })
 * 
 *  promise.then(function(result) {
 *      alert(result)
 *      return result * 2
 *  })
 * 
 *  The main difference is that in this example we get the same result 1
 *                            +-------------+
 *                            | new Promise | 
 *                            |  resolve(1) |
 *                            +-------------+
 *                                   |
 *                    +--------------|--------------+
 *                    |              |              |
 *                  .then          .then          .then
 */

/**
 * Returning Promises
 * A handler, used in .then(handler) may create and return a promise
 * In that case further handlers wait until it settles, and then get its result
 * For instance
 */
const returnPromise = new Promise((resolve,reject) => {
    setTimeout(() => resolve(1), 1000)
}).then((result: any) => {
    alert(result) // 1
    return new Promise((resolve,reject) => {    // (*)
        setTimeout(() => resolve(result * 2), 1000)
    })
}).then((result: any) => {  // (**)
    alert(result) // 2
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(result * 2), 1000)
    })
}).then(result => alert(result)) // 4
/**
 * Here the first .then shows 1 and returns new Promise(...) in the line (*). After
 * one second it resolves, and the result(the argument of resolve, here it's result * 2)
 * is passed on to the handler of the second .then. That handler is in the line (**), it
 * shows 2 and does the same thing
 * 
 * So the output is the same as in the previous example: 1 -> 2 -> 4
 * 
 * Returning promisies allows us to build chains of asynchronous actions
 * 
 * Pregunta: No veo la utilidad de devolver promesas, no entiendo mucha diferencia con then concatenados
 */

/**
 * THENABLES
 * To be precise, a handler may return not exactly a promise, but a so-called "thenable"
 * object - an arbitary object that has method .then. It will be treated the same way as a promise
 * 
 * The idea is that 3rd-party libraries may implement "promise-compatible" objects of their
 * own. They can have an extended set of methods, but also be compatible with native promises, 
 * because they implement .then
 * 
 * Example in JS:
 * 
 *  class Thenable {
 *      constructor(num) {
 *          this.num = num
 *      }
 *      then(resolve, reject) {
 *          alert(resolve)
 *          setTimeout(() => resolve(this.num * 2), 1000) // (**)
 *      }
 *  }
 * 
 *  new Promise(resolve => resolve(1))
 *      .then(result => {
 *          return new Thenable(result)     // (*)
 *      })
 *      .then(alert)
 * 
 * JS checks the object returned by .then handler in line(*): if it has a callable method
 * named then, then it calls that method providing native functions resolve, reject as arguments
 * (similar to an executor) and waits until one of them is called. In the example above resolve(2)
 * is called after 1 second (**). Then the result is passed futher down the chain.
 * 
 * This feature allows us to integrate custom objects with promise chains without having to inherit
 * from Promise
 */

/**
 * Bigger example: fetch
 * We'll use the fetch method to load the information about the user from the remote server.
 * It has a lot of optional parameters covered in separate chapters, but the basic syntax
 * is quite simple:
 * 
 *  1. let promise = fetch(url)
 * 
 * This makes a network request to the url and returns a promise. The promise resolves with a
 * response object when the remote server responds with headers, but before the full response
 * is downloaded
 * 
 *  fetch('/article/promise-chanining/user.json')
 *      // Load it as json
 *      .then(response => response.json())
 *      // Make a request to GitHub
 *      .then(user => fetch(`https://api.github.com/users/${user.name}`)) 
 *      // Load the response as json
 *      .then(response => response.json())
 *      // Show the avatar image for 3 seconds
 *      .then(githubUser => {
 *          let img = document.createElement('img')
 *          img.src = githubUser.avatar_url
 *          img.className = "promise-avatar-example"
 *          document.body.append(img)
 * 
 *          setTimeout(() => img.remove(), 3000) // (*)
 *      })
 * 
 * The code works. However, there's a potential problem in it a typical error for those who beggin
 * to use promises.
 * 
 * Look at the line (*): how can we do something after the avatar has finished showing and
 * gets removed? For instance, we'd like to show a form for editing that user or something else.
 * As of now, there's no way
 * 
 * To make the chain extendable, we need to return a promise that resolves when the avatar finishes showing
 * Instead of .then(githubUser => {...}), we write: 
 * 
 *  .then(githubUser => new Promise((resolve, reject) => {...}))
 * 
 * And after img.remove() on setTimeout() function we add resolve:
 * 
 *  setTimeout(() => {
 *      img.remove()
 *      resolve(githubUser)
 *  }, 3000)
 * 
 * 
 * As a good practice, asynchornous action should always return a promise. That makes it 
 * possible to plan actions after it; even if we don't plan to extend the chain now, we may
 * need it later
 * 
 */

/**
 * THEN VS CATCH 
 * Difference between
 *      
 *      promise.then(f1).catch(f2) (*)
 * 
 * and
 * 
 *      promise.then(f1,f2) (**)
 * 
 * 
 * > They are not equal.
 * 
 * > The difference is that if an error happens in f1 then is handled by .catch on (*),
 * meanwhile on (**) the error is not handled
 */

/** 
 * ERROR HANDLING WITH PROMISES
 * Promise chains are great at error handling. When a promise reject, the control jumps
 * to the closest rejection handler. That's very convenient in practice.
 * 
 * The .catch doesn't have to be immediate. It may appear after one or maybe several .then
 * The easiest way to catch all errors is to append .catch to the end of chain:
 * 
 */


/**
 * RETHROWING
 * .catch at the end of the chain is similar to try..catch. We may have as manu .then handlers
 * as we want, and then use a single .catch at the end to handle errors in all of them
 * 
 * In a regular try..catch we can analyze the error and maybe rethrow it if it can't be handled
 * The same thing is posssible for promises
 * 
 * If we throw inside .catch, then the control goes to the next closest error handler. And if we
 * handle the error and finish normally, then it continues to the next closest successful .then
 * handler
 *  
 */
new Promise((resolve, reject) => {
    throw new Error("Whoops!")
}).catch(error => {
    alert("The error is handled, continue normally")
}).then(() => alert("Next successful handler runs"))

/**
 * In the next example we see other situation with .catch. The handler (*) catches the error
 * and just can't handle it(e.g. it only knows how to hanlde URIError), so it throws it again:
 */
new Promise((resolve, reject) => {
    throw new Error("Whoops!")
}).catch((error) => {   // (*)
    if (error instanceof URIError) {
        // handle it
    } else {
        alert("Can't handle such error")
        throw error // throwing this or another error jumps to the next catch
    }
}).then(() => {
    // doesn't run here
}).catch(error => { // (**)
    alert(`The unknown error has occurred: ${error}`)
    // don't return anything => execution goes the normal way
})

// The execution jumps from the first .catch (*) to the next one down the chain

/**
 * UNHANDLED REJECTIONS
 * In case of an error, the promise becomes rejected, and execution should jump to the 
 * closest rejection handler. But there is none. So the error gets "stuck". There's no code
 * to handle it.
 * 
 * In practice, just like with regular unhandled errors in code, it means that something has
 * gone terribly wrong.
 * 
 * What happens when a regular error occrus and is not caught by try..catch? The script dies
 * with a message in the console. A similar thing happens with unhandled promise rejections
 * 
 * In the browser we can cathc such erros using the event unhandlerejection
 * 
 */

/**
 * Error in setTimeout
 * What do you think? Will the .catch trigger? Explain your answer
 */

new Promise(function(resolve, reject) {
    setTimeout(() => {throw new Error("Whoops in setTimeout!")},1000)
}).catch(alert)

/**
 * > No, it won't. There's an implicit try..catch around the function code. So all synchronous
 * erros are handled. 
 * But here the error is generated not while the executor is running, but later. So
 * the promise can't handle it.
 */

/**Promise API */

/**
 * Promise.all
 * Let's say we want many promises to execute in parallel and wait until all of them are ready.
 * For instance, download several URLs in parallel and process the content once they are all done.
 * That's what Promise.all is for
 * 
 *      let promise = Promise.all(iterable)
 * 
 * Promise.all takes an iterable (usualy, an array of promises) and returns a new promise.
 * The new promise resolves when all listed promises are resolved, and the array of their results
 * becomes its result
 * 
 */
Promise.all([
    new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
    new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
    new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(alert) // 1,2,3 when promises are ready: each promise contributes an array member

/**
 * Note that the order of the resulting array members is the same as in its source promises
 * Even though the first promise takes the longest time to resolve, it's still first in the
 * array of results
 * 
 * A common trick is to map an array of job data into an array of promises, and then wrap
 * that into Promise.all
 * 
 * For instance, if we have an array of URLs, we can getch them all like this
 */
let urls = [
    'https://api.github.com/users/iliakan',
    'https://api.github.com/users/remy',
    'https://api.github.com/users/jeresig'
]
// map every url to the promise of the fetch
let requests = urls.map(url => fetch(url))

// Promise.all waits untill all jobs are resolved
Promise.all(requests)
    .then(responses => responses.forEach(
        response => alert(`${response.url}: ${response.status}`)
    ))

/**
 * IF ANY OF THE PROMISES IS REJECTED, THE RETURNED PROMISE IMMEDIATELY REJECTS WITH
 * THAT ERROR
 */
Promise.all([
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error("Error inside Promise.all()")), 2000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).catch(alert)
/**
 * In case of an error, other promises are ignored.
 */

/**
 * Promise.all(iterable) allows non-promise "regular" values in iterable
 * 
 *      Promise.all([
 *          new Promise((resolve, reject) => {
 *              setTimeout(() => resolve(1), 1000)
 *          }),
 *          2,
 *          3
 *      ]).then(alert) // 1, 2, 3
 */

/**
 * Promise.allSettled()
 * Waits for all promises to settle, regarless of the result. The resulting array has:
 *      --> {status:"fulfilled", value:result} for succesful respones,
 *      --> {status:"rejected", reason:error} for errors
 */
let urls_2 = [
    'https://api.github.com/users/iliakan',
    'https://api.github.com/users/remy',
    'https://no-such-url'
]

Promise.allSettled(urls_2.map(url => fetch(url)))
    .then(results => {
        results.forEach((result, num) => {
            if (result.status == "fulfilled") {
                alert(`${urls_2[num]}: ${result.value.status}`)
            }
            if (result.status == "rejected") {
                alert(`${urls_2[num]}: ${result.reason}`)
            }
        })
    })

/**
 * Polyfill (if the browser doesn't support Promise.allSettled)
 * 
 *      if(!Promise.allSettled) {
 *          const rejectHandler = reason => ({ status: 'rejected', reason })
 *          const resolveHandler = value => ({ status: 'fulfilled', value })
 * 
 *          Promise.allSettled = function (promises) {
 *              const convertedPromises = promises.map(p => Promise.resolve(p).then(resolveHandler, rejectHandler))
 *              return Promise.all(convertedPromises)
 *          }
 *      }
 * 
 * In this code, promises.map takes input values, turns them into promises (just in case a non-promise was passed)
 * with p => Promise.resolve(p), and then adds .then handler to every one
 * 
 * That handler turns a successful result value into {status:'fulfilled', value}, and an
 * error reason into {status:'rejected',reason}. That's exactly the format of Promise.allSettled
 * 
 * Now we can use Promise.allSettled to get the results of all given promises, even if some of
 * them reject
 */


/**
 * Promise.race
 * Similar to Promise.all, but only for the first settled promise and gets its results/error
 * 
 * The syntax is:
 * 
 *      let promise = Promise.race(iterable)
 */

Promise.race([
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops! inside race")), 2000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert) // 1

/**
 * The first promise here was fastest, so it became the result. After the first settled promise
 * "wins the race", all further results/errors are ignored
 */

/**
 * Promise.any
 * Similar to Promise.race, but waits only for the first fulfilled promise and gets its results.
 * If all of the given promises are rejected, then the returned promise is rejected with
 * AggregateError - a special error object that stores all promise errors in its errors property
 * 
 * The syntax is
 *      
 *      let promise = Promise.any(iterable)
 * 
 */
Promise.any([
    new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops! from Promise.any")), 2000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert) // 1

/**
 * The first promise here was fastest, but it was rejected, so the second promise became the result.
 * After the first fulfilled promise "wins the race", all further results are ignored
 * 
 * Here's an example when all promises fail
 */
Promise.any([
    new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ouch! from Promise.any")), 1000)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error("Error! from Promise.any")), 2000))
]).catch(error => {
    console.log(error.constructor.name) // AggregateError
    console.log(error.errors[0])    // Error: Ouch!
    console.log(error.errors[1])    // Error: Error!
})

/**
 * Promise.resolve/reject
 * These methods are rarely used in modern code, because of async/await syntax
 * 
 * Promise.resolve
 * Promise.resolve(value) creates a resolved promise with the result value
 * Same as:
 * 
 *      let promise = new Promise(resolve => resolve(value))
 * 
 * 
 * Promise.reject
 * Promise.reject(error) creates a rejected promise with error
 * Same as:
 * 
 *      let promise = new Promise((resolve, reject) => reject(error))
 */

/**
 * Promisification
 * It's the conversion of a function of a function that accepts a callback into a function
 * that returns a promise
 * 
 * Such transformations are often required in real-life, as many functions and libraries are callback-based
 * But promises are more convenient, so it makes sense to promisify them.
 */
function loadScript(src: any, callback: any){
    let script = document.createElement('script')
    script.src = src

    script.onload = () => callback(null, script)
    script.onerror = () => callback(new Error(`Script load error for ${src}`))

    document.head.append(script)
}

// usage:
// loadScript('path/script.js', (err, script) => {...})

/**
 * The function loads a script with the given src, and then calls callback(err) in case of
 * an error, or callback(null, script) in case of successful loading. That's a widespsread
 * agreement for using callbacks, we saw it before
 * 
 * We'll make a new function loadScriptPromise(src), that does the same (loads the script),
 * but returns a promise instead of using callbacks
 * 
 * In other words, we pass it only src (no callback) and get a promise in return, that resolves
 * with script when the load is successful, and rejects with the error otherwise
 */
let loadScriptPromise = function(src: any) {
    return new Promise((resolve, reject) => {
        loadScript(src, (err: any, script: any) => {
            if(err) reject(err);
            else resolve(script)
        })
    })
}
// usage:
// loadScriptPromise('path/script.js').then(...)

/**
 * In practice we may need to-promisify function f and returns a wrapper function
 * We'll call it promisify(f): it accepts a to-promisify function f and returns a wrapper
 * function
 */
function promisify(f: any) {
    return function ( ...args: any[]) { // return a wrapper-function (*)
        // PREGUNTA: es correcto definir this como any?
        return new Promise((resolve, reject) => {
            function callback(err: any, result: any) { // our custom callback for f (**)
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            }

            args.push(callback) // append our custom callback to the end of f arguments
            f.call(this, ...args) //PREGUNTA: this se refiere a la promesa que devolvemos???
        })

    }
}

// usage
// let loadScriptPromise = promisify(loadScript)
// loadScriptPromise(...).then(...)
/**
 * A call to promisify(f) returns a wrapper around f(*). That wrapper returns a promise
 * and forwards the call to the original f, tracking the result in the custom callback(**)
 * 
 * Here, promisify assumes that the original function expects a callback with exactly two
 * arguments (err, result). That's what we encounter most often. Then our custom callback
 * is in exactly the right format, and promisify works great for such case.
 * 
 * We can improve our helper:
 *  -> When called as promisify(f) it should work similar to the version above
 *  -> When called as promisify(f, true) it should return the promise that resolves with the
 * array of callback results. That's exactly for callbacks with many arguments
 */

function promisify2(f: any, manyArgs = false) {
    return function (...args: any[]) {
        return new Promise((resolve, reject) => {
            function callback(err: any, ...results: any[]){ // our custom callback for f
                if(err) {
                    reject(err)
                } else {
                    // resolve with all calback results if manyArgs is specified
                    resolve(manyArgs ? results : results[0])
                }
            }
            args.push(callback)

            f.call(this, ...args) //PREGUNTA: como arreglar this
        })
    }
}

// usage:
// f = promisify(f, true)
// f(...).then(arrayOfResults => ..., err => ...)

/**
 * Microtasks
 * Promise handlers .then/ .catch / .finally are always asynchronous
 * Even when a Promise is immediately resolved, the code on the lines below .then/ .catch/
 * .finally will still execute befure these handlers
 */
let promise3 = Promise.resolve()
promise3.then(() => alert("promise done!"))
alert("code finished") // this alert shows first

/**
 * Why did the .then trigger afterwards? What's going on?
 * MICROTASKS QUEUE
 * Asynchronous tasks need proper management. For that, the ECMA standard specifies an inernal queue
 * PromiseJobs, mor often referred to as the microtask queue
 *  -> FIFO queue
 *  -> Execution of a task is initiated only when nothing else is running
 * 
 * When a promise is ready, then/catch/finally handlers are put into queue; they are not executed yet.
 * When the JS engine becomes free from the current code, it takes a task from the queue and executes it
 */

/**
 * What if the order matters to us? How can we make code finished appear after promise done?
 */
Promise.resolve()
    .then(() => alert("promise done!"))
    .then(() => alert("code finished!"))

/**
 * Unhandled rejection
 * An unhandled rejection occurs when a promise error is not handled at the end of the microtask
 * queue
 * Normally, if we expect an error, we add .catch to the promise chain to handle it
 */
