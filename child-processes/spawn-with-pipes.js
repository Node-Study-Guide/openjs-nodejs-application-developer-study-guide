const { spawn } = require('child_process');

const ls = spawn('ls', ['-l']);
const wc = spawn('wc');

// pipe output from ls as input to wc
ls.stdout.pipe(wc.stdin);

wc.stdout.on('data', (data) => {
  console.log(`wc stdout: ${data}`);
});

wc.stderr.on('data', (data) => {
  console.error(`wc stderr: ${data}`);
});

wc.on('close', (code) => {
  console.log(`wc child process wc exited with code ${code}`);
});