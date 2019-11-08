// import the class EventEmitter from the events module
const { EventEmitter } = require('events')

// create a listener function. These can be arrow functions, but will
// loose `this` refering to the EventEmitter object
const foo = function foo() {
  console.log('foo executed.', this)
}

// create an emitter and bind some events to it
const eventEmitter = new EventEmitter()

// Bind the connection event with the listner1 function
eventEmitter.on('foo', foo)

eventEmitter.emit('foo')
