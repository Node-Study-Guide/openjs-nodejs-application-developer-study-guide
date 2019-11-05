---
layout: default.njk
title: Events
---

Events 

The Node.js core API is built around the idea of events being "emitted" and "listened" to. Objects called "emitters" emit _named_ events, that are picked up by "listener" functions.

Objects that emit events extend the `EventEmitter` class. These objects expose an eventEmitter.on() function that allows one or more functions to be attached to named events emitted by the object.

When the EventEmitter object emits an event, all of the functions attached to that specific event are called synchronously, in the order they were added. This is to prevent race conditions and logic errors. They can switch to an async mode using `setImmediate`.

```
const { EventEmitter } = require('events');

// create a listener function. These can be arrow functions, but will
// loose `this` refering to the EventEmitter object
const foo = function foo() {
  console.log('foo executed.', this)
}

// create an emitter and bind some events to it
const eventEmitter = new EventEmitter()

// Bind the connection event with the listner1 function
eventEmitter.on('foo', foo)

// fire the event
eventEmitter.emit('foo')
```

Why?

