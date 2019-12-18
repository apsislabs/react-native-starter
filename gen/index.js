const fs = require('fs');
const util = require('util');
const path = require('path');

const exists = util.promisify(fs.exists);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const appendFile = util.promisify(fs.appendFile);
const readdir = util.promisify(fs.readdir);
const mkdir = util.promisify(fs.mkdir);

const trimEnding = (str, ending) => str.endsWith(ending) ? str.substring(0, str.length - ending.length) : str;

const generateFile = async (inputPath, outputPath, replacements, options = {}) => {
    let action = 'A';

    const inputStr = await readFile(inputPath, "utf8");
    const outputStr = applyReplacements(inputStr, replacements);

    if (await exists(outputPath)) {
        const currentOutputStr = await readFile(outputPath, "utf8");
        if (outputStr == currentOutputStr) {
            console.log(`${outputPath} exists and is identical. Skipping.`);
            return {action: 'I', outputPath, original: options.original};
        }
        else if (!options.overwrite) {
            console.log(`${outputPath} already exists. Skipping.`);
            return {action: 'S', outputPath, original: options.original};
        } else {
            console.log(`${outputPath} already exists. Overwriting.`);
            action = 'M';
        }
    }

    await ensureDirectory(outputPath);
    await writeFile(outputPath, outputStr, { encoding: "utf8" });
    return { action, outputPath, original: options.original };
};


const generateExports = async (indexPath, actions, exportFn) => {
    const addActions = actions.filter(a => a.action == "A");
    const exports = addActions.map(exportFn);

    const indexActions = [];

    if (exports.length > 0) {
        const exportStr = exports.join("\n");

        if (await exists(indexPath)) {
            await appendFile(indexPath, `\n${exportStr}`, { encoding: "utf8"});
            indexActions.push({action: "M", outputPath: indexPath});
        } else {
            await ensureDirectory(indexPath);
            await writeFile(indexPath, exportStr, { encoding: "utf8"});
            indexActions.push({action: "A", outputPath: indexPath});
        }
    }

    return indexActions;
}

const findCommands = async (dir) => {
    const commands = await readdir(dir);
    const jsCommandsFiles = commands.filter(c => c.endsWith(".js"));

    const jsCommands = jsCommandsFiles
        .map(jsFile => {
            const jsFilePath = `..${path.sep}${path.join(dir, jsFile)}`;
            return require(jsFilePath);
        })
        .filter(c => c.cmd)

    return jsCommands;
}

exports.trimEnding = trimEnding;
exports.generateFile = generateFile;
exports.generateExports = generateExports;
exports.findCommands = findCommands;

const applyReplacements = (str, replacements) => {
    var result = str;

    replacements.forEach(replacement => {
        result = result.replace(replacement.r, replacement.v);
    });

    return result;
};

const ensureDirectory = async (filePath) => {
    const dir = path.dirname(filePath);
    await mkdir(dir, { recursive: true });
}