// @flow weak

const glob = require('glob');
const path = require('path');
const fs = require('fs');

const COMPONENT_DEMOS = glob.sync('./src/demos/**/*.md')
  .map((n) => n.replace(/.*\/(.*).md/, '$1'))
  .map((n) => {
    return {
      name: n,
      demos: glob.sync(`./src/demos/${n}/*.js`)
        .map((k) => k.replace(/.*\//, '')),
    };
  });

const API_DOCS = glob.sync('../api/**/*.md')
  .map((n) => n.replace(/.*\/(.*\/.*).md/, '$1'));

const routerContent = fs.readFileSync(
  path.resolve(__dirname, '../src/components/AppRouter.js'),
  'utf-8'
);

fs.writeFileSync(path.resolve(__dirname, '../src/components/AppRouter.js'),
routerContent.replace(/\/\*\*\sstart\sconstants\s\*\/([\s\S]*)\/\*\*\send\sconstants\s\*\//,
`/** start constants */

const COMPONENT_DEMOS = [
${COMPONENT_DEMOS.map((n) => `  {
    name: '${n.name}',
    demos: [
${n.demos.map((d) => `      '${d}',`).join('\n')}
    ],
  },`).join('\n')}
];

const API_DOCS = [
${API_DOCS.map((n) => `  '${n}',`).join('\n')}
];

/** end constants */`)
);
