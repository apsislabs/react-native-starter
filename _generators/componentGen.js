const { templateGenerator } = require('sparkgen');

module.exports = templateGenerator("component", [], component => {
    return {
      root: 'components',
      index: undefined,
      exports: `export { ${component} } from './${component}';`,
      replacements: [
        { r: /_NAME_/g, v: component},
      ],
      template: 'component.tsx',
      output: `${component}.tsx`
    }
  });