---
layout: default
title: Child Processes
---

The `child_process` module provides the ability to spawn child processes. Whilst single-threaded, non-blocking performance in Node.js is great for a single process, but we can use `child_process` to handle the increasing workload in our applications.

Using multiple processes allows a Node application to scale. Node is designed for building distributed applications with many nodes, hence it's name Node.

Child processes are spawned in a manner that is similar, but not identical, to [popen(3)](http://man7.org/linux/man-pages/man3/popen.3.html) from Linux programming using the `child_process.spawn()` function. This returns
a `child` object (which is a `ChildProcess` object - which implements the `EventEmitter` API (link to events))

## ChildProcess Events

The `child` processes communicates by emitting events to let the `parent` know what is going on.

| Event Name   | Reason For Emitting                                                         |
|--------------|-----------------------------------------------------------------------------|
| `disconnect` | The parent process manually calls `child.disconnect`                        |
| `error`      | The process could not be spawned or killed.                                 |
| `exit`       | The exit code for the child and the optional signalthat was used to terminate it. When null, imples the child process exited normally. |
| `close`      | The `stdio` streams of a child process get closed.                          |
| `message`    | This `child` process uses the `send` method to communicate with the parent. |

## Spawn Example

```javascript

const { spawn } = require('child_process');

const child = spawn('ls');

child.on('exit', function (code, signal) {
  console.log(`child process exited with code ${code} and signal ${signal}`);
});
child.on('exmessageit', function (code, signal) {
  console.log(`child process messaged with code ${code} and signal ${signal}`);
});

spawn(  ).stdout.pipe(process.stdout)

```

_Not reviwewed/edited after this_





The returned process object will hold a property for each std type represented as a Stream: .stdin - WriteStream, .stout - ReadStream and finally .stderr - ReadStream. Accordingly, if we would like to run git log through a Node process and print it to the console we would do something like the following:

Every child process also gets the three standard stdio streams, which we can access using child.stdin, child.stdout, and child.stderr.

`spawn`

The first parameter is the path for an executable JavaScript file that starts the process, and the second argument is the arguments that will be passed into the process.




There are four different ways to create a child process in Node: spawn(), fork(), exec(), and execFile().

Note that examples I’ll be using in this article are all Linux-based. On Windows, you need to switch the commands I use with their Windows alternatives. - find what they are...


spawn - spwans a new process, which can pass the command any arguments




So we can interact with the `ChildProcess` by listening for a series of events.


```


As you probably know, our typical OS has different processes running in the background. Each process is being managed by a single-core of our CPU and will run a series of calculations each time it is being ticked. As such, we can’t take full advantage of our CPU using a single process, we would need a number of processes that is at least equal to the number of cores in our CPU. In addition, each process might be responsible for running a series of calculations of different logic, which will give the end user a better control over the CPU’s behavior.



Why is this module called child_process and not just process? First of all, not to confuse with the main process instance global.process, and second, the child process is derived from the main process, which means that both can communicate - the main process will hold streams for the child process’s std types and they will both share an ipc channel (“Inter Process Communication” channel; more on that further this article).





```

More reading: [Node.js Child Processes: Everything you need to know
](https://www.freecodecamp.org/news/node-js-child-processes-everything-you-need-to-know-e69498fe970a/)