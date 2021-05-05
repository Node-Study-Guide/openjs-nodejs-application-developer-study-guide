const { exec } = require('child_process');

exec('ls -l', (err, stdout, stderr) => {
  console.log(stdout);
});

