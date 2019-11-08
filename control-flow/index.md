---
layout: post
title: Control Flow
author: donovan
date: Last Modified
---

As we create programs we write sequences of events. Usually, we expect them execute in order but this is not always the way it occurs. Even though JavaScript ios [single-threaded](https://medium.com/better-programming/is-node-js-really-single-threaded-7ea59bcc8d64 'Is Node.js Really Single-Threaded?'), functions that call APIs, setTimeouts and other structures can result in our code running in an unexpected order.

Consider the following code.

```
console.log('Clean teeth');
setTimeout(() => {
  console.log('Use lavatory');
});
console.log('Wash face and hands');
```

In the above code our compiler goes through each line executing each instruction. First it logs `Clean teeth`. Then it doesn't hang around for the `setTimeout`, it simply carries on and logs `Wash face and hands`. Then (a small moment later), it will log `Use lavatory`.

This is not what we want. We'll have to go wash our hands again. In production code, even worse things can happen.

Thankfully Node offers 3 approaches we can use to control the order in which our code executes. _Callbacks_, _promises_ and _async/await_. Let's take a look at each.

## Callbacks

Earlier in Node's development, it was common to use the _callback pattern_ to control the order that code is executed. The pattern involves passing a function as a parameter (_callback_) into your functions, and then calling that _callback_ when you're ready to continue.

### Example

Let's say we have to get some data from an external service. To simulate this I've created a `randomDelayedResponse` function that will return a response after an unspecified amount of time.

```
function randomDelayedResponse(text) {
  // Using a timeout here for the sake of simulating an external request
  const timeOut = Math.floor(Math.random() * 10) + 1;
  const output = text;
  setTimeout(() => {
    return output;
  }, timeOut * 10);
}

const output = randomDelayedResponse('Hello');
console.log(output); // empty
```

If we wanted to get the response we need to wait until the response it ready. One way is to pass out final `console.log` in as a function like so:

```
function randomDelayedResponse(text, callback) {
  // Using a timeout here for the sake of simulating an external request
  const timeOut = Math.floor(Math.random() * 10) + 1;
  setTimeout(() => {
    callback(text);
  }, timeOut * 10);
}

const output = randomDelayedResponse('Hello', text => console.log(text)); // outputs "Hello"
console.log(output); // still empty
```

Here we are passing the function `text => console.log(text)` as the second parameter, and this function is then called after the `setTimeout`.

This might be reasonable at this level, but it's easy for callbacks to get out of control. For example, if we have two different calls to this slow function that need to be run in order, we need to nest further.

If we ran them beside each other, they would not be reliable:

```
function randomDelayedResponse(text, callback) {
  // Using a timeout here for the sake of simulating an external request
  const timeOut = Math.floor(Math.random() * 10) + 1;
  setTimeout(() => {
    callback(text);
  }, timeOut * 10);
}

randomDelayedResponse('Runner 1', text => console.log(text)); // outputs "Runner 1"
randomDelayedResponse('Runner 2', text => console.log(text)); // outputs "Runner 2"
randomDelayedResponse('Runner 3', text => console.log(text)); // outputs "Runner 3"
randomDelayedResponse('Runner 4', text => console.log(text)); // outputs "Runner 4"
// Who will win?
```

You can run the above code multiple times, and the result is unpredictable. To create a predictable flow using callbacks we'd need to nest them more:

```
function randomDelayedResponse(text, callback) {
  // Using a timeout here for the sake of simulating an external request
  const timeOut = Math.floor(Math.random() * 10) + 1;
  setTimeout(() => {
    callback(text);
  }, timeOut * 10);
}

randomDelayedResponse(1, text => {
  console.log(text);
  randomDelayedResponse(2, text => {
    console.log(text);
    randomDelayedResponse(3, text => {
      console.log(text);
      randomDelayedResponse(4, text => {
        console.log(text);
      });
    });
  });
}); // outputs "1 2 3 4"
```

As we can see, structuring these callbacks does work but can quickly become difficult to read. This example is very simple so we can see how more complex code nested in this way would become difficult to follow. Let's look at another way.

## Promises

To avoid this callback hell, we can use a different structure called _promises_. A promise is a function that returns a _resolved_ response which we can chain using `then`, or a _rejected_ response which we can `catch`. It follows this pattern:

```
runOutPromise() // returns a response
  .then(response => {
    return foo; // this could optionally be another promise
  })
  .then(foo => {
    // they can be chained
  })
  .catch(error => {
    // catch "reject" output here
  });
```

We can rewrite our runner example using promises like so:

```
function randomDelayedResponse(text, callback) {
  return new Promise((resolve, reject) => {
    const timeOut = Math.floor(Math.random() * 10) + 1;
    setTimeout(() => {
      resolve(text); // Replacing the callback with "resolve"
    }, timeOut * 10);
  });
}

randomDelayedResponse(1)
  .then(res => {
    console.log(res);
    return randomDelayedResponse(2);
  })
  .then(res => {
    console.log(res);
    return randomDelayedResponse(3);
  })
  .then(res => {
    console.log(res);
    return randomDelayedResponse(4);
  })
  .then(res => {
    console.log(res);
  })
  .catch(error => {
    // handle error
  })
// outputs "1 2 3 4"
```

Running the above code should output the correct order, albeit with random delays between each number.

We aren't handling errors in this example, but if our function was to encounter an error we would `reject('some error')` and this would then be picked up by the `catch`.

You can learn more about `promises` here (LINK)

Promises remove a lot of nesting and give us easier to read code. However there is a third way to control the execution order of our code.

## Async / Await

The third approach is built on top of the existing _promises_ approach but makes it easier to reason with. With `async` and `await` we can write code that feels a lot more like the simple top-down code, by telling it to wait when we need it to. Let's rewrite our _who would win?_ example from above.

```
function randomDelayedResponse(text, callback) {
  return new Promise((resolve, reject) => {
    const timeOut = Math.floor(Math.random() * 10) + 1;
    setTimeout(() => {
      resolve(text);
    }, timeOut * 10);
  });
}

async function runTheRace() { // put `async` before the function call

  console.log(1) // Not async

  const result2 = await randomDelayedResponse(2); // async
  console.log(result2);

  console.log(3);

  const result4 = await randomDelayedResponse(4);
  console.log(result4)
}

runTheRace();
```

In the above we have replaced the series of `.then()` calls with an `async` function. It's still making use of a _promise_ but when we want to wait for the promise we simply place `await` before the asynchronous function. This way, the code execution order is preserved.

You may be wondering how we handle errors here. One approach is to use the `try/catch` method. We'll be covering that and more in the [error handling section]({{ "/error-handling/" | url }}).

## Exercise

Given the following code, how would you change it so that the results always outputs `hello world`? Can you make it work using all 3 of the above approaches?

```
function hello() {
  const timeOut = Math.floor(Math.random() * 10) + 1;
  setTimeout(() => {
    console.log('hello');
  }, timeOut * 10);
}

function world() {
  const timeOut = Math.floor(Math.random() * 10) + 1;
  setTimeout(() => {
    console.log('world');
  }, timeOut * 10);
}
```

## Suggested solution

<button class="show-solution" onClick={showSolution()}>Show solution</button>

<div class="solution hidden">

```
# Callbacks
function hello(callback) {
  const timeOut = Math.floor(Math.random() * 10) + 1;
  setTimeout(() => {
    console.log('hello');
    callback();
  }, timeOut * 10);
}

function world() {
  const timeOut = Math.floor(Math.random() _ 10) + 1;
  setTimeout(() => {
    console.log('world');
  }, timeOut _ 10);
}

hello(world);
```

```
# Promises

function hello() {
  return new Promise((resolve, reject) => {
    const timeOut = Math.floor(Math.random() * 10) + 1;
    setTimeout(() => {
      resolve('hello');
    }, timeOut * 10);
  });
}

function world() {
  return new Promise((resolve, reject) => {
    const timeOut = Math.floor(Math.random() * 10) + 1;
    setTimeout(() => {
      resolve('world');
    }, timeOut * 10);
  });
}

hello()
  .then(res => {
    console.log(res);
    return world();
  })
  .then(res => {
    console.log(res)
  });

```

```
# Async / Await

function hello() {
  return new Promise((resolve, reject) => {
    const timeOut = Math.floor(Math.random() * 10) + 1;
    setTimeout(() => {
      resolve('hello');
    }, timeOut * 10);
  });
}

function world() {
  return new Promise((resolve, reject) => {
    const timeOut = Math.floor(Math.random() * 10) + 1;
    setTimeout(() => {
      resolve('world');
    }, timeOut * 10);
  });
}

async function helloWorld() {
  try {
    const hello = await hello();
    const world = await world();
    console.log(`${hello} ${world}`);
  } catch (err) {
    throw(err);
  }
}
```

</div>

## Common Classes and Functions

### Callback pattern

```
function foo(val1, val2, callback) {
  ...
  callback();
}
```

### Promise pattern

```
function foo(ok) {
  return new Promise(resolve, reject) {
    if (ok) {
      resolve('success');
    } else {
      reject('boo');
    }
  }
}

foo()
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    throw err;
  })
```

### Async/Await

```
async function callFoo() {
  try {
    const result = await foo(true);
  } catch(err) {
    throw err;
  }
}
```

Be sure to check out the [cheat sheet]({{ "/cheatsheet/" | url }}) for more.

## Further Reading

- [Callback function](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)
- [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [Making asynchronous programming easier with async and await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await)
