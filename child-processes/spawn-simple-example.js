const { spawn } = require('child_process');

const child = spawn('pwd');

child.on('exit', function (code, signal) {
  console.log(`child process exited with code ${code} and signal ${signal}`);
});

child.on('message', function (message) {
  console.log(`child process messaged with message ${message}`);
});

spawn('git', ['log']).stdout.pipe(process.stdout)
spawn('ls').stdout.pipe(process.stdout)
  