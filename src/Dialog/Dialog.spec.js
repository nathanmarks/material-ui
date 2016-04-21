/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import Dialog from './Dialog';
import getMuiTheme from '../styles/getMuiTheme';

describe('<Dialog />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node, context = {}) => {
    return shallow(node, {
      context: {muiTheme, ...context},
    });
  };

  it('merges styles and other props into the root node', () => {
    const wrapper = shallowWithContext(
      <Dialog
        style={{paddingRight: 200, color: 'purple', border: '1px solid tomato'}}
        myProp="hello"
      />
    );
    const {style, myProp} = wrapper.props();
    assert.strictEqual(style.paddingRight, 200);
    assert.strictEqual(style.color, 'purple');
    assert.strictEqual(style.border, '1px solid tomato');
    assert.strictEqual(myProp, 'hello');
  });

  describe('rendering children', () => {

  });
});
