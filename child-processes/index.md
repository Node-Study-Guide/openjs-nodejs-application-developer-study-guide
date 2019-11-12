---
layout: default.njk
title: Child Processes
---

The `child_process` module provides the ability to spawn child processes. Whilst single-threaded, non-blocking performance in Node.js is great for a single process, but we can use `child_process` to handle the increasing workload in our applications.

Child processes are spawned in a manner that is similar, but not identical, to [popen(3)](http://man7.org/linux/man-pages/man3/popen.3.html) from Linux programming using the `child_process.spawn()` function.


https://www.freecodecamp.org/news/node-js-child-processes-everything-you-need-to-know-e69498fe970a/



Using multiple processes is the best way to scale a Node application. Node.js is designed for building distributed applications with many nodes. This is why it’s named Node. Scalability is baked into the platform and it’s not something you start thinking about later in the lifetime of an application.





```


As you probably know, our typical OS has different processes running in the background. Each process is being managed by a single-core of our CPU and will run a series of calculations each time it is being ticked. As such, we can’t take full advantage of our CPU using a single process, we would need a number of processes that is at least equal to the number of cores in our CPU. In addition, each process might be responsible for running a series of calculations of different logic, which will give the end user a better control over the CPU’s behavior.



Why is this module called child_process and not just process? First of all, not to confuse with the main process instance global.process, and second, the child process is derived from the main process, which means that both can communicate - the main process will hold streams for the child process’s std types and they will both share an ipc channel (“Inter Process Communication” channel; more on that further this article).





```


`spawn`


The first parameter is the path for an executable file that starts the process, and the second argument is the arguments that will be passed into the process.







More reading: [Node.js Child Processes: Everything you need to know
](https://www.freecodecamp.org/news/node-js-child-processes-everything-you-need-to-know-e69498fe970a/)