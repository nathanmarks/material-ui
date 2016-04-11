import React from 'react';
import getMuiTheme from '../src/styles/getMuiTheme';
import {assert} from 'chai';

export {getMuiTheme};

export const addMuiHelpers = (renderFn) =>
  Object.assign(
    (node, {context = {}} = {}) =>
      renderFn(node, {
        context: {
          muiTheme: getMuiTheme(),
          ...context,
        },
      }),
    {
      testRootMerge,
    }
  );

function testRootMerge(
    Component,
    userStyle = {
      paddingRight: 200,
      color: 'purple',
      border: '1px solid tomato',
    },
    userProps = {
      className: 'woof',
      myProp: 'hello',
    }
  ) {
  const wrapper = this(
    <Component style={userStyle} {...userProps} />
  );
  const {style, ...other} = wrapper.props();

  Object.keys(userStyle).forEach((key) => {
    assert.strictEqual(style[key], userStyle[key]);
  });

  Object.keys(userProps).forEach((key) => {
    assert.strictEqual(other[key], userProps[key]);
  });
}
