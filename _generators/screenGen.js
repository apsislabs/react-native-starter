const { trimEnding, generateFile, generateExports } = require('../gen');

const screenCmd = {
    cmd: "screen",
    run: async (argv, help) => {
        const overwrite = argv.f || argv.force;

        argv._.shift();

        if (argv._.length < 1) {
            help();
            return;
        }

        const actions = await Promise.all(argv._.map(s => generateScreen(s, overwrite)));
        const indexPath = "screens/index.ts";

        const exportActions = await generateExports(indexPath, actions, a => `export {${a.original}Screen} from './${a.original}Screen';`);

        return actions.concat(exportActions);
    }
}

module.exports = screenCmd;

const generateScreen = async (screen, overwrite) => {
    const name = trimEnding(screen, "Screen");
    const nameFull = `${name}Screen`;

    const replacements = [
        { r: /_NAME_/g, v: name},
        { r: /_NAMEFULL_/g, v: nameFull},
    ];

    const inputPath = `_generators/templates/screen.tsx`;
    const outputPath = `screens/${nameFull}.tsx`;

    return await generateFile(inputPath, outputPath, replacements, {overwrite, original: screen});
}