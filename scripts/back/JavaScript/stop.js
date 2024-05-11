// Initiate the cleanup process based on the OS type
const { spawn } = require('child_process');
const path = require('node:path');

// Get os type
const osType = process.platform;

// Script type
const scriptType = 'stop';

// PowerShell script Path
const pwshScript = path.join(__dirname, `../PowerShell/${scriptType}.ps1`);

// Bash script Path
const bashScript = path.join(__dirname, `../Bash/${scriptType}.sh`);

if (osType === 'win32') {
  // Windows, run the pwsh script
    const child = spawn('pwsh', ['-File', pwshScript], {shell: true});
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
    const child = spawn('bash', ['-c', bashScript], {shell: true});
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


// Change directory to the repository root
const rootDir = path.join(__dirname, '../../../');
process.chdir(rootDir);