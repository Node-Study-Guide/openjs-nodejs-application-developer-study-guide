---
layout: default
title: Buffers in depth
url: buffers
author: john
date: 2019-11-14
---

## Buffers

Node's `Buffer` class enables working with binary data in Javascript. A buffer allows a programme to store data temporarily outside the V8 engine's stack.

Though not entirely accurate we can think of a buffer as an array of bytes, each byte is represented by a hexadecimal digit.

The Node `Buffer` class is a global class and therefore does not need to be imported into a module.

### Example

```javascript
// create a buffer from a string
const myBuffer = Buffer.from("hello node buffers");

console.log(myBuffer);
// <Buffer 68 65 6c 6c 6f 20 6e 6f 64 65 20 62 75 66 66 65 72 73>

console.log(myBuffer[0]);
// 104 - unicode char code for h (decimal representation of hex number 68)

console.log(myBuffer.toString());
// hello node buffers
```

## Instantiating a Buffer

Buffers can be instantiated with:

- a string
- an array
- another Buffer
- an arrayBuffer
- an object

using `Buffer.from()`.

Buffers can also be instantiated by size using `Buffer.alloc()`, `Buffer.allocUnsafe()` and `Buffer.allocUnsafeSlow()`

// The next line should be an 'aside', how to do this in markdown and the rendered site?

> _Unsafe_ as the memory containing the buffer is not initialised - i.e. not zeroed-out, so the potential exists for sensitive data to be leaked.

### Example

```
const myBuffer1 = Buffer.from([1, 2, 3]);
console.log(myBuffer1.length);
// 3

const myBuffer2 = Buffer.alloc(3);
console.log(myBuffer2);
// <Buffer 00 00 00>

// allocate a size for the buffer and give each byte an initial value 'a'
const myBuffer3 = Buffer.alloc(3, 'a');
console.log(myBuffer3);
// <Buffer 61 61 61>
```

### Caveat: Buffer size

Once instantiated, using either `from()` or one of the `alloc()` methods a Buffer cannot be resized.

A Buffer's size is measured in Octets which is a more accurate way of saying 'an 8-bit byte'.

```
const myBuffer4 = Buffer.alloc(4);
console.log(myBuffer4);
// <Buffer 00 00 00 00>
myBuffer4.write('card');
console.log(myBuffer4);
// <Buffer 63 61 72 64>
myBuffer4.write('cards');
console.log(myBuffer4);
// <Buffer 63 61 72 64> - last character is lost
```

## Terminology

**Octet**

An Octet is a more accurate way to describe a byte consisting of 8-bits. In some systems a byte can have more or less bits.
