---
layout: post
title: Control Flow
author: donovan
date: Last Modified
---

JavaScript programs are made up of series of instructions. When our programs run, they run in sequence from the top down, one line at a time. Most lines of are _synchronous_, meaning they run in order. However not all do. Sometimes _asynchronous_ code can cause our code to execute in an unexpected order.

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

Node.js generally runs in one single thread and any _blocking_ code will be run in sequence, with _non-blocking_ code having the potential to run _asynchronously_. For more info you may want to take a look at [this talk on how the Event Loop works](https://www.youtube.com/watch?v=8aGhZQkoFbQ).

Thankfully Node.js offers 3 asynchronous approaches we can use to control the order in which our code executes. _Callbacks_, _promises_ and _async/await_. Let's take a look at each.

## Callbacks

Earlier in the development of Node.js it was common to use the _callback pattern_ to control the order that code is executed. The pattern involves passing a function as a parameter (_callback_) into your functions, and then calling that _callback_ when you're ready to continue.

Let's say we have to get some data from an external service. We don't know how long this service might take to respond. We would need to wait until the service responds, we can't simply continue running code as we might need the response.

To simulate this I've created a `randomDelayedResponse` function that will return a response after an unspecified amount of time.

```
function randomDelayedResponse(text) {
  // Using a timeout here for the sake of simulating an external request
  const timeOut = Math.floor(Math.random() * 100) + 1;
  const output = text;
  setTimeout(() => {
    return output;
  }, timeOut);
}

const output = randomDelayedResponse('Hello');
console.log(output); // undefined
```

Notice that the final line above returns `undefined`. This is because the `randomDelayedResponse` line is _non_blocking_ and hasn't returned anything to `output` before we then try to apply `console.log` to it.

We need to wait until the response is ready. One way is to pass our `console.log` in to `randomDelayedResponse` as a function.

```
function randomDelayedResponse(text, callback) {
  // Using a timeout here for the sake of simulating an external request
  const timeOut = Math.floor(Math.random() * 100) + 1;
  setTimeout(() => {
    callback(text);
  }, timeOut);
}

const output = randomDelayedResponse('Hello', text => console.log(text)); // outputs "Hello"
console.log(output); // still empty
```

We pass the function `text => console.log(text)` as the second parameter, and this function is then called after the `setTimeout`.

This might be reasonable in simple situations but it's easy for callbacks to get out of control. For example, if we have many different calls to this slow function that need to be run in order. To achieve this control we need to nest further.

To show many responses, consider the following code. If we ran them beside each other, the output would not be reliable.

```
function randomDelayedResponse(text, callback) {
  const timeOut = Math.floor(Math.random() * 100) + 1;
  setTimeout(() => {
    callback(text);
  }, timeOut);
}

randomDelayedResponse(1, console.log); // outputs 1
randomDelayedResponse(2, console.log); // outputs 2
randomDelayedResponse(3, console.log); // outputs 3
randomDelayedResponse(4, console.log); // outputs 4
// Who will win?
```

Here we pass in the function `console.log` as the second argument which is then run as `callback(text)` to log the output.

While the code does run in order and run the `randomDelayedResponse` function with the right sequence of inputs, the random delays mean they won't be logged in order. We can run the above code multiple times and the result is never predictable. Each call to the function is _asynchronous_, in that the results do not arrive in order. To create a predictable, _synchronous_ flow using callbacks we'd need to nest them.

```
function randomDelayedResponse(text, callback) {
  const timeOut = Math.floor(Math.random() * 100) + 1;
  setTimeout(() => {
    callback(text);
  }, timeOut);
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

Structuring these callbacks outputs the numbers in the correct order. However when we use `callbacks` the code can become difficult to understand and maintain. This might be suitable in simple cases. Though if we find ourselves nesting multiple levels deep we should look for other ways to control the flow.

Let's look at one such alternative.

## Promises

To avoid this callback hell, we can use a different structure called _promises_. A promise is a function that returns a _resolved_ response which we can chain using `then`, or a _rejected_ response which we can `catch`. It follows this pattern:

```
ourPromiseFunction() // returns a promise that will resolve or reject
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
    const timeOut = Math.floor(Math.random() * 100) + 1;
    setTimeout(() => {
      if (!text) {
          reject('No text provided!'); // Reject when there is no text provided
      }
      resolve(text); // Replacing the callback with "resolve"
    }, timeOut);
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
    console.log(error);
  })
// outputs "1 2 3 4"
```

Running the above code should output the correct order, albeit with random delays between each number.

In the above example we shouldn't see any errors - but if you want to adjust one of the `andomDelayedResponse()` calls to pass in no data, it should `reject` and the `catch` block will log the error.

Promises remove the nesting and give us easier to read code. Let's look at a third way that builds on this.

## Async / Await

The third approach is built on top of the existing _promises_ approach and results in even simpler code. With `async` and `await` we can write code that feels a lot more like our usual top-down code. It works by telling our commands to wait when we need them to. Let's rewrite our _who will win?_ example from above.

```
function randomDelayedResponse(text, callback) {
  return new Promise((resolve, reject) => {
    const timeOut = Math.floor(Math.random() * 100) + 1;
    setTimeout(() => {
      if (!text) {
          reject('No text provided!');
      }
      resolve(text);
    }, timeOut);
  });
}

async function runTheRace() { // put `async` before the function call

  console.log(1) // Not async

  const result2 = await randomDelayedResponse(2); // async
  console.log(result2);

  console.log(3);

  const result4 = await randomDelayedResponse(4);
  console.log(result4);

  // Catching the error
  try {
    await randomDelayedResponse();
  } catch (error) {
    console.error(error);
  }
}

runTheRace();
```

In the above we have replaced the series of `.then()` calls with an `async` function. It's still making use of a _promise_ but when we want to wait for the promise we simply place `await` before the asynchronous function. The code execution order is preserved.

You may be wondering how we handle errors here. One approach is to use the `try/catch` method. We'll be covering that and more in the [error handling section]({{ "/error-handling/" | url }}).

## Which is preferred?

Generally you should try to aim for the `async/await` approach when possible. It helps promote clean code. None of the approaches are to be avoided entirely, but in general always aim for the approach that ensures the code is easy to read and understand.

## Exercise

Given the following code, how would you change it so that the results always outputs `hello world`? Can you make it work using all 3 of the above approaches?

```
function hello() {
  const timeOut = Math.floor(Math.random() * 100) + 1;
  setTimeout(() => {
    console.log('hello');
  }, timeOut);
}

function world() {
  const timeOut = Math.floor(Math.random() * 100) + 1;
  setTimeout(() => {
    console.log('world');
  }, timeOut);
}
```

## Suggested solution

<button class="show-solution" onClick={showSolution()}>Show solution</button>

<div class="solution hidden">

```
# Callbacks
function hello(callback) {
  const timeOut = Math.floor(Math.random() * 100) + 1;
  setTimeout(() => {
    console.log('hello');
    callback();
  }, timeOut);
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
    const timeOut = Math.floor(Math.random() * 100) + 1;
    setTimeout(() => {
      resolve('hello');
    }, timeOut);
  });
}

function world() {
  return new Promise((resolve, reject) => {
    const timeOut = Math.floor(Math.random() * 100) + 1;
    setTimeout(() => {
      resolve('world');
    }, timeOut);
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
    const timeOut = Math.floor(Math.random() * 100) + 1;
    setTimeout(() => {
      resolve('hello');
    }, timeOut);
  });
}

function world() {
  return new Promise((resolve, reject) => {
    const timeOut = Math.floor(Math.random() * 100) + 1;
    setTimeout(() => {
      resolve('world');
    }, timeOut);
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

## Further learning

- [Callback function](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)
- [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [Making asynchronous programming easier with async and await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await)
- What the heck is the event loop anyway? (Philip Roberts, JSConf EU, 2014) (https://www.youtube.com/watch?v=8aGhZQkoFbQ)
