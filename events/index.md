---
layout: post.njk
title: Events
url: events
---

The Node.js core API is built around the idea of events being "emitted" and "listened" to. Objects called "emitters" emit _named_ events, that are picked up by "listener" functions.

Objects that emit events extend the `EventEmitter` class. These objects expose an `on` method that allows one or more functions to be attached to named events emitted by the object.

When the EventEmitter object emits an event, all of the functions attached to that specific event are called _synchronously_, in the order they were added. This is to prevent race conditions and logic errors. They can switch to an async mode using `setImmediate`.

## A Simple Example

This example creates an event listener for `foo` events, and an event emitter to fire these events.

```javascript
const { EventEmitter } = require("events");

// create a listener function. These can be arrow functions, but will
// loose `this` refering to the EventEmitter object
const foo = function foo() {
  console.log("foo executed.", this);
};

// create an emitter and bind some events to it
const eventEmitter = new EventEmitter();

// Bind the connection event with the listner1 function
eventEmitter.on("foo", foo);

// fire the event
eventEmitter.emit("foo");
```

## Passing parameters

When an event is emitted using the `emit` method, the subsequent arguments are passed through to the listeners.

For example:

```
const foo = function foo(bar) {
  console.log(`foo has been passed ${bar}`)
}

// Bind the connection event with the listner1 function
eventEmitter.on('foo', foo)

// fire the event
eventEmitter.emit('foo', 'bar')
```

## Summary

Listeners _listen_ for events, that are _emitted_ from emitters.

Take me to [cheat sheet]({{ "/cheatsheet/#events" | url }})

## Exercise

Imagine we are building a SaaS that does a number of things when a user creates an account. When a user record
is created, we want to emit a `userCreated` event. One of the listeners for this will email a confirmation
email to that user.

Build an event emitter to simulate the `userCreated` event, and an event listener that sends a confirmation email. There is a mock emailer class in the folder that has a method `send`, which expects an email address and a message body as the parameters.
