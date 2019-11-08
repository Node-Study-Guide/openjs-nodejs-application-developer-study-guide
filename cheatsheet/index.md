---
layout: default.njk
title: Node Cheat Sheet
---

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
