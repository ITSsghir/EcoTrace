// Get OSTYPE
const osType = process.platform;

if (osType === 'win32') {
    // Windows, run the pwsh script
    const { spawn } = require('child_process');
    const child = spawn('pwsh', ['./cleanup.ps1'], {shell: true});
    child.stdout.on('data', (data) => {
        console.log(data.toString());
    });
    child.stderr.on('data', (data) => {

    });
    child.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
}
else {
    // Linux, run the bash script
    const { spawn } = require('child_process');
    const child = spawn('bash', ['./cleanup.sh'], {shell: true});
    child.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });
    child.stderr.on('data', (data) => {

    });
    child.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
}