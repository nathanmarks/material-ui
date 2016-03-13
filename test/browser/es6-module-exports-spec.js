import React from 'react';
import TestUtils from 'react-addons-test-utils';

const Divider = require('divider').default;
const ActionAccessibility = require('svg-icons').ActionAccessibility;

import ImportGetMuiTheme from 'getMuiTheme';
const RequireGetMuiTheme = require('getMuiTheme').default;

import ImportColorManipulator from 'internal/color-manipulator';
const RequireColorManipulator = require('internal/color-manipulator').default;

describe('require() style import of ', () => {
  it('Divider component should not fail when rendering', () => {
    expect(() => {
      TestUtils.renderIntoDocument(<Divider />);
    }).to.not.throw(Error);
  });

  it('ActionAccessibility component should not fail when rendering', () => {
    expect(() => {
      TestUtils.renderIntoDocument(<ActionAccessibility />);
    }).to.not.throw(Error);
  });

  it('getMuiTheme should have same result as ES6 style import', () => {
    expect(RequireGetMuiTheme).to.eql(ImportGetMuiTheme);
  });

  it('ColorManipulator should have same result as ES6 style import', () => {
    expect(RequireColorManipulator).to.eql(ImportColorManipulator);
  });
});
