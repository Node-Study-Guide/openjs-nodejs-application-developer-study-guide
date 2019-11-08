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
