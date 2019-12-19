const { trimEnding, templateGenerator } = require('sparkgen');

module.exports = templateGenerator("screen", [], screen => {
  const name = trimEnding(screen, "Screen");
  const nameFull = `${name}Screen`;

  return {
    root: 'screens',
    index: undefined,
    exports: `export { ${nameFull} } from './${nameFull}';`,
    replacements: [
        { r: /_NAME_/g, v: name},
        { r: /_NAMEFULL_/g, v: nameFull},
    ],
    template: 'screen.tsx',
    output: `${nameFull}.tsx`
  }
});