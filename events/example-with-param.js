const { EventEmitter } = require('events')

const foo = function foo(bar) {
  console.log(`foo has been passed ${bar}`)
}
  
// create an emitter and bind some events to it
const eventEmitter = new EventEmitter()

eventEmitter.on('foo', foo)

eventEmitter.emit('foo', 'bar')
