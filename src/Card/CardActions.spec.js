// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { createShallowWithContext } from 'test/utils';
import CardActions, { styleSheet } from './CardActions';

describe('<CardActions>', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a div with the cardActions class', () => {
    const wrapper = shallow(
      <CardActions />
    );
    assert.strictEqual(wrapper.is('div'), true, 'should be a div');
    assert.strictEqual(wrapper.hasClass(classes.cardActions), true, 'should have the cardActions class');
  });
});
