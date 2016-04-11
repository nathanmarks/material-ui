/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import {addMuiHelpers} from '../../test/unit.utils';
import RefreshIndicator from './RefreshIndicator';

describe('<RefreshIndicator />', () => {
  const muiShallow = addMuiHelpers(shallow);

  it('shallow renders', () => {
    assert.ok(muiShallow(<RefreshIndicator />));
  });

  it('merges styles and other props into the root node', () => {
    muiShallow.testRootMerge(RefreshIndicator);
  });
});
