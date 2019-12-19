const { generateFile, generateExports, templateGenerator } = require('sparkgen');

module.exports = templateGenerator("slice", [], slice => {
  const interface = capitalize(slice);

  return {
    root: 'reducers',
    noIndex: true,
    replacements: [
      { r: /_NAME_/g, v: slice},
      { r: /_NAMEINTERFACE_/g, v: interface},
    ],
    template: 'slice.ts',
    output: `${slice}.ts`
  }
});

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);