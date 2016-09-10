// @flow weak

import { hashHistory, Router } from 'react-router/es6';
import React from 'react';
import { titleize } from '../utils/helpers';

/** start constants */

const COMPONENT_DEMOS = [
  {
    name: 'avatars',
    demos: [
      'IconAvatars.js',
      'ImageAvatars.js',
      'LetterAvatars.js',
    ],
  },
  // {
  //   name: 'buttons',
  //   demos: [
  //     'FlatButtons.js',
  //     'FloatingActionButtons.js',
  //     'IconButtons.js',
  //     'RaisedButtons.js',
  //   ],
  // },
  // {
  //   name: 'cards',
  //   demos: [
  //     'SimpleCard.js',
  //   ],
  // },
  // {
  //   name: 'dialogs',
  //   demos: [
  //     'AlertDialog.js',
  //     'AlertDialogSlide.js',
  //     'ConfirmationDialog.js',
  //   ],
  // },
  // {
  //   name: 'lists',
  //   demos: [
  //     'CheckboxList.js',
  //     'CheckboxListSecondary.js',
  //     'SwitchListSecondary.js',
  //   ],
  // },
  // {
  //   name: 'menus',
  //   demos: [
  //     'SimpleListMenu.js',
  //     'SimpleMenu.js',
  //   ],
  // },
  // {
  //   name: 'paper',
  //   demos: [
  //     'PaperSheet.js',
  //   ],
  // },
  // {
  //   name: 'progress',
  //   demos: [
  //     'Circular.js',
  //     'CircularFab.js',
  //   ],
  // },
  // {
  //   name: 'selection-controls',
  //   demos: [
  //     'Checkboxes.js',
  //     'RadioButtons.js',
  //     'RadioButtonsGroup.js',
  //     'Switches.js',
  //   ],
  // },
  // {
  //   name: 'tables',
  //   demos: [
  //     'BasicTable.js',
  //     'EnhancedTable.js',
  //   ],
  // },
  // {
  //   name: 'text-fields',
  //   demos: [
  //     'BasicTextFieldInput.js',
  //     'CompleteTextField.js',
  //   ],
  // },
];

const API_DOCS = [
  'AppBar/AppBar',
  // 'Avatar/Avatar',
  // 'Button/Button',
  // 'Checkbox/Checkbox',
  // 'Dialog/Dialog',
  // 'Dialog/DialogActions',
  // 'Dialog/DialogContent',
  // 'Dialog/DialogTitle',
  // 'Divider/Divider',
  // 'Drawer/Drawer',
  // 'IconButton/IconButton',
  // 'List/List',
  // 'List/ListItem',
  // 'List/ListItemIcon',
  // 'List/ListItemSecondaryAction',
  // 'List/ListItemText',
  // 'Menu/Menu',
  // 'Menu/MenuItem',
  // 'Menu/MenuList',
  // 'Paper/Paper',
  // 'Progress/CircularProgress',
  // 'Radio/Radio',
  // 'Radio/RadioGroup',
  // 'Ripple/Ripple',
  // 'Ripple/TouchRipple',
  // 'styles/MuiThemeProvider',
  // 'Switch/Switch',
  // 'Table/Table',
  // 'Table/TableBody',
  // 'Table/TableCell',
  // 'Table/TableHead',
  // 'Table/TableRow',
  // 'Table/TableSortLabel',
  // 'Text/Text',
  // 'TextField/TextField',
  // 'TextField/TextFieldInput',
  // 'TextField/TextFieldLabel',
  // 'Toolbar/Toolbar',
  // 'transitions/Collapse',
  // 'transitions/Fade',
  // 'transitions/Slide',
];

/** end constants */

function errorLoading(err) {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
}

function loadRoute(cb) {
  return (module) => cb(null, module.default);
}

const routes = {
  path: '/',
  title: 'Material UI',
  getComponent(location, cb) {
    System.import('./AppFrame')
      .then(loadRoute(cb))
      .catch(errorLoading);
  },
  indexRoute: {
    title: null,
    dockDrawer: true,
    getComponent(location, cb) {
      System.import('../pages/Home')
        .then(loadRoute(cb))
        .catch(errorLoading);
    },
  },
  childRoutes: [
    {
      nav: true,
      title: 'Getting Started',
      path: '/getting-started',
      getComponent(location, cb) {
        System.import('./AppContent')
          .then(loadRoute(cb))
          .catch(errorLoading);
      },
      indexRedirect: { to: 'prerequisites' },
      childRoutes: ['prerequisites', 'installation', 'usage', 'server-rendering', 'examples']
        .map((n) => {
          const route = {
            nav: true,
            title: titleize(n),
            path: `/getting-started/${n}`,
            content: '',
            getComponent(location, cb) {
              return Promise
                .all([
                  System.import(`docs/getting-started/${n}.md`),
                  System.import('./MarkdownDocs'),
                ])
                .then(([content, module]) => {
                  route.content = content;
                  return loadRoute(cb)(module);
                })
                .catch(errorLoading);
            },
          };
          return route;
        }),
    },
    {
      nav: true,
      title: 'Customization',
      path: '/customization',
      getComponent(location, cb) {
        System.import('./AppContent')
          .then(loadRoute(cb))
          .catch(errorLoading);
      },
      indexRedirect: { to: 'themes' },
      childRoutes: [
        (() => {
          const route = {
            nav: true,
            title: 'Themes',
            path: '/customization/themes',
            content: '',
            getComponent(location, cb) {
              return Promise
                .all([
                  System.import('docs/customization/themes.md'),
                  System.import('./MarkdownDocs'),
                ])
                .then(([content, module]) => {
                  route.content = content;
                  return loadRoute(cb)(module);
                })
                .catch(errorLoading);
            },
          };
          return route;
        })(),
      ],
    },
    {
      nav: true,
      title: 'Component Demos',
      path: '/component-demos',
      getComponent(location, cb) {
        System.import('./AppContent')
          .then(loadRoute(cb))
          .catch(errorLoading);
      },
      indexRedirect: { to: COMPONENT_DEMOS[0] },
      childRoutes: COMPONENT_DEMOS.map((n) => {
        const route = {
          nav: true,
          title: titleize(n.name),
          path: `/component-demos/${n.name}`,
          content: '',
          demos: {},
          getComponent(location, cb) {
            return Promise
              .all([
                System.import(`../demos/${n.name}/${n.name}.md`),
                Promise.all(n.demos.map((demo) => (
                  Promise.all([
                    System.import(`../demos/${n.name}/${demo}`),
                    System.import(`!raw!../demos/${n.name}/${demo}`),
                  ])
                ))),
                System.import('./MarkdownDocs'),
              ])
              .then(([content, demos, module]) => {
                route.content = content;
                route.demos = n.demos.reduce((res, demo, i) => {
                  res[demo] = {
                    module: demos[i][0].default,
                    src: demos[i][1],
                  };
                  return res;
                }, {});
                return loadRoute(cb)(module);
              });
          },
        };
        return route;
      }),
    },
    {
      nav: true,
      title: 'Component API',
      path: '/component-api',
      getComponent(location, cb) {
        System.import('./AppContent')
          .then(loadRoute(cb))
          .catch(errorLoading);
      },
      indexRedirect: { to: API_DOCS[0] },
      childRoutes: API_DOCS.map((n) => {
        const route = {
          nav: true,
          title: titleize(n),
          path: `/component-api/${n}`,
          content: '',
          getComponent(location, cb) {
            return Promise
              .all([
                System.import(`docs/api/${n}.md`),
                System.import('./MarkdownDocs'),
              ])
              .then(([content, module]) => {
                route.content = content;
                return loadRoute(cb)(module);
              })
              .catch(errorLoading);
          },
        };
        return route;
      }),
    },
    {
      nav: true,
      title: 'Discover More',
      path: '/discover-more',
      getComponent(location, cb) {
        System.import('./AppContent')
          .then(loadRoute(cb))
          .catch(errorLoading);
      },
      indexRedirect: { to: 'community' },
      childRoutes: ['community', 'showcase', 'related-projects']
        .map((n) => {
          const route = {
            nav: true,
            title: titleize(n),
            path: `/discover-more/${n}`,
            content: '',
            getComponent(location, cb) {
              return Promise
                .all([
                  System.import(`docs/discover-more/${n}.md`),
                  System.import('./MarkdownDocs'),
                ])
                .then(([content, module]) => {
                  route.content = content;
                  return loadRoute(cb)(module);
                })
                .catch(errorLoading);
            },
          };
          return route;
        }),
    },
  ],
};

export default function AppRouter() {
  return <Router history={hashHistory} routes={routes} />;
}
