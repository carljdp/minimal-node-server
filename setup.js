const { spawn, exec } = require('child_process');


const nodeTerminal = spawn('start', ['cmd.exe', '/K', '"node"'], {shell: true});


nodeTerminal.on('error', (error) => {
    console.log(`nodeTerminal: ${error}`);
});

// ---------------------------



