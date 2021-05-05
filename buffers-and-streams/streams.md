---
layout: default
title: Streams in depth
url: streams
author: john
date: 2019-11-15
---

## Streams

Node's `stream` module is an API for working with streaming data. Streams enable working with data as it is received rather than waiting for the data to be fully loaded into memory.

An example of streaming data is watching an online video broadcast. As the data is received the video can be displayed.

Streams are instances of [`EventEmitter`](/events).

## Working with streams

To use the `stream` module it must be imported -

`const stream = require('stream');`
