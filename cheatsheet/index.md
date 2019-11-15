---
layout: default
title: Node Cheat Sheet
---

## [Control Flow](#control-flow)

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

## [Buffers](#buffers)

Class: Buffer

```
Buffer.from(array)
Buffer.from(arrayBuffer[, byteOffset[, length]])
Buffer.from(buffer)
Buffer.from(object[, offsetOrEncoding[, length]])
Buffer.from(string[, encoding])
Buffer.alloc(size[, fill[, encoding]])
Buffer.allocUnsafe(size)
Buffer.allocUnsafeSlow(size)
```

Instance: buf

```
buf.slice([start[, end]])
buf.compare(target[, targetStart[, targetEnd[, sourceStart[, sourceEnd]]]])
buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])
buf.entries()
buf.equals(otherBuffer)
buf.fill(value[, offset[, end]][, encoding])
buf.includes(value[, byteOffset][, encoding])
buf.indexOf(value[, byteOffset][, encoding])
buf.keys()
buf.lastIndexOf(value[, byteOffset][, encoding])
buf.length
buf.toString([encoding[, start[, end]]])
buf.values()
buf.write(string[, offset[, length]][, encoding])
```

## [Events](#events)

Class: events.EventEmitter

```
emitter.addListener(event, listener)
emitter.on(event, listener)
emitter.once(event, listener)
emitter.removeListener(event, listener)
emitter.removeAllListeners([event])
emitter.setMaxListeners(n)
emitter.listeners(event)
emitter.emit(event, [arg1], [arg2], [...])
Event: 'newListener'
```

## [Child Processes](#child-process)

Class: child_process

```
const child_process = require('child_process')

child_process.exec(command[, options][, callback])
child_process.execFile(file[, args][, options][, callback])
child_process.fork(modulePath[, args][, options])
child_process.spawn(command[, args][, options])

subprocess.send(message[, sendHandle[, options]][, callback])

```
