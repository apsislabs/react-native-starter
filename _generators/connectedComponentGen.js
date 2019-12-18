const { generateFile, generateExports } = require('../gen');

const connectedComponentCmd = {
    cmd: "connected-component",
    aliases: ["cc"],
    run: async (argv, help) => {
        const overwrite = argv.f || argv.force;

        argv._.shift()

        if (argv._.length < 1) {
            help();
            return;
        }

        const actions = await Promise.all(argv._.map(c => generateComponent(c, overwrite)));
        const indexPath = "components/index.ts";

        const exportActions = await generateExports(indexPath, actions, a => `export {${a.original}} from './${a.original}';`);

        return actions.concat(exportActions);
    }
}

module.exports = connectedComponentCmd;

const generateComponent = async (component, overwrite) => {

    const props = `${component}Props`;

    const replacements = [
        { r: /_NAME_/g, v: component},
        { r: /_NAMEPROPS_/g, v: props},
    ];

    const inputPath = `_generators/templates/connectedComponent.tsx`;
    const outputPath = `components/${component}.tsx`;

    return await generateFile(inputPath, outputPath, replacements, {overwrite, original: component});
}