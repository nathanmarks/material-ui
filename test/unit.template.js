/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import {addMuiHelpers} from '../../test/unit.utils';
import Component from './Component';

describe('<Component />', () => {
  const muiShallow = addMuiHelpers(shallow);

  it('shallow renders', () => {
    assert.ok(muiShallow(<Component />));
  });

  it('merges styles and other props into the root node', () => {
    muiShallow.testRootMerge(Component);
  });
});
