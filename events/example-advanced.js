// import the base? class, EventEmitter from the events module
const { EventEmitter } = require('events')

// create some listener functions to handle when the events occur.
// `foo` is expecting two parameters to be passed in.
const foo = function foo(baz, qux) {
  console.log(`foo executed. baz: ${baz}, qux: ${qux}`)
}

const bar = function bar() {
  console.log('bar executed.')
}

const errorProne = function foo(obj) {
  this.emit('error', 'I am just not going to work')
}

// create an emitter and bind some events to it
const eventEmitter = new EventEmitter()

// Bind the connection event with the listner1 function
eventEmitter.addListener('foo', foo)

// N.B. `addListener` is the same as `on`.

// Bind the connection event with the listner2 function - 
// IMPORTANT!! Listeners are called synchronously in the order in which they were added.
// - i.e. `foo` will be called, and `bar` will be called once `foo` has completed.
// This is to prevent race conditions and logic errors.
// They can switch to an async mode using `setImmediate`.
 
eventEmitter.once('bar', bar)
eventEmitter.once('liveDangerously', errorProne)

// handle errors in one of the listeners handlers
eventEmitter.on('error', (err) => {
  console.error('There was an error!')
})

for(let i = 0; i < 3; i++ ) {
  eventEmitter.emit('foo', 'value1', 'value2')
  eventEmitter.emit('bar')
  eventEmitter.emit('liveDangerously')
}

const eventListeners = EventEmitter.listenerCount(eventEmitter, 'foo')

console.log(EventEmitter.listenerCount(eventEmitter, 'connection') + " Listner(s) listening to connection event")
console.log(eventListeners + " Listner(s) listening to connection event")
console.log('end of file...')
