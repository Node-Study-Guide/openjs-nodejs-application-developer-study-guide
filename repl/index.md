---
layout: default
title: Node.js REPL
---

Use this space to try out code from the examples!

<script src="https://embed.runkit.com"></script>

<div id="repl"></div>

<script>

const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');

const notebook = RunKit.createNotebook({
    element: document.getElementById("repl"),
    source: code || "// Your JavaScript code goes here",
    minHeight: "500px",
});

</script>
