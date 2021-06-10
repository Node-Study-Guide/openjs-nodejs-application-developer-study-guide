---
layout: post
title: Diagnostics
author: donovan
date: 2021-06-10
---

In this lesson we will take a look at ways we can diagnose issues in our code. To do this we'll use the built-in Node.js debugger, as well as the Chrome dev tools.

After this lesson you should be confident investigating errors in a methodical fashion, without relying on `console.log` so much.

## Node.js Debugger

Node pack a useful [built-in debugging](https://nodejs.org/api/debugger.html) tool. Let's try using it to debug a script and find out what is causing a thrown error using the command line approach first.

To begin we create a JavaScript file locally called `count.js` containing the following:

```
function count() {
    for (let i = 1; i < 4; i++) {
      debugger;
      if (i > 2) {
        throw 'Wait, I counted too far!'
      }
      console.log(i + ' hahaha');
  }
}

function startACount() {
  console.log('I will now begin to count...')
  count();
}

startACount();
```

When we run this using `node count` (the `.js` is optional) in our command line tool it outputs an uncaught error:

```
I will now begin to count...
1 hahaha
2 hahaha

/count.js:5
        throw 'Wait, I counted too far!'
        ^
Wait, I counted too far!
```

Something has gone wrong! Let's use the debugger tool to find out what.

### The `debugger` command

In the above code you might have noticed the `debugger;` code on line 3. During normal operation this is ignored, but we can make use of this by running `inspect`:

```
node inspect count
```

This will enter `debug` mode where we can use command to inspect what is going on.

Firstly we can use `list()` to take a look at the place in the code we are currently exectuting. At first it'll be on line 16 `startACount()`. All good so far. We can then continue using `cont` to continue exectuting until we reach the break point.

By entering the continue (`cont`) command we should now see:

```
  1 function count() {
  2     for (let i = 1; i < 4; i++) {
> 3       debugger;
  4       if (i > 2) {
  5         throw 'Wait, I counted too far!'
```

We have paused execution at this point. Now we can delve deeper and inspect some of our code to see what is going on. To begin, we jump into the Node REPL by using the command `repl`.

This then lets us access the code directly. Type `i` to log the value for that variable:

```
debug> repl
Press Ctrl + C to leave debug repl
> i
1
```

This shows that we have the value "1" stored in `i`. This is fine, so we then leave the REPL with `Cmd+C` and continue with `cont`.

Repeating the above shows `i` is now "2". Continue one more time. The value of `i` should now be "3".

The error hasn't thrown yet but we can carefully approach it by using `next`. This command steps through the lines one at a time. 

Using `next` we should see the `if` statement, then a second `next` takes us to the `throw` statement:

```
debug> next
break in count.js:5
  3       debugger;
  4       if (i > 2) {
> 5         throw 'Wait, I counted too far!'
  6       }
  7       console.log(i + ' hahaha');
  ```

So we've managed to get to the moment when the script fails. Enter the `repl` command one last time and type `i`. We now see that it contains the value "3". Checking the `if` statement above, we can see why this now hits the `throw` statement.

You can quit the debugger by typing `.exit` or by pressing `Cmd+C` twice.

## Debugging using Node.js with Chrome DevTools

We don't just need the command line to debug our code. We can also make use of Chrome's debugging tools to help navigate our code.

```
node --inspect index.js
```

The above runs the inspector, but in our case it throws an error, so we can have it pause on exectution to give us time to step through the code by using:

```
node --inspect-brk count.js
```

This will run the Chrome inspector and tell it to pause on any break points (`debugger;`).

It now gives us a URL. We can ignore this and instead, open Chrome and put in the address: `about:inspect`.

On this page we should see a link to our `count.js` process as it is currently running. Clicking the `inspect` link opens the `DevTools` window. We can then begin running the script within our DevTools window by pressing the blue _Resume_ button on the top right.

This should cause the script to reach our `debugger;` line as follows:

TODO: IMAGE: A screenshot of the DevTools showing the debugger line highlighted.

Beside the blue _Resume_ button you'll find controls to step through the code, by stepping over the next function call, step into and out of functions and step forward line by line.

We can also select the line numbers to toggle temporary breakpoints, to help drill down on specific areas of the code. These are listed under `Breakpoints` on the right panel.

On the right panel you can also manage _Watchers_ and more.

You can select `Console` in the tabs to see the output of the logs as we step through the code. 

### Debugging our error

One approach will be to highlight line `4` in our code (click on the line number to highlight it with a blue background), then press the blue _Resume_ button until the execution pauses on the `if` statement.

You can hover your mouse cursor over the `i` to see what value it contains (you can slso see this information on the right panel under `Scope`).

Repeat pressing the _Resume_ button until `i` contains "3". Pressing _Resume_ again causes the code to disappear as it has encounted the error. We can see the error in our command line.

### Worker threads

Chrome DevTools doesn't support debugging [worker threads]({{ "/child-processes/" | url }}) yet. We can handle these using [ndb](https://github.com/GoogleChromeLabs/ndb).

## Debugging with ndb

You can install `ndb` globally by running:

```
npm install ndb -g
```

If you are using MacOS and encounter an error (`gyp: No Xcode or CLT version detected!`) you may need to install XCode or run:

```
sudo xcode-select -r
```

Then you can run `ndb` against the code with:

```
ndb count
```

This will download Chromium and present a similar view to before, albeit wrapped in a slightly smoother package.

You can debug the code as above, adding breakpoints as needed, hovering over the variables to see their values, and much more.

Find more information on [debugging using ndb](https://github.com/GoogleChromeLabs/ndb).

## Generating diagnostic reports

Sometimes we need more information to work out what is going on. To help with this, we can make use of Node's built-in [diagnostic report](https://nodejs.org/api/report.html) feature.

To create the report, we can run the following command against out `count.js` file above:

```
node --report-uncaught-exception count.js
```

This generates a report in JSON that you can read to try to work out what has happened.

It includes a lots of information on the JavaScript and native stack traces, heap statistics, platform information, resource usage and local environmental variables.

Along with debugging the error messages from the script, this can be helpful in determining the state of the application when an uncaught exception occurred.

With the report option enabled, diagnostic reports can be triggered on unhandled exceptions, fatal errors and user signals, in addition to triggering programmatically through API calls. Read more on the official [diagnostic report docs page](https://nodejs.org/api/report.html).

### Homework

Feel free to try moving the `debugger;` statement around in the above. You can also try using the `help` command in the `debug` mode to see other options.

Try breaking the code and then using the `debug` mode to narrow down the issue. Inspecting variables using the REPL can be helpful to find logic errors or catch situations where variables contain unexpected values.

Try out the same exercise using the Chrome devtools and see how it differs. By being familiar with each you will find it easier to know what tools to use to debug any issues in future.