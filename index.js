const fs = require("fs");
const logSymbols = require("log-symbols");

Reset = "\x1b[0m";
Bright = "\x1b[1m";
Dim = "\x1b[2m";
Underscore = "\x1b[4m";
Blink = "\x1b[5m";
Reverse = "\x1b[7m";
Hidden = "\x1b[8m";

FgBlack = "\x1b[30m";
FgRed = "\x1b[31m";
FgGreen = "\x1b[32m";
FgYellow = "\x1b[33m";
FgBlue = "\x1b[34m";
FgMagenta = "\x1b[35m";
FgCyan = "\x1b[36m";
FgWhite = "\x1b[37m";

/**
 * @module WebpackOnBuildPlugin
 */

/**
 * @constructor
 * @param {onBuildCallback} callback - will be called right after build.
 */
function WebpackOnBuildPlugin({ platform }) {
  this.platform = platform;
}

/**
 * @callback onBuildCallback
 * @param {object} stats - webpack stats object
 */

/**
 * @param {object} compiler
 */
WebpackOnBuildPlugin.prototype.apply = function(compiler) {
  const { platform } = this;
  const platformFolderName = platform.split('/').pop();
  compiler.hooks.done.tap("WebpackOnBuildPlugin", ({ compilation, ...params }) => {
    const testFolder = `${platform}/widget`;
    const outputFiles = Array.from(compiler._assetEmittingWrittenFiles.keys());

    const leadWidgetConfig = async (widgetName) => require(`${platform}/.ccc/widget/${widgetName}/widget.json`)

    fs.readdir(testFolder, async (err, files) => {
      console.log("Preparing your " + FgCyan + platformFolderName + Reset + " folder so that it is ready to be deployed...\n");
      await Promise.allSettled(
        files.map(async (file) => {
          const targetDir = `${testFolder}/${file}/js`;
          const widgetName = file.toLowerCase();
          const widgetConfig = await leadWidgetConfig(widgetName).catch((e) => ({}));
          let output = outputFiles.find((fileName) => fileName.includes(`${widgetConfig.javascript}.widget`));
          fs.rmdirSync(targetDir, { recursive: true });
          if (!output) {
            console.log('  ', logSymbols.error, `/widget${FgGreen}/${file}/${Reset}js/${widgetConfig.javascript}.js`);
            return;
          }
          console.log('  ', logSymbols.success, `/widget${FgGreen}/${file}/${Reset}js/${widgetConfig.javascript}.js`);
          fs.mkdirSync(targetDir, { recursive: true });
          fs.createReadStream(output).pipe(fs.createWriteStream(`${targetDir}/${widgetConfig.javascript}.js`));
        }),
      );
      console.log("\nThe " + FgCyan + platformFolderName + Reset + " folder is ready to be deployed.\n");
      console.log("Find out more about deployment here:\n");
    });
  });
};

module.exports = WebpackOnBuildPlugin;
