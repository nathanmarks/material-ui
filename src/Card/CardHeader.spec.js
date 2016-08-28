// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { createShallowWithContext } from 'test/utils';
import CardHeader, { styleSheet } from './CardHeader';

describe('<CardHeader>', () => {
  let shallow;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render Paper', () => {
    const wrapper = shallow(
      <CardHeader />
    );
    assert.strictEqual(wrapper.is('Paper'), true, 'should be Paper');
  });
});
