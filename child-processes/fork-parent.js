const { fork } = require('child_process');

const child1 = fork('fork-child');
const child2 = fork('fork-child');
const child3 = fork('fork-child');

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
