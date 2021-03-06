const { templateGenerator } = require('sparkgen');

module.exports = templateGenerator("connected-component", ["cc"], component => {  
    return {
      root: 'components',
      index: undefined,
      exports: `export { ${component} } from './${component}';`,
      replacements: [
        { r: /_NAME_/g, v: component},
      ],
      template: 'connectedComponent.tsx',
      output: `${component}.tsx`
    }
  });