---
layout: default.njk
title: Node Cheat Sheet
---

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
