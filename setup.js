/*  Run everything to init the project 
    - Check tools are installed: Mocha
    - Gen certs for localhost via [questions | config] 
*/

const { spawn, exec } = require('child_process');


const nodeTerminal = spawn('start', ['cmd.exe', '/K', '"node"'], {shell: true});


nodeTerminal.on('error', (error) => {
    console.log(`nodeTerminal: ${error}`);
});

// ---------------------------



