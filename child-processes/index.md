---
layout: post
title: Child Processes
url: child-processes
author: ian
---

_Prerequisites: [events](../events), [streams](../buffers-and-streams)_

The typical operating system has different processes running in the background, and each process is being managed by a single-core of our CPU and will run a series of calculations each time it is being ticked. To take full advantage of our CPU using a single process, we would need a number of processes that is at least equal to the number of cores in our CPU. In addition, each process might be responsible for running a series of calculations of different logic, which will give the end user a better control over the CPU’s behavior.

The `child_process` module provides the ability to spawn child processes and interact with other programs. Whilst single-threaded, non-blocking performance in Node.js is great for a single process, we can use `child_process` to handle the increasing workload in our applications in multiple threads.

Using multiple processes allows a Node application to scale. Node is designed for building distributed applications with many nodes, hence it's name Node.

Pipes for `stdin`, `stdout`, and `stderr` are established between the parent Node process and the spawned subprocess. The behaviour matches that of pipes in the shell.

The examples in this article are all Linux-based. On Windows, you will need to switch the commands I use with their Windows alternatives or use a Linux-like shell.

# `exec` vs `spawn`

There are two main approaches to running child processesL `exec` and `spawn`.

| `exec`                                                     | `spawn`                                                     |
|------------------------------------------------------------|-------------------------------------------------------------|
| spawns a shell in which the command is executed            | Does not spawn a shell                                      |
| buffers the data (waits until the process finishes and transfers all the data ) | Streams the data returned by the child process (data flow is constant) |
| maximum data transfer 200kb (by default                    | has no data transfer size limit                             |

Typically, `spawn` is more suitable for long-running process with large outputs. spawn streams input/output with child process. `exec` buffered output in a small (by default 200K) buffer.

## A Simple `exec`

In this example, we will call the `ls` command to listwith the optional param `-l` to show a long list of details. 
<div class="repl-code">

```javascript

const { exec } = require('child_process');

// exec
exec('ls -l', (err, stdout, stderr) => {
  console.log(stdout);
});

```
</div>

For more details of the options that can be passed to `exec`, please see https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback

# spawn

The `spawn` method works by returning a new process. The process object that is returned has properties for each standard IO represented as a `Stream`: `.stdin` (`WriteStream`), `.stout` (`ReadStream`) and `.stderr` (`ReadStream`).
 
We will now implement the previous example using the `spawn` method:

<div class="repl-code">

```javascript
const { spawn } = require('child_process');
const ls = spawn('ls', ['-l']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});

```
</div>

In this example we are listening to the `stout` and `stderr` streams for `data` events, as well as listening for a `close` event.

# spawn using pipes

We are going to run two child processes, and pipe the output from one as the input to another. We want to use `wc` (word count) to count the number of words in the output from the `ls` command we have been using so far. This is the same as running `ls -l | wc` on the Linux/Mac command line.

<div class="repl-code">

```javascript
const { spawn } = require('child_process');
const ls = spawn('ls', ['-l']);
const wc = spawn('wc')

// pipe output from ls as input to wc
ls.stdout.pipe(wc.stdin)

wc.stdout.on('data', (data) => {
  console.log(`wc stdout: ${data}`);
});

wc.stderr.on('data', (data) => {
  console.error(`wc stderr: ${data}`);
});

wc.on('close', (code) => {
  console.log(`wc child process wc exited with code ${code}`);
});

```
</div>

# fork

`fork` is a special version of `spawn' that allows messages to be sent between the Node processes.

Unfortunately, we are unable to run this example in the REPL because it requires separate files. So this example is best run locally on your favourite terminal.

In this example, we are going to create a child process that can receive a number, and then calculates the fibonacci of that number. This has been implemented inefficiently to illustrate long running processes. The `message` event is used to listen for requests, and the payload is destructed for a numerical value, `n`.

```javascript

const fibonacci = (num) => num <= 1 ? 1 : fibonacci(num - 1) + fibonacci(num - 2)

process.on('message', ({ n }) => {
  process.send({ fib: fibonacci(n), n })
  // optional - there is no reason why this child process
  // can't be called multiple times.
  process.exit()
})
 
```

The parent process creates 3 child processes, and passes a range of numbers to them for calculating.

```javascript

const { fork } = require('child_process')

const child1 = fork('fork-child')
const child2 = fork('fork-child')
const child3 = fork('fork-child')

// send data to the child process to perform the calculation
child1.send({ n: 5 });
child2.send({ n: 10 });
child3.send({ n: 45 });

child1.on('message', (m) => {
  console.log('PARENT child1 got message:', m);
});
child2.on('message', (m) => {
  console.log('PARENT child2 got message:', m);
});
child3.on('message', (m) => {
  console.log('PARENT child3 got message:', m);
});

child1.on('exit', () => {
  console.log('child1 exited');
});
child2.on('exit', () => {
  console.log('child2 exited');
});
child3.on('exit', () => {
  console.log('child3 exited');
});
```
</div>

```

## ChildProcess Events

The `child` processes communicates by emitting events to let the `parent` know what is going on.

| Event Name   | Reason For Emitting                                                         |
|--------------|-----------------------------------------------------------------------------|
| `disconnect` | The parent process manually calls `child.disconnect`                        |
| `error`      | The process could not be spawned or killed.                                 |
| `exit`       | The exit code for the child and the optional signalthat was used to terminate it. When null, imples the child process exited normally. |
| `close`      | The `stdio` streams of a child process get closed.                          |
| `message`    | This `child` process uses the `send` method to communicate with the parent. |

## A note on options

These processes all accept an optional options object that allow us to control the context that the processes are run within. These vary for each method, and are described in detail in the [node documentation for `child_process`](https://nodejs.org/api/child_process.html).

## Summary

Parents `spawm`, `fork` or `exec` child processes, and communicate via events or pipes.

Take me to [cheat sheet]({{ "/cheatsheet/#child-process" | url }})

## Exercise

Create a child process for doing some manipulation of a file or URL, and build a parent process that controls a number of these processes in parallel.
