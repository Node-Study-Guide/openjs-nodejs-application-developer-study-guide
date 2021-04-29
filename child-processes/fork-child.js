const fibonacci = (num) => num <= 1 ? 1 : fibonacci(num - 1) + fibonacci(num - 2)

process.on('message', ({n}) => {
  process.send({ fib: fibonacci(n), n })
  // optional - there is no reason why this child process
  // can't be called multiple times.
  process.exit()
})
