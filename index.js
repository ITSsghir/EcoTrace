// Get the os type
const osType = process.platform;

if (osType === 'win32') {
  // Windows, run the pwsh script
    const { spawn } = require('child_process');
    const child = spawn('pwsh', ['./start.ps1'], {shell: true});
    child.stdout.on('data', (data) => {
    });
    child.stderr.on('data', (data) => {
        data = data.toString();
        console.log(data);
    });
    child.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
}
else {
    // Linux, run the bash script
    const { spawn } = require('child_process');
    const child = spawn('bash', ['./start.sh'], {shell: true});
    child.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
    child.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
    child.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
}