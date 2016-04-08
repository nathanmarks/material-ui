/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import Chip from './Chip';
import Avatar from '../Avatar';
import getMuiTheme from '../styles/getMuiTheme';

describe('<Chip />', () => {
  const muiTheme = getMuiTheme();
  const themedShallow = (node) => {
    const context = {muiTheme};
    return shallow(node, {context});
  };

  it('renders an EnhancedButton', () => {
    const wrapper = themedShallow(
      <Chip>Label</Chip>
    );
    assert.ok(wrapper.is('EnhancedButton'));
  });

  it('renders children', () => {
    const wrapper = themedShallow(
      <Chip>Hello world</Chip>
    );
    assert.ok(wrapper.contains('Hello world'), 'should contain the children');
  });

  it('merges user styles in', () => {
    const wrapper = themedShallow(
      <Chip style={{backgroundColor: 'blue'}}>Chip label</Chip>
    );

    assert.strictEqual(wrapper.props().style.backgroundColor, 'blue', );
  });

  it('passes props to the enhanced button', () => {
    const props = {
      ariaLabel: 'Chips ahoy',
      disabled: true,
    };

    const wrapper = themedShallow(
      <Chip {...props}>Button</Chip>
    );

    assert.ok(wrapper.is(props));
  });

  it('renders a label with an Avatar before', () => {
    const wrapper = themedShallow(
      <Chip>
        <Avatar src="images/kolage-128.jpg" />
        Hello World
      </Chip>
    );
    const avatar = wrapper.children().at(0);
    const label = wrapper.children().at(1);

    assert.ok(avatar.is('Avatar'));
    assert.ok(label.is('span'));
    // assert.strictEqual(label.children().at(0), 'Hello World', 'says hello world');
  });
});
