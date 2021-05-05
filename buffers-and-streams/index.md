---
layout: default
title: Buffers and Streams
url: buffers-and-streams
author: john
date: 2019-11-14
---

The Node Application Developer Certification exam section for Buffers and Streams is worth 11% of the total and is broken into the following sections:

- Node.js Buffer API’s
- Incremental Processing
- Transforming Data
- Connecting Streams

## Buffers and Streams Overview

The Node.js APIs [Buffer](https://nodejs.org/docs/latest-v10.x/api/buffer.html) and [Stream](https://nodejs.org/docs/latest-v10.x/api/stream.html) are fundamentally seperate topics yet are intrinsically linked. This section will cover how these APIs work individually and with each other.

### Buffer

Buffers are fixed size chunks of memory outside the V8 heap, managed by the Node.js `Buffer` class. These allow applications to work with binary data across networked streams (TCP) and reading or writing to the file system.

[Buffers in depth](./buffers)

### Stream

The Node.js Stream module provides an API for working with streaming data. Streams are a fundamental concept in, and are prevalent throughout applications built on, Node. Streams are an efficient way to handle sending and receiving data particularly for large or indeterminate amounts of data.

[Streams in depth](./streams)

## Working with Buffers and Streams

### Examples

### Details

## Summary

## Exercise

## Terminology

**Buffer**

> In computer science, a data buffer (or just buffer) is a region of a physical memory storage used to temporarily store data while it is being moved from one place to another.
>
> -- <cite>[Wikipedia](https://en.wikipedia.org/wiki/Data_buffer)</cite>
