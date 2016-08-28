// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { createShallowWithContext } from 'test/utils';
import Card, { styleSheet } from './Card';

describe('<Card>', () => {
  let shallow;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render Paper', () => {
    const wrapper = shallow(
      <Card />
    );
    assert.strictEqual(wrapper.is('Paper'), true, 'should be Paper');
  });
});
