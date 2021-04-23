---
layout: post
title: Child Processes
url: child-processes
author: ian
---

_Prerequisites: [events](../events), [streams](../buffers-and-streams)_

The `child_process` module provides the ability to spawn child processes and interact with other programs. Whilst single-threaded, non-blocking performance in Node.js is great for a single process, we can use `child_process` to handle the increasing workload in our applications in multiple threads.

Using multiple processes allows a Node application to scale. Node is designed for building distributed applications with many nodes, hence it's name Node.

Pipes for `stdin`, `stdout`, and `stderr` are established between the parent Node process and the spawned subprocess. The behaviour matches that of pipes in the shell.

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


_To do_

child_process.fork(): spawns a new Node.js process and invokes a specified module with an IPC communication channel established that allows sending messages between parent and child.



const exec_options = {
    cwd: null,
    env: null,
    encoding: 'utf8',
    timeout: 0,
    maxBuffer: 200 * 1024,
    killSignal: 'SIGTERM'
};



## ChildProcess Events

The `child` processes communicates by emitting events to let the `parent` know what is going on.

| Event Name   | Reason For Emitting                                                         |
|--------------|-----------------------------------------------------------------------------|
| `disconnect` | The parent process manually calls `child.disconnect`                        |
| `error`      | The process could not be spawned or killed.                                 |
| `exit`       | The exit code for the child and the optional signalthat was used to terminate it. When null, imples the child process exited normally. |
| `close`      | The `stdio` streams of a child process get closed.                          |
| `message`    | This `child` process uses the `send` method to communicate with the parent. |


_Not reviwewed/edited after this_





`spawn`

The first parameter is the path for an executable file that starts the process, and the second argument is the arguments that will be passed into the process.




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