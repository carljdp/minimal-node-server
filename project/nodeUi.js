// UI

const keyPress = async function(promptText) {
  return new Promise((resolve, reject) => {
    process.stdin.setRawMode(true);
    process.stdin.once("data", () => {
      process.stdin.setRawMode(false);
      //data = "some input data";
      //resolve(data);
      resolve();
    });
    // never reject, wait forever
  });
};

const promptForKeyPressThenExit = function(promptText = "") {
  process.stdout.write(promptText);
  keyPress().then(() => {
    process.exit(0);
  });
};

module.exports.promptForKeyPressThenExit = promptForKeyPressThenExit;
