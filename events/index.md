---
layout: default.njk
title: Events
---

The Node.js core API is built around the idea of events being "emitted" and "listened" to. Objects called "emitters" emit _named_ events, that are picked up by "listener" functions.

Objects that emit events extend the `EventEmitter` class. These objects expose an eventEmitter.on() function that allows one or more functions to be attached to named events emitted by the object.

When the EventEmitter object emits an event, all of the functions attached to that specific event are called _synchronously_, in the order they were added. This is to prevent race conditions and logic errors. They can switch to an async mode using `setImmediate`.

## A Simple Example

This example creates an event listener for `foo` events, and an event emitter to fire these events.

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

## Passing parameters

When an event is emitted using the `emit` method, the subsequent arguments are passed through to the listeners. For example:

```
const foo = function foo(bar) {
  console.log(`foo has been passed ${bar}`)
}

// Bind the connection event with the listner1 function
eventEmitter.on('foo', foo)

// fire the event
eventEmitter.emit('foo', 'bar')
```

## Objects:

```
require('events)
```

## Methods

`on(eventName, listenerFunction)`

## Summary

Main concept = listeners listen for events, that are emitted from emitters.

## Exercise

Image we are building a SaaS that does a number of things when a user creates an account.   functionality that sends emails "confirmation" to a user when they create an account.

There is a mock emailer class in the folder that has a method `send`, which expects an email address and a message body as the parameters.

Use this to send a welcome email when a `userCreated` event is fired.
