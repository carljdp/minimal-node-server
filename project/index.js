// Project Menu
const { spawn } = require("child_process");
const ui = require("./nodeUi");

try {
  const sslSetupTerminalOptions = {
    shell: true,
    detached: true
  };

  const sslSetupTerminal = spawn(
    "node",
    ["./project/sslSetup.js"],
    sslSetupTerminalOptions
  );

  //sslSetupTerminal.stdout.pipe(process.stdout);
  //sslSetupTerminal.stderr.pipe(process.stderr);

  // test for succesful launch, then unref if planning to terminate this
  //sslSetupTerminal.unref();
} catch (error) {
  console.log("sslSetupTerminal failed to launch\n" + error.message);

  ui.promptForKeyPressThenExit("ERROR");
} finally {
  process.exit(0);
}

//ui.promptForKeyPressThenExit("\nPress any key to terminate..");
